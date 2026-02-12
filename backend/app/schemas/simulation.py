"""
BotForge - Simulation Pydantic Schemas.
"""

import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


# --- Request ---

class SimulationRequest(BaseModel):
    """Request to run a backtesting simulation."""
    strategy_id: uuid.UUID | None = Field(
        None,
        description="Existing strategy ID. If not provided, use inline params.",
    )
    # Inline strategy params (used if strategy_id is None)
    strategy_type: str | None = Field(
        None,
        pattern="^(grid|dca)$",
        description="grid or dca",
    )
    strategy_params: dict[str, Any] | None = Field(
        None,
        description="Strategy-specific parameters",
    )
    # Market data selection
    pair: str = Field(..., examples=["BTCUSDT"])
    timeframe: str = Field(
        ...,
        pattern="^(1m|5m|15m|30m|1h|4h|1d|1w)$",
        examples=["1h"],
    )
    date_start: datetime
    date_end: datetime


# --- Response ---

class TradeRecord(BaseModel):
    """Individual simulated trade."""
    timestamp: datetime
    side: str  # 'buy' or 'sell'
    price: float
    quantity: float
    pnl: float | None = None


class SimulationMetrics(BaseModel):
    """Calculated performance metrics."""
    roi_pct: float = Field(..., description="Return on Investment %")
    sharpe_ratio: float | None = Field(None, description="Annualized Sharpe Ratio")
    max_drawdown_pct: float = Field(..., description="Maximum Drawdown %")
    win_rate_pct: float = Field(..., description="Winning trades %")
    profit_factor: float | None = Field(None, description="Gross profit / Gross loss")
    total_trades: int
    profitable_trades: int
    losing_trades: int
    total_pnl: float


class SimulationResponse(BaseModel):
    """Full simulation result response."""
    id: uuid.UUID
    pair: str
    timeframe: str
    date_start: datetime
    date_end: datetime
    metrics: SimulationMetrics
    equity_curve: list[dict[str, Any]] | None = None
    trades: list[TradeRecord] | None = None
    execution_time_ms: int | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class SimulationSummary(BaseModel):
    """Lightweight summary for simulation history listing."""
    id: uuid.UUID
    pair: str
    timeframe: str
    date_start: datetime
    date_end: datetime
    metrics: SimulationMetrics
    execution_time_ms: int | None
    created_at: datetime

    model_config = {"from_attributes": True}
