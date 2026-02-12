"""
BotForge Backend – Backtest Schemas

Pydantic models for backtest API request/response validation.
"""

from datetime import datetime

from pydantic import BaseModel, Field


class BacktestRequest(BaseModel):
    """Request schema for creating a backtest."""

    symbol: str = Field(..., example="BTC/USDT", description="Trading pair")
    timeframe: str = Field(default="1h", example="1h", description="Candle interval")
    strategy: str = Field(..., example="sma_cross", description="Strategy name")
    parameters: dict = Field(
        default={},
        example={"short_period": 20, "long_period": 50},
        description="Strategy-specific parameters",
    )
    initial_capital: float = Field(default=10_000.0, ge=100, description="Starting capital in USD")


class TradeSchema(BaseModel):
    """Schema for an individual trade."""

    entry_time: datetime
    exit_time: datetime
    entry_price: float
    exit_price: float
    side: str
    size: float
    pnl: float
    pnl_pct: float

    model_config = {"from_attributes": True}


class BacktestResponse(BaseModel):
    """Full backtest result response."""

    id: int | None = None
    symbol: str
    timeframe: str
    strategy: str
    start_date: datetime
    end_date: datetime
    initial_capital: float
    final_capital: float
    total_return_pct: float
    total_trades: int
    winning_trades: int
    losing_trades: int
    win_rate: float
    max_drawdown_pct: float
    sharpe_ratio: float
    trades: list[TradeSchema] = []
    equity_curve: list[float] = []
    created_at: datetime | None = None

    model_config = {"from_attributes": True}


class BacktestSummary(BaseModel):
    """Lightweight summary for listing backtests."""

    id: int
    symbol: str
    timeframe: str
    strategy: str
    total_return_pct: float
    win_rate: float
    total_trades: int
    created_at: datetime

    model_config = {"from_attributes": True}
