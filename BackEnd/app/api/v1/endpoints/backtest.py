"""
BotForge Backend – Backtest Endpoints

Endpoints for creating and retrieving backtest runs.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.dependencies import get_db
from app.schemas.backtest import (
    BacktestRequest,
    BacktestResponse,
    BacktestSummary,
)
from app.services.backtest_service import BacktestService

router = APIRouter()


@router.post(
    "/",
    response_model=BacktestResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Run a backtest",
)
async def create_backtest(
    request: BacktestRequest,
    db: Session = Depends(get_db),
):
    """
    Execute a backtest simulation with the given strategy parameters.

    - **symbol**: Trading pair (e.g., BTC/USDT)
    - **timeframe**: Candle interval (e.g., 1h, 4h, 1d)
    - **strategy**: Strategy name to simulate
    - **parameters**: Strategy-specific configuration
    """
    service = BacktestService(db)
    try:
        result = service.run_backtest(request)
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "/{backtest_id}",
    response_model=BacktestResponse,
    summary="Get backtest result",
)
async def get_backtest(
    backtest_id: int,
    db: Session = Depends(get_db),
):
    """Retrieve the result of a previously executed backtest."""
    service = BacktestService(db)
    result = service.get_backtest_by_id(backtest_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Backtest {backtest_id} not found",
        )
    return result


@router.get(
    "/",
    response_model=list[BacktestSummary],
    summary="List all backtests",
)
async def list_backtests(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    """List all backtest runs with pagination."""
    service = BacktestService(db)
    return service.list_backtests(skip=skip, limit=limit)
