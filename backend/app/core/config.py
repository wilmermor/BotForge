"""
BotForge - Application Settings.

Centralized configuration via Pydantic BaseSettings.
All values are loaded from environment variables or .env file.
"""

from pydantic_settings import BaseSettings
from pydantic import Field
import json
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # --- Application ---
    APP_NAME: str = "BotForge"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # --- Database ---
    DB_HOST: str = "db"
    DB_PORT: int = 5432
    DB_USER: str = "botforge"
    DB_PASSWORD: str = "botforge_secret_dev"
    DB_NAME: str = "botforge"
    DATABASE_URL: str = "postgresql+asyncpg://botforge:botforge_secret_dev@db:5432/botforge"

    # --- Redis ---
    REDIS_HOST: str = "redis"
    REDIS_PORT: int = 6379
    REDIS_URL: str = "redis://redis:6379/0"

    # --- JWT ---
    JWT_SECRET_KEY: str = "CHANGE_ME_TO_A_RANDOM_64_CHAR_STRING"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # --- Encryption (AES-256-GCM) ---
    ENCRYPTION_KEY: str = "CHANGE_ME_TO_A_BASE64_ENCODED_32_BYTE_KEY"

    # --- Binance ---
    BINANCE_BASE_URL: str = "https://api.binance.com"

    # --- CORS ---
    CORS_ORIGINS: str = '["http://localhost:5173","http://localhost:3000"]'

    # --- Cache ---
    OHLCV_CACHE_TTL_SECONDS: int = 86400  # 1 day

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins from JSON string to list."""
        try:
            return json.loads(self.CORS_ORIGINS)
        except (json.JSONDecodeError, TypeError):
            return ["http://localhost:5173"]

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
    }


# Singleton instance
settings = Settings()
