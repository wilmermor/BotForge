"""
BotForge - Simulation Service.

Orchestrates backtesting: loads data, runs strategy, calculates metrics,
and persists results.
"""

import time
import uuid
from datetime import datetime, timezone
from sqlalchemy import select, func, cast, Date
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.simulation_engine import run_simulation
from app.models.simulation_log import SimulationLog
from app.models.user import User
from app.models.strategy import Strategy
from app.models.plan import Plan
from app.schemas.simulation import SimulationMetrics, SimulationRequest
from app.services.market_service import fetch_ohlcv
from sqlalchemy.orm import selectinload


async def execute_simulation(
    db: AsyncSession,
    user_id: uuid.UUID,
    request: SimulationRequest,
    redis_client=None,
) -> SimulationLog:
    """
    Execute a full backtest simulation.

    1. Fetch OHLCV data (from cache or Binance).
    2. Run the backtesting engine with the chosen strategy.
    3. Persist results to simulation_logs.
    4. Return the simulation log.
    """
    start_time = time.perf_counter()

    # Get user with plan
    user_result = await db.execute(
        select(User).options(selectinload(User.plan_rel)).where(User.id == user_id)
    )
    user = user_result.scalar_one_or_none()

    # Check for plan limits if no strategy_id is provided
    if not request.strategy_id:
        if user and user.plan_rel.name.lower() == "free":
            # Check strategy count
            count_result = await db.execute(
                select(Strategy).where(Strategy.user_id == user_id)
            )
            strategy_count = len(count_result.scalars().all())
            
            if strategy_count >= user.plan_rel.max_strategies:
                raise ValueError(f"Has alcanzado el límite de estrategias ({user.plan_rel.max_strategies}) para tu plan {user.plan_rel.name.upper()}. No puedes realizar simulaciones con nuevas configuraciones sin antes mejorar a Plan PRO.")
    
    # Check for daily simulation limit
    if user and user.plan_rel.name.lower() == "free":
        # Use timezone-aware comparison if needed, or just compare dates
        today_start = datetime.now(timezone.utc).date()
        
        sim_count_result = await db.execute(
            select(func.count(SimulationLog.id)).where(
                SimulationLog.user_id == user_id,
                cast(SimulationLog.created_at, Date) == today_start
            )
        )
        simulations_today = sim_count_result.scalar_one() or 0

        # Apply specific limit of 3 for free users as requested
        max_daily = user.plan_rel.max_simulations_per_day
        if user.plan_rel.name.lower() == "free":
            max_daily = 3
            
        if simulations_today >= max_daily:
            raise ValueError("Ya se alcanzó el límite diario de simulaciones. Espera al día siguiente o mejora al plan PRO.")

    # Validate date range
    if request.date_start >= request.date_end:
        raise ValueError("El rango de fechas no es válido. La fecha de inicio debe ser anterior a la fecha de fin.")

    # 1. Fetch market data
    ohlcv_data = await fetch_ohlcv(
        pair=request.pair,
        timeframe=request.timeframe,
        start_date=request.date_start,
        end_date=request.date_end,
        redis_client=redis_client,
    )

    if not ohlcv_data:
        raise ValueError(
            f"No market data found for {request.pair} "
            f"({request.date_start} to {request.date_end})"
        )

    # 2. Determine strategy type and params
    strategy_type = request.strategy_type or "grid"
    strategy_params = request.strategy_params or {}

    # 3. Run simulation engine
    result = run_simulation(
        ohlcv_data=ohlcv_data,
        strategy_type=strategy_type,
        strategy_params=strategy_params,
    )

    execution_time_ms = int((time.perf_counter() - start_time) * 1000)

    # 4. Persist to database
    simulation_log = SimulationLog(
        user_id=user_id,
        strategy_id=request.strategy_id,
        pair=request.pair,
        timeframe=request.timeframe,
        date_start=request.date_start,
        date_end=request.date_end,
        metrics=result["metrics"],
        equity_curve=result.get("equity_curve"),
        trades=result.get("trades"),
        execution_time_ms=execution_time_ms,
    )
    db.add(simulation_log)
    await db.flush()
    await db.refresh(simulation_log, ["strategy", "currency_pair"])

    return simulation_log
