"""
BotForge - Notification Service.

Business logic for querying, creating and updating notifications.
"""

import uuid

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import Notification


async def get_user_notifications(db: AsyncSession, user_id: uuid.UUID) -> list[Notification]:
    """Return all notifications for a user, newest first."""
    result = await db.execute(
        select(Notification)
        .where(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
    )
    return list(result.scalars().all())


async def mark_notification_read(
    db: AsyncSession, notification_id: uuid.UUID, user_id: uuid.UUID
) -> Notification | None:
    """Mark a single notification as read, scoped to the current user."""
    result = await db.execute(
        select(Notification).where(
            Notification.id == notification_id,
            Notification.user_id == user_id,
        )
    )
    notification = result.scalar_one_or_none()
    if notification is None:
        return None

    notification.is_read = True
    await db.commit()
    await db.refresh(notification)
    return notification


async def mark_all_read(db: AsyncSession, user_id: uuid.UUID) -> int:
    """Mark ALL notifications of a user as read. Returns the number of rows updated."""
    result = await db.execute(
        update(Notification)
        .where(Notification.user_id == user_id, Notification.is_read == False)  # noqa: E712
        .values(is_read=True)
    )
    await db.commit()
    return result.rowcount
