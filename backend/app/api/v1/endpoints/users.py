"""
BotForge - User Endpoints.

Profile management for authenticated users.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate, UserPasswordUpdate
from app.services.user_service import update_user, update_user_plan, update_password
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
    try:
        # Only pass fields that were actually provided in the request body
        update_data = data.model_dump(exclude_unset=True)
        updated = await update_user(
            db, 
            current_user, 
            **update_data
        )
        return updated
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/me/plan")
async def change_plan(
    data: UserPlanUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Change the current user's plan (pro/free)."""
    return await update_user_plan(db, current_user, data.plan_name)

@router.post("/me/password")
async def change_password(
    data: UserPasswordUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Change the current user's password."""
    try:
        updated = await update_password(
            db,
            current_user,
            data.current_password,
            data.new_password
        )
        return {"msg": "Contraseña actualizada correctamente"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
