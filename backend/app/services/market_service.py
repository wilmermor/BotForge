"""
BotForge - Market Data Service.

Fetches OHLCV candlestick data from Binance API with Redis caching.
"""

import json
from datetime import datetime

import httpx

from app.core.config import settings


# Binance kline interval mapping
BINANCE_INTERVALS = {
    "1m": "1m", "5m": "5m", "15m": "15m", "30m": "30m",
    "1h": "1h", "4h": "4h", "1d": "1d", "1w": "1w",
}


async def fetch_ohlcv(
    pair: str,
    timeframe: str,
    start_date: datetime,
    end_date: datetime,
    redis_client=None,
) -> list[dict]:
    """
    Fetch OHLCV data for a trading pair.

    1. Check Redis cache first.
    2. If miss, fetch from Binance API.
    3. Store in Redis with TTL.

    Returns list of dicts: {timestamp, open, high, low, close, volume}
    """
    cache_key = f"ohlcv:{pair}:{timeframe}:{int(start_date.timestamp())}:{int(end_date.timestamp())}"

    # --- Check Redis cache ---
    if redis_client:
        cached = await redis_client.get(cache_key)
        if cached:
            return json.loads(cached)

    # --- Fetch from Binance ---
    start_ms = int(start_date.timestamp() * 1000)
    end_ms = int(end_date.timestamp() * 1000)

    all_candles = []
    current_start = start_ms

    async with httpx.AsyncClient(timeout=30.0) as client:
        while current_start < end_ms:
            params = {
                "symbol": pair.upper(),
                "interval": BINANCE_INTERVALS.get(timeframe, "1h"),
                "startTime": current_start,
                "endTime": end_ms,
                "limit": 1000,  # Binance max per request
            }
            response = await client.get(
                f"{settings.BINANCE_BASE_URL}/api/v3/klines",
                params=params,
            )
            response.raise_for_status()
            klines = response.json()

            if not klines:
                break

            for k in klines:
                all_candles.append({
                    "timestamp": k[0],        # Open time (ms)
                    "open": float(k[1]),
                    "high": float(k[2]),
                    "low": float(k[3]),
                    "close": float(k[4]),
                    "volume": float(k[5]),
                })

            # Move to next batch
            current_start = klines[-1][0] + 1

    # --- Cache result ---
    if redis_client and all_candles:
        await redis_client.set(
            cache_key,
            json.dumps(all_candles),
            ex=settings.OHLCV_CACHE_TTL_SECONDS,
        )

    return all_candles
