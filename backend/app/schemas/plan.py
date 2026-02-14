"""
BotForge - Plan Schemas.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PlanBase(BaseModel):
    name: str = Field(..., max_length=50)
    description: str | None = None
    price_monthly: float = 0.00
    max_strategies: int = 1
    max_simulations_per_day: int = 5
    features: list[str] = []


class PlanCreate(PlanBase):
    pass


class Plan(PlanBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
