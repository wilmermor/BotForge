"""
BotForge Backend – FastAPI Entry Point

Initializes the FastAPI application, middleware, and routers.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.api.v1.router import api_v1_router


def create_app() -> FastAPI:
    """Application factory."""
    application = FastAPI(
        title=settings.app_name,
        description="Plataforma SaaS de backtesting para traders de criptomonedas",
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
        debug=settings.debug,
    )

    # --- CORS Middleware ---
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # --- Routers ---
    application.include_router(api_v1_router, prefix="/api/v1")

    # --- Startup / Shutdown Events ---
    @application.on_event("startup")
    async def on_startup():
        print(f"🚀 {settings.app_name} starting in {settings.app_env} mode...")

    @application.on_event("shutdown")
    async def on_shutdown():
        print(f"👋 {settings.app_name} shutting down...")

    return application


app = create_app()
