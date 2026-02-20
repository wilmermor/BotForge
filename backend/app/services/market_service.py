"""
BotForge - Market Data Service.

Fetches OHLCV candlestick data from Binance API with Redis caching.
"""

import json
from datetime import datetime

from app.core.config import settings
from app.services.market_data import MarketDataService

BATCH_LIMIT = 1000


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

    # --- Fetch from Binance (via CCXT) ---
    # Convert pair to CCXT format (e.g. BTCUSDT -> BTC/USDT)
    # This is a basic heuristic; for a real app, we might need a better mapping or allow flexible input.
    symbol = pair.upper()
    if not "/" in symbol and symbol.endswith("USDT"):
        symbol = f"{symbol[:-4]}/{symbol[-4:]}"
    elif not "/" in symbol and symbol.endswith("BTC"):
        symbol = f"{symbol[:-3]}/{symbol[-3:]}"
    
    all_candles = []
    
    
    service = MarketDataService()
    try:
        # CCXT 'since' is inclusive. We loop to fetch all data in the range.
        current_since = start_date
        end_ts = int(end_date.timestamp() * 1000)
        
        while True:
            # Check if we've reached the end
            if int(current_since.timestamp() * 1000) >= end_ts:
                break
                
            candles = await service.fetch_ohlcv(
                symbol=symbol,
                timeframe=timeframe,
                since=current_since,
                limit=BATCH_LIMIT 
            )
            
            if not candles:
                break
                
            for c in candles:
                # c['timestamp'] is in ms
                if c['timestamp'] < end_ts:
                    all_candles.append(c)
                else:
                    # Candle is outside our requested range (after end_date)
                    pass
            
            # Prepare for next iteration
            last_candle_ts = candles[-1]['timestamp']
            
            # If the last candle fetched is strictly before our current 'since', 
            # or if we got fewer than limit, we are likely done or stuck.
            # Usually, next since = last_timestamp + 1ms (or timeframe duration)
            next_since_ts = last_candle_ts + 1
            
            # Break interaction if we aren't moving forward
            if next_since_ts <= int(current_since.timestamp() * 1000):
                break
                
            current_since = datetime.fromtimestamp(next_since_ts / 1000, tz=start_date.tzinfo or None)
            
            if len(candles) < BATCH_LIMIT:
                break
                
    except Exception as e:
        # In case of error, we might want to log it and re-raise
        # The endpoint handles generic exceptions, but good to know what failed.
        raise e
    finally:
        await service.close()

    # --- Cache result ---
    if redis_client and all_candles:
        await redis_client.set(
            cache_key,
            json.dumps(all_candles),
            ex=settings.OHLCV_CACHE_TTL_SECONDS,
        )

    return all_candles
