"""
BotForge - Notification Model.
"""

import uuid

from sqlalchemy import Boolean, Enum, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSON, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDMixin

import enum


class NotificationType(str, enum.Enum):
    success = "success"
    urgent = "urgent"
    alert = "alert"
    info = "info"
    promo = "promo"
    error = "error"


class NotificationCategory(str, enum.Enum):
    Bots = "Bots"
    Posiciones = "Posiciones"
    Sistema = "Sistema"
    Alertas = "Alertas"


class Notification(Base, UUIDMixin, TimestampMixin):
    """User notification model."""

    __tablename__ = "notification"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("user_b.id", ondelete="CASCADE"), nullable=False, index=True
    )
    type: Mapped[NotificationType] = mapped_column(
        Enum(NotificationType, name="notificationtype"), nullable=False
    )
    category: Mapped[NotificationCategory] = mapped_column(
        Enum(NotificationCategory, name="notificationcategory"), nullable=False
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    # JSON fields for flexible metadata
    tags: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    details: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    # Relationship
    user = relationship("User", back_populates="notifications")
