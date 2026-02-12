"""
BotForge - User Pydantic Schemas.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    """Public user profile response."""
    id: uuid.UUID
    email: EmailStr
    full_name: str | None
    plan: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    """User profile update request."""
    full_name: str | None = None
