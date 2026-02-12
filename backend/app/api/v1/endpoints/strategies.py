"""
BotForge - Strategy Endpoints.

Full CRUD for trading strategies, scoped to the authenticated user.
"""

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.strategy import StrategyCreate, StrategyResponse, StrategyUpdate
from app.services import strategy_service

router = APIRouter(prefix="/strategies", tags=["Strategies"])


@router.post(
    "/",
    response_model=StrategyResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create(
    data: StrategyCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new trading strategy."""
    strategy = await strategy_service.create_strategy(db, current_user.id, data)
    return strategy


@router.get("/", response_model=list[StrategyResponse])
async def list_strategies(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List all strategies for the current user."""
    return await strategy_service.get_strategies(db, current_user.id)


@router.get("/{strategy_id}", response_model=StrategyResponse)
async def get_strategy(
    strategy_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a specific strategy by ID."""
    strategy = await strategy_service.get_strategy(db, strategy_id, current_user.id)
    if not strategy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Strategy not found",
        )
    return strategy


@router.put("/{strategy_id}", response_model=StrategyResponse)
async def update(
    strategy_id: uuid.UUID,
    data: StrategyUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update a strategy."""
    strategy = await strategy_service.get_strategy(db, strategy_id, current_user.id)
    if not strategy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Strategy not found",
        )
    return await strategy_service.update_strategy(db, strategy, data)


@router.delete("/{strategy_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    strategy_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a strategy."""
    strategy = await strategy_service.get_strategy(db, strategy_id, current_user.id)
    if not strategy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Strategy not found",
        )
    await strategy_service.delete_strategy(db, strategy)
