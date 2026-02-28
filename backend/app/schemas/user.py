"""
BotForge - User Pydantic Schemas.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


from app.schemas.plan import Plan


class UserResponse(BaseModel):
    """Public user profile response."""
    id: uuid.UUID
    email: EmailStr
    full_name: str | None
    country: str | None = None
    avatar: str | None = None
    plan_id: uuid.UUID
    plan_rel: Plan | None = None
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    """User profile update request."""
    full_name: str | None = None
    email: EmailStr | None = None
    country: str | None = None
    avatar: str | None = None
