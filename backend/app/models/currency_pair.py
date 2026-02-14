"""
BotForge - Currency Pair Model.
"""

from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDMixin


class CurrencyPair(Base, UUIDMixin, TimestampMixin):
    """Trading pair model."""

    __tablename__ = "currency_pair"

    symbol: Mapped[str] = mapped_column(String(20), unique=True, nullable=False, index=True)
    base_asset: Mapped[str] = mapped_column(String(10), nullable=False)
    quote_asset: Mapped[str] = mapped_column(String(10), nullable=False)
    exchange: Mapped[str] = mapped_column(String(50), nullable=False, default="binance")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Relationships
    simulation_logs = relationship("SimulationLog", back_populates="currency_pair")
