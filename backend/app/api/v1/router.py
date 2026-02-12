"""
BotForge - API v1 Router.

Aggregates all v1 endpoint routers into a single router.
"""

from fastapi import APIRouter

from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.users import router as users_router
from app.api.v1.endpoints.strategies import router as strategies_router
from app.api.v1.endpoints.market import router as market_router
from app.api.v1.endpoints.simulation import router as simulation_router

api_v1_router = APIRouter()

api_v1_router.include_router(health_router)
api_v1_router.include_router(auth_router)
api_v1_router.include_router(users_router)
api_v1_router.include_router(strategies_router)
api_v1_router.include_router(market_router)
api_v1_router.include_router(simulation_router)
