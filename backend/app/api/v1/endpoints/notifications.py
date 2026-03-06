"""
BotForge - Notification Endpoints.
"""

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.notification import NotificationResponse
from app.services import notification_service

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("/", response_model=list[NotificationResponse])
async def list_notifications(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return all notifications for the authenticated user."""
    notifications = await notification_service.get_user_notifications(db, current_user.id)
    return [NotificationResponse.from_orm_with_time(n) for n in notifications]


@router.put("/{notification_id}/read", response_model=NotificationResponse)
async def mark_read(
    notification_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Mark a specific notification as read."""
    notification = await notification_service.mark_notification_read(db, notification_id, current_user.id)
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )
    return NotificationResponse.from_orm_with_time(notification)


@router.put("/read-all", status_code=status.HTTP_200_OK)
async def mark_all_read(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Mark all notifications of the current user as read."""
    count = await notification_service.mark_all_read(db, current_user.id)
    return {"updated": count}
