"""
BotForge - Strategy Service.

CRUD operations for trading strategies.
"""

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy.orm import selectinload
from app.models.strategy import Strategy
from app.schemas.strategy import StrategyCreate, StrategyUpdate


async def create_strategy(
    db: AsyncSession, user_id: uuid.UUID, data: StrategyCreate
) -> Strategy:
    """Create a new strategy for the given user with plan limit validation."""
    from app.models.user import User
    from app.models.plan import Plan

    # Check user plan and strategy count
    result = await db.execute(
        select(User)
        .options(selectinload(User.plan_rel))
        .where(User.id == user_id)
    )
    user = result.scalar_one_or_none()
    
    if not user:
        raise ValueError("User not found")

    # Get current strategy count
    count_result = await db.execute(
        select(Strategy).where(Strategy.user_id == user_id)
    )
    strategy_count = len(count_result.scalars().all())

    # Check limit based on plan
    if user.plan_rel.name.lower() == "free" and strategy_count >= user.plan_rel.max_strategies:
        raise ValueError(f"Has alcanzado el límite de estrategias ({user.plan_rel.max_strategies}) para tu plan {user.plan_rel.name.upper()}. Mejora a Plan PRO para crear más.")
    elif not user.plan_rel and strategy_count >= 1: # Fallback for users without plan_rel object loaded or set
        raise ValueError("Has alcanzado el límite de estrategias para tu plan. Mejora a Plan PRO para crear más.")

    strategy = Strategy(
        user_id=user_id,
        name=data.name,
        type=data.type,
        params=data.params,
    )
    db.add(strategy)
    await db.flush()
    await db.refresh(strategy)
    return strategy


async def get_strategies(
    db: AsyncSession, user_id: uuid.UUID
) -> list[Strategy]:
    """Get all strategies for a user."""
    result = await db.execute(
        select(Strategy)
        .where(Strategy.user_id == user_id)
        .order_by(Strategy.created_at.desc())
    )
    return list(result.scalars().all())


async def get_strategy(
    db: AsyncSession, strategy_id: uuid.UUID, user_id: uuid.UUID
) -> Strategy | None:
    """Get a specific strategy owned by the user."""
    result = await db.execute(
        select(Strategy).where(
            Strategy.id == strategy_id,
            Strategy.user_id == user_id,
        )
    )
    return result.scalar_one_or_none()


async def update_strategy(
    db: AsyncSession,
    strategy: Strategy,
    data: StrategyUpdate,
) -> Strategy:
    """Update a strategy's fields."""
    if data.name is not None:
        strategy.name = data.name
    if data.params is not None:
        strategy.params = data.params
    if data.is_active is not None:
        strategy.is_active = data.is_active
    await db.flush()
    await db.refresh(strategy)
    return strategy


async def delete_strategy(db: AsyncSession, strategy: Strategy) -> None:
    """Delete a strategy."""
    await db.delete(strategy)
    await db.flush()
