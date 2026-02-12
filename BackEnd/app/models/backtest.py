"""
BotForge Backend – Backtest Models

SQLAlchemy models for backtest runs and individual trades.
"""

from datetime import datetime

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship

from app.models.base import Base


class Backtest(Base):
    """A single backtest run."""

    __tablename__ = "backtests"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String(20), nullable=False, index=True)
    timeframe = Column(String(10), nullable=False)
    strategy = Column(String(50), nullable=False, index=True)
    parameters = Column(JSON, default={})

    # Results
    initial_capital = Column(Float, nullable=False, default=10000.0)
    final_capital = Column(Float)
    total_return_pct = Column(Float)
    total_trades = Column(Integer, default=0)
    winning_trades = Column(Integer, default=0)
    losing_trades = Column(Integer, default=0)
    win_rate = Column(Float, default=0.0)
    max_drawdown_pct = Column(Float, default=0.0)
    sharpe_ratio = Column(Float, default=0.0)

    # Metadata
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    trades = relationship("TradeRecord", back_populates="backtest", cascade="all, delete-orphan")


class TradeRecord(Base):
    """An individual trade within a backtest."""

    __tablename__ = "trade_records"

    id = Column(Integer, primary_key=True, index=True)
    backtest_id = Column(Integer, ForeignKey("backtests.id"), nullable=False)

    entry_time = Column(DateTime, nullable=False)
    exit_time = Column(DateTime, nullable=False)
    entry_price = Column(Float, nullable=False)
    exit_price = Column(Float, nullable=False)
    side = Column(String(10), nullable=False)  # "long" | "short"
    size = Column(Float, default=1.0)
    pnl = Column(Float, nullable=False)
    pnl_pct = Column(Float, nullable=False)

    # Relationships
    backtest = relationship("Backtest", back_populates="trades")
