"""
BotForge - User Service.

Business logic for user registration, authentication, and profile management.
"""

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password, verify_password
from app.models.user import User
from app.schemas.auth import RegisterRequest


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    """Find a user by email address."""
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> User | None:
    """Find a user by ID."""
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def create_user(db: AsyncSession, data: RegisterRequest) -> User:
    """
    Create a new user account.

    Raises ValueError if email already exists.
    """
    existing = await get_user_by_email(db, data.email)
    if existing:
        raise ValueError("Email already registered")

    user = User(
        email=data.email,
        password_hash=hash_password(data.password),
        full_name=data.full_name,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user


async def authenticate_user(
    db: AsyncSession, email: str, password: str
) -> User | None:
    """
    Authenticate a user by email and password.

    Returns the user if credentials are valid, None otherwise.
    """
    user = await get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


async def update_user(
    db: AsyncSession,
    user: User,
    full_name: str | None = None,
) -> User:
    """Update user profile fields."""
    if full_name is not None:
        user.full_name = full_name
    await db.flush()
    await db.refresh(user)
    return user
