"""
BotForge Backend – Application Configuration

Loads settings from environment variables using Pydantic BaseSettings.
All config values are centralized here.
"""

from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # --- Application ---
    app_name: str = Field(default="BotForge", description="Application name")
    app_env: str = Field(default="development", description="Environment: development | staging | production")
    debug: bool = Field(default=True, description="Enable debug mode")

    # --- API ---
    api_host: str = Field(default="0.0.0.0", description="API host")
    api_port: int = Field(default=8000, description="API port")

    # --- Database ---
    database_url: str = Field(
        default="postgresql://botforge:botforge_secret@localhost:5432/botforge_db",
        description="PostgreSQL connection string",
    )

    # --- Redis ---
    redis_url: str = Field(
        default="redis://localhost:6379/0",
        description="Redis connection string",
    )

    # --- CORS ---
    cors_origins: list[str] = Field(
        default=["http://localhost:5173", "http://localhost:3000"],
        description="Allowed CORS origins",
    )

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
    }


# Singleton instance
settings = Settings()
