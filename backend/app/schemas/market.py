"""
BotForge - Market Data Pydantic Schemas.
"""

from datetime import datetime

from pydantic import BaseModel, Field


class OHLCVBar(BaseModel):
    """Single OHLCV candlestick bar."""
    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float


class OHLCVRequest(BaseModel):
    """Request for historical OHLCV data."""
    pair: str = Field(..., examples=["BTCUSDT"])
    timeframe: str = Field(
        ...,
        pattern="^(1m|5m|15m|30m|1h|4h|1d|1w)$",
        examples=["1h"],
    )
    start_date: datetime
    end_date: datetime


class OHLCVResponse(BaseModel):
    """Response with OHLCV data."""
    pair: str
    timeframe: str
    count: int
    data: list[OHLCVBar]
