"""
BotForge - Currency Pair Schemas.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CurrencyPairBase(BaseModel):
    symbol: str = Field(..., max_length=20)
    base_asset: str = Field(..., max_length=10)
    quote_asset: str = Field(..., max_length=10)
    exchange: str = "binance"
    is_active: bool = True


class CurrencyPairCreate(CurrencyPairBase):
    pass


class CurrencyPair(CurrencyPairBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
