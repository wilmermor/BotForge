"""
BotForge - Simulation Endpoints.

Run backtesting simulations and retrieve results.
"""

import uuid

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.dependencies import get_current_user
from app.db.session import get_db
from app.models.simulation_log import SimulationLog
from app.models.user import User
from app.schemas.simulation import (
    SimulationMetrics,
    SimulationRequest,
    SimulationResponse,
    SimulationSummary,
)
from app.services.simulation_service import execute_simulation

router = APIRouter(prefix="/simulations", tags=["Simulations"])


@router.post(
    "/",
    response_model=SimulationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def run_simulation(
    request: Request,
    data: SimulationRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Run a backtesting simulation.

    Accepts either a strategy_id (to load saved params) or inline
    strategy_type + strategy_params.
    """
    try:
        redis_client = request.app.state.redis
        sim_log = await execute_simulation(
            db=db,
            user_id=current_user.id,
            request=data,
            redis_client=redis_client,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Simulation failed: {str(e)}",
        )

    return SimulationResponse(
        id=sim_log.id,
        pair=sim_log.pair,
        timeframe=sim_log.timeframe,
        date_start=sim_log.date_start,
        date_end=sim_log.date_end,
        metrics=SimulationMetrics(**sim_log.metrics),
        equity_curve=sim_log.equity_curve,
        trades=sim_log.trades,
        execution_time_ms=sim_log.execution_time_ms,
        created_at=sim_log.created_at,
    )


@router.get("/", response_model=list[SimulationSummary])
async def list_simulations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    limit: int = 20,
    offset: int = 0,
):
    """List the current user's simulation history."""
    result = await db.execute(
        select(SimulationLog)
        .where(SimulationLog.user_id == current_user.id)
        .order_by(SimulationLog.created_at.desc())
        .limit(limit)
        .offset(offset)
    )
    logs = result.scalars().all()

    return [
        SimulationSummary(
            id=log.id,
            pair=log.pair,
            timeframe=log.timeframe,
            date_start=log.date_start,
            date_end=log.date_end,
            metrics=SimulationMetrics(**log.metrics),
            execution_time_ms=log.execution_time_ms,
            created_at=log.created_at,
        )
        for log in logs
    ]


@router.get("/{simulation_id}", response_model=SimulationResponse)
async def get_simulation(
    simulation_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a specific simulation result."""
    result = await db.execute(
        select(SimulationLog).where(
            SimulationLog.id == simulation_id,
            SimulationLog.user_id == current_user.id,
        )
    )
    log = result.scalar_one_or_none()

    if not log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Simulation not found",
        )

    return SimulationResponse(
        id=log.id,
        pair=log.pair,
        timeframe=log.timeframe,
        date_start=log.date_start,
        date_end=log.date_end,
        metrics=SimulationMetrics(**log.metrics),
        equity_curve=log.equity_curve,
        trades=log.trades,
        execution_time_ms=log.execution_time_ms,
        created_at=log.created_at,
    )
