"""
BotForge - User Service.

Business logic for user registration, authentication, and profile management.
"""

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy.orm import selectinload
from datetime import datetime, timedelta, timezone
from app.core.security import hash_password, verify_password
from app.models.user import User
from app.models.subscription import Subscription
from app.schemas.auth import RegisterRequest, OAuthLoginRequest

from app.models.plan import Plan

async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    """Find a user by email address."""
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> User | None:
    """Find a user by ID."""
    result = await db.execute(
        select(User)
        .options(selectinload(User.plan_rel), selectinload(User.subscriptions))
        .where(User.id == user_id)
    )
    return result.scalar_one_or_none()


async def create_user(db: AsyncSession, data: RegisterRequest) -> User:
    """
    Create a new user account.

    Raises ValueError if email already exists.
    """
    existing = await get_user_by_email(db, data.email)
    if existing:
        raise ValueError("Email already registered")

    # Get or create default "free" plan
    
    result = await db.execute(select(Plan).where(Plan.name == "free"))
    plan = result.scalar_one_or_none()
    
    if not plan:
        plan = Plan(
            id=uuid.uuid4(),
            name="free",
            description="Default free plan",
        )
        db.add(plan)
        await db.flush()

    user = User(
        email=data.email,
        password_hash=hash_password(data.password),
        full_name=data.full_name,
        country=data.country,
        plan_id=plan.id,
    )
    db.add(user)
    await db.flush()
    
    # Add initial free subscription record
    initial_sub = Subscription(
        id=uuid.uuid4(),
        user_id=user.id,
        plan_id=plan.id,
        status="active",
        end_date=None
    )
    db.add(initial_sub)
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


# Sentinel to distinguish between "not provided" and "None" for nullable fields
UNSET = object()

async def update_user(
    db: AsyncSession,
    user: User,
    full_name: str | None = UNSET,
    email: str | None = UNSET,
    country: str | None = UNSET,
    avatar: str | None = UNSET,
) -> User:
    """Update user profile fields."""
    if full_name is not UNSET:
        user.full_name = full_name
        
    if email is not UNSET and email != user.email:
        existing = await get_user_by_email(db, email or "")
        if existing and existing.id != user.id:
            raise ValueError("Email already in use")
        user.email = email or ""
        
    if country is not UNSET:
        user.country = country
        
    if avatar is not UNSET:
        user.avatar = avatar
        
    await db.flush()
    await db.refresh(user)
    return user


async def update_password(
    db: AsyncSession, user: User, current_password: str, new_password: str
) -> User:
    """Update user password."""
    if not verify_password(current_password, user.password_hash):
        raise ValueError("Contraseña actual incorrecta")
        
    user.password_hash = hash_password(new_password)
    await db.flush()
    await db.refresh(user)
    return user

async def authenticate_oauth_user(
    db: AsyncSession, data: OAuthLoginRequest
) -> tuple[User, bool]:
    """
    Authenticate or register a user via OAuth (Google, Binance).
    Returns (user, is_new_user).
    """
    user = await get_user_by_email(db, data.email)
    
    # If the user does not exist, we automatically register them
    if not user:
        # Create a strong random password since they use OAuth
        import secrets
        import string
        alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
        random_password = ''.join(secrets.choice(alphabet) for i in range(24))
        
        register_data = RegisterRequest(
            email=data.email,
            password=random_password,
            full_name=data.full_name or "Usuario " + data.provider
        )
        user = await create_user(db, register_data)
        
        if data.avatar:
            user.avatar = data.avatar
            await db.flush()
            
        return user, True
    
    # Optionally update avatar for existing users if it changed
    if data.avatar and user.avatar != data.avatar:
        user.avatar = data.avatar
        await db.flush()
        
    return user, False

async def check_plan_expiration(db: AsyncSession, user: User) -> User:
    """Check if the user's active PRO plan has expired and rollback to FREE."""
    if user.plan_rel and user.plan_rel.name.lower() == "pro":
        now = datetime.now(timezone.utc)
        active_sub = next((s for s in user.subscriptions if s.status == "active" and s.end_date and s.end_date > now), None)
        
        if not active_sub:
            result = await db.execute(select(Plan).where(Plan.name == "free"))
            free_plan = result.scalar_one_or_none()
            if free_plan:
                user.plan_id = free_plan.id
                for sub in user.subscriptions:
                    sub.status = "expired"
                await db.flush()
                await db.refresh(user)
    return user


async def update_user_plan(db: AsyncSession, user: User, plan_name: str) -> dict:
    """Subscribe user to a new plan. Pro lasts 30 days, free is forever."""
    plan_name = plan_name.lower()
    result = await db.execute(select(Plan).where(Plan.name == plan_name))
    plan = result.scalar_one_or_none()
    
    if not plan and plan_name == "pro":
        plan = Plan(id=uuid.uuid4(), name="pro", description="Pro plan for advanced traders.")
        db.add(plan)
        await db.flush()
    elif not plan and plan_name == "free":
        plan = Plan(id=uuid.uuid4(), name="free", description="Default free plan.")
        db.add(plan)
        await db.flush()
        
    user.plan_id = plan.id
    
    # Deactivate current subscriptions
    for sub in user.subscriptions:
        sub.status = "expired"
        
    # Create new subscription
    end_date = None
    if plan_name == "pro":
        end_date = datetime.now(timezone.utc) + timedelta(days=30)
        
    new_sub = Subscription(
        id=uuid.uuid4(),
        user_id=user.id,
        plan_id=plan.id,
        status="active",
        end_date=end_date
    )
    db.add(new_sub)
    await db.flush()
    await db.refresh(user)
    
    return {"status": "success", "plan": plan.name, "end_date": end_date}
