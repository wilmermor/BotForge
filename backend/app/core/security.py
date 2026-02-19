"""
BotForge - JWT Authentication & Password Hashing.

Provides functions for creating/verifying JWT tokens
and hashing/verifying passwords with bcrypt.
"""

from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from jose import JWTError, jwt
import bcrypt

from app.core.config import settings


def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against its hash."""
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )


# --- JWT Tokens ---
def create_access_token(
    subject: str,
    extra_claims: Optional[dict[str, Any]] = None,
) -> str:
    """
    Create a short-lived access token.

    Args:
        subject: User ID (UUID as string).
        extra_claims: Optional additional JWT claims.
    """
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode = {"sub": subject, "exp": expire, "type": "access"}
    if extra_claims:
        to_encode.update(extra_claims)
    return jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )


def create_refresh_token(subject: str) -> str:
    """
    Create a long-lived refresh token.

    Args:
        subject: User ID (UUID as string).
    """
    expire = datetime.now(timezone.utc) + timedelta(
        days=settings.REFRESH_TOKEN_EXPIRE_DAYS
    )
    to_encode = {"sub": subject, "exp": expire, "type": "refresh"}
    return jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )


def decode_token(token: str) -> Optional[dict[str, Any]]:
    """
    Decode and validate a JWT token.

    Returns payload dict or None if invalid/expired.
    """
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
        return payload
    except JWTError:
        return None
