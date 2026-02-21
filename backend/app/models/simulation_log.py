"""
BotForge - Simulation Log Model.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin


class SimulationLog(Base, UUIDMixin):
    """Record of a backtesting simulation run."""

    __tablename__ = "simulation_log"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("user_b.id", ondelete="CASCADE"),
        nullable=False, index=True,
    )
    strategy_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("strategy.id", ondelete="SET NULL"),
        nullable=True,
    )
    currency_pair_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("currency_pair.id", ondelete="SET NULL"),
        nullable=True,
    )
    pair: Mapped[str | None] = mapped_column(String(20), nullable=True)
    timeframe: Mapped[str] = mapped_column(String(10), nullable=False)
    date_start: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    date_end: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    metrics: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    equity_curve: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    trades: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    execution_time_ms: Mapped[int | None] = mapped_column(
        Integer, nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        nullable=False,
        index=True,
    )

    # Relationships
    user = relationship("User", back_populates="simulation_logs")
    strategy = relationship("Strategy", back_populates="simulation_logs")
    currency_pair = relationship("CurrencyPair", back_populates="simulation_logs")
