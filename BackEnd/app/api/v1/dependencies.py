"""
BotForge Backend – API v1 Dependencies

Shared dependencies injected into endpoints (DB session, current user, etc.).
"""

from typing import Generator

from app.db.session import SessionLocal


def get_db() -> Generator:
    """Yield a database session and ensure it's closed after use."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
