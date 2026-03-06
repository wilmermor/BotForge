"""
BotForge - Notification Schemas.
"""

import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel

from app.models.notification import NotificationCategory, NotificationType


class TagItem(BaseModel):
    label: str
    color: str


class NotificationDetails(BaseModel):
    statusDisplay: str | None = None
    duration: str | None = None
    trades: int | None = None
    profitStr: str | None = None
    winRate: str | None = None
    buyCount: int | None = None
    sellCount: int | None = None
    maxWin: str | None = None
    maxLoss: str | None = None
    pair: str | None = None
    direction: str | None = None
    entry: str | None = None
    exit: str | None = None
    qty: str | None = None
    pnl: str | None = None
    margin: str | None = None
    leverage: str | None = None


class NotificationResponse(BaseModel):
    id: str
    type: NotificationType
    category: NotificationCategory
    title: str
    message: str
    time: str
    isRead: bool
    tags: list[TagItem] = []
    details: NotificationDetails | None = None

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_with_time(cls, obj: Any) -> "NotificationResponse":
        """Build a response, formatting created_at as a relative time string."""
        from datetime import timezone
        now = datetime.now(timezone.utc)
        delta = now - obj.created_at.replace(tzinfo=timezone.utc) if obj.created_at.tzinfo is None else now - obj.created_at
        total_seconds = int(delta.total_seconds())

        if total_seconds < 60:
            time_str = "Hace un momento"
        elif total_seconds < 3600:
            mins = total_seconds // 60
            time_str = f"Hace {mins} minuto{'s' if mins > 1 else ''}"
        elif total_seconds < 86400:
            hrs = total_seconds // 3600
            time_str = f"Hace {hrs} hora{'s' if hrs > 1 else ''}"
        elif total_seconds < 172800:
            time_str = "Ayer"
        else:
            days = total_seconds // 86400
            time_str = f"Hace {days} días"

        tags_data = obj.tags or []
        details_data = obj.details

        return cls(
            id=str(obj.id),
            type=obj.type,
            category=obj.category,
            title=obj.title,
            message=obj.message,
            time=time_str,
            isRead=obj.is_read,
            tags=[TagItem(**t) for t in tags_data],
            details=NotificationDetails(**details_data) if details_data else None,
        )
