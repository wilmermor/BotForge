"""
BotForge Backend – Market Data Endpoints

Endpoints for querying and managing OHLCV market data.
"""

from fastapi import APIRouter, Query

router = APIRouter()


@router.get("/symbols", summary="List available symbols")
async def list_symbols():
    """Return the list of trading pairs with available data."""
    # TODO: Query from database or exchange API
    return {
        "symbols": [
            "BTC/USDT",
            "ETH/USDT",
            "SOL/USDT",
        ]
    }


@router.get("/ohlcv/{symbol}", summary="Get OHLCV data")
async def get_ohlcv(
    symbol: str,
    timeframe: str = Query(default="1h", description="Candle interval: 1m, 5m, 15m, 1h, 4h, 1d"),
    limit: int = Query(default=500, ge=1, le=5000, description="Number of candles"),
):
    """
    Retrieve OHLCV (candlestick) data for a given symbol and timeframe.

    This is a placeholder – will be connected to the market data service.
    """
    # TODO: Connect to MarketDataService
    return {
        "symbol": symbol,
        "timeframe": timeframe,
        "limit": limit,
        "data": [],
        "message": "Endpoint ready. Data ingestion pending.",
    }
