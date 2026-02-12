"""
BotForge - Strategy Pydantic Schemas.
"""

import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class StrategyCreate(BaseModel):
    """Create a new strategy."""
    name: str = Field(..., min_length=1, max_length=255)
    type: str = Field(..., pattern="^(grid|dca)$", description="grid or dca")
    params: dict[str, Any] = Field(
        default_factory=dict,
        description="Strategy-specific parameters (JSON)",
        examples=[
            {
                "pair": "BTCUSDT",
                "upper_price": 70000,
                "lower_price": 60000,
                "grid_count": 10,
                "investment_amount": 1000,
            }
        ],
    )


class StrategyUpdate(BaseModel):
    """Update a strategy."""
    name: str | None = Field(None, min_length=1, max_length=255)
    params: dict[str, Any] | None = None
    is_active: bool | None = None


class StrategyResponse(BaseModel):
    """Strategy response."""
    id: uuid.UUID
    user_id: uuid.UUID
    name: str
    type: str
    params: dict[str, Any]
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
