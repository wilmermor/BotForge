"""
BotForge Backend – Health Check Endpoint

Simple health check to verify the API is running.
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health", summary="Health Check")
async def health_check():
    """Return the current health status of the API."""
    return {
        "status": "healthy",
        "service": "BotForge API",
        "version": "0.1.0",
    }
