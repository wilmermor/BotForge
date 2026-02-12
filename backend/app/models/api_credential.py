"""
BotForge - API Credential Model (encrypted Binance keys).
"""

import uuid

from sqlalchemy import Boolean, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, UUIDMixin


class ApiCredential(Base, UUIDMixin):
    """Encrypted API credentials for exchange integrations."""

    __tablename__ = "api_credentials"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False, index=True,
    )
    exchange: Mapped[str] = mapped_column(
        String(50), nullable=False, default="binance"
    )
    api_key_encrypted: Mapped[str] = mapped_column(Text, nullable=False)
    api_secret_encrypted: Mapped[str] = mapped_column(Text, nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True
    )

    # Relationships
    user = relationship("User", back_populates="api_credentials")
