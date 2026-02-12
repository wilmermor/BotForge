"""
BotForge Backend – Market Data Schemas

Pydantic models for market data API validation.
"""

from datetime import datetime

from pydantic import BaseModel, Field


class OHLCVSchema(BaseModel):
    """Single candlestick data point."""

    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float

    model_config = {"from_attributes": True}


class OHLCVRequest(BaseModel):
    """Request for OHLCV data."""

    symbol: str = Field(..., example="BTC/USDT")
    timeframe: str = Field(default="1h", example="1h")
    limit: int = Field(default=500, ge=1, le=5000)
