"""
BotForge - Strategy Model.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, String, Boolean, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin, TimestampMixin


class Strategy(Base, UUIDMixin, TimestampMixin):
    """User-defined trading strategy configuration."""

    __tablename__ = "strategy"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("user_b.id", ondelete="CASCADE"),
        nullable=False, index=True,
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[str] = mapped_column(
        String(20), nullable=False
    )  # 'grid' or 'dca'
    params: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True
    )

    # Relationships
    user = relationship("User", back_populates="strategies")
    simulation_logs = relationship(
        "SimulationLog", back_populates="strategy"
    )
