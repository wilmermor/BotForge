"""
BotForge - User Endpoints.

Profile management for authenticated users.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import update_user, update_user_plan
from pydantic import BaseModel

class UserPlanUpdate(BaseModel):
    plan_name: str

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    """Get the current authenticated user's profile."""
    return current_user


@router.patch("/me", response_model=UserResponse)
async def update_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update the current user's profile."""
    updated = await update_user(db, current_user, full_name=data.full_name)
    return updated


@router.post("/me/plan")
async def change_plan(
    data: UserPlanUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Change the current user's plan (pro/free)."""
    return await update_user_plan(db, current_user, data.plan_name)
