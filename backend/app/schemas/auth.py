"""
BotForge - Auth Pydantic Schemas.
"""

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    """User registration request."""
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    full_name: str | None = Field(None, max_length=255)
    country: str | None = Field(None, max_length=50)


class LoginRequest(BaseModel):
    """User login request."""
    email: EmailStr
    password: str


class OAuthLoginRequest(BaseModel):
    """OAuth login request from external providers like Google or Binance."""
    provider: str
    token: str
    email: EmailStr
    full_name: str | None = None
    avatar: str | None = None


class TokenResponse(BaseModel):
    """JWT token pair response."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    is_new_user: bool = False


class RefreshRequest(BaseModel):
    """Token refresh request."""
    refresh_token: str
