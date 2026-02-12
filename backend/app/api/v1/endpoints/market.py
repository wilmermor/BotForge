"""
BotForge - Market Data Endpoints.

Proxy for OHLCV historical data (Binance → Redis cache → response).
"""

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status

from app.api.v1.dependencies import get_current_user
from app.models.user import User
from app.schemas.market import OHLCVBar, OHLCVResponse
from app.services.market_service import fetch_ohlcv

router = APIRouter(prefix="/market", tags=["Market Data"])


@router.get("/ohlcv", response_model=OHLCVResponse)
async def get_ohlcv(
    request: Request,
    pair: str = Query(..., examples=["BTCUSDT"]),
    timeframe: str = Query(
        ...,
        pattern="^(1m|5m|15m|30m|1h|4h|1d|1w)$",
        examples=["1h"],
    ),
    start_date: datetime = Query(...),
    end_date: datetime = Query(...),
    current_user: User = Depends(get_current_user),
):
    """
    Get historical OHLCV candlestick data.

    Checks Redis cache first, then fetches from Binance API if needed.
    """
    if start_date >= end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="start_date must be before end_date",
        )

    try:
        redis_client = request.app.state.redis
        data = await fetch_ohlcv(
            pair=pair,
            timeframe=timeframe,
            start_date=start_date,
            end_date=end_date,
            redis_client=redis_client,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to fetch market data: {str(e)}",
        )

    bars = [
        OHLCVBar(
            timestamp=datetime.fromtimestamp(d["timestamp"] / 1000),
            open=d["open"],
            high=d["high"],
            low=d["low"],
            close=d["close"],
            volume=d["volume"],
        )
        for d in data
    ]

    return OHLCVResponse(
        pair=pair,
        timeframe=timeframe,
        count=len(bars),
        data=bars,
    )
