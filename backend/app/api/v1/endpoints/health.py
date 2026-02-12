"""
BotForge - Health Check Endpoint.
"""

from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    """Application health check."""
    return {"status": "healthy", "service": "BotForge API", "version": "0.1.0"}
