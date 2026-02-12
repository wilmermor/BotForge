"""
BotForge - Simulation Service.

Orchestrates backtesting: loads data, runs strategy, calculates metrics,
and persists results.
"""

import time
import uuid
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.simulation_engine import run_simulation
from app.models.simulation_log import SimulationLog
from app.schemas.simulation import SimulationMetrics, SimulationRequest
from app.services.market_service import fetch_ohlcv


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
    await db.refresh(simulation_log)

    return simulation_log
