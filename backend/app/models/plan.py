"""
BotForge - Plan Model.
"""

from typing import TYPE_CHECKING

from sqlalchemy import Numeric, String, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.subscription import Subscription


class Plan(Base, UUIDMixin, TimestampMixin):
    """Subscription plan model."""

    __tablename__ = "plan"

    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    price_monthly: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False, default=0.00)
    max_strategies: Mapped[int] = mapped_column(nullable=False, default=1)
    max_simulations_per_day: Mapped[int] = mapped_column(nullable=False, default=5)
    features: Mapped[list] = mapped_column(JSON, nullable=False, default=list)

    # Relationships
    users = relationship("User", back_populates="plan_rel")
    subscriptions = relationship("Subscription", back_populates="plan_rel")
