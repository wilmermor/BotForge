"""
BotForge Backend – API v1 Router

Aggregates all v1 endpoint routers into a single router.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import health, backtest, market_data

api_v1_router = APIRouter()

api_v1_router.include_router(health.router, tags=["Health"])
api_v1_router.include_router(backtest.router, prefix="/backtest", tags=["Backtest"])
api_v1_router.include_router(market_data.router, prefix="/market-data", tags=["Market Data"])
