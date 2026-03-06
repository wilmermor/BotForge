"""
BotForge - Auth Endpoints.

Registration, login, and token refresh.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.db.session import get_db
from app.schemas.auth import (
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    OAuthLoginRequest,
    TokenResponse,
)
from app.models.notification import Notification, NotificationType, NotificationCategory
from app.services.user_service import authenticate_user, create_user, authenticate_oauth_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    data: RegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    """Register a new user account."""
    try:
        user = await create_user(db, data)
    except ValueError as e:
        status_code = status.HTTP_400_BAD_REQUEST
        if "already registered" in str(e).lower():
            status_code = status.HTTP_409_CONFLICT
            
        raise HTTPException(
            status_code=status_code,
            detail=str(e),
        )

    # Add welcome notification
    username = user.full_name or user.email.split('@')[0]
    welcome_notification = Notification(
        user_id=user.id,
        type=NotificationType.info,
        category=NotificationCategory.Sistema,
        title="Bienvenida",
        message=f"Bienvenido a BotForge {username}",
    )
    db.add(welcome_notification)

    return TokenResponse(
        access_token=create_access_token(str(user.id)),
        refresh_token=create_refresh_token(str(user.id)),
    )


@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """Login with email and password."""
    user = await authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return TokenResponse(
        access_token=create_access_token(str(user.id)),
        refresh_token=create_refresh_token(str(user.id)),
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(data: RefreshRequest):
    """Refresh an access token using a valid refresh token."""
    payload = decode_token(data.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    user_id = payload.get("sub")
    return TokenResponse(
        access_token=create_access_token(user_id),
        refresh_token=create_refresh_token(user_id),
    )


@router.post("/oauth", response_model=TokenResponse)
async def oauth_login(
    data: OAuthLoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Handle login/registration via OAuth providers like Google or Binance.
    """
    # Simulate token validation: in production here you verify the token
    # using appropriate libraries like google-auth or Binance API
    if not data.token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid {data.provider} token",
        )

    # Use simulated user details from token request
    user, is_new_user = await authenticate_oauth_user(db, data)
    
    if is_new_user:
        username = user.full_name or user.email.split('@')[0]
        welcome_notification = Notification(
            user_id=user.id,
            type=NotificationType.info,
            category=NotificationCategory.Sistema,
            title="Bienvenida",
            message=f"Bienvenido a BotForge {username}",
        )
        db.add(welcome_notification)
    
    return TokenResponse(
        access_token=create_access_token(str(user.id)),
        refresh_token=create_refresh_token(str(user.id)),
        is_new_user=is_new_user,
    )
