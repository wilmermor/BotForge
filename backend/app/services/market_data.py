"""
BotForge - Market Data Service (CCXT implementation).

Fetches OHLCV candlestick data from exchanges using CCXT.
"""

import logging
from datetime import datetime
from typing import Optional, List, Dict, Any

import ccxt.async_support as ccxt
from ccxt.base.errors import NetworkError, ExchangeError, RateLimitExceeded

logger = logging.getLogger(__name__)


class MarketDataService:
    """
    Service to fetch market data using CCXT.
    """

    def __init__(self, exchange_id: str = "binance"):
        """
        Initialize the market data service.
        
        Args:
            exchange_id: The ID of the exchange to connect to (default: 'binance').
        """
        self.exchange_id = exchange_id
        self.exchange_class = getattr(ccxt, exchange_id)
        # Initialize without keys for public data fetching
        self.exchange = self.exchange_class({
            'enableRateLimit': True,  # CCXT handles rate limiting automatically
        })

    async def close(self):
        """Close the exchange connection."""
        if self.exchange:
            await self.exchange.close()

    async def fetch_ohlcv(
        self,
        symbol: str,
        timeframe: str = "1h",
        limit: int = 100,
        since: Optional[datetime] = None,
    ) -> List[Dict[str, Any]]:
        """
        Fetch OHLCV data for a trading pair.

        Args:
            symbol: Trading symbol (e.g., 'BTC/USDT').
            timeframe: Candle timeframe (e.g., '1m', '1h', '1d').
            limit: Number of candles to fetch.
            since: Start datetime to fetch data from.

        Returns:
            List of dicts: {timestamp, open, high, low, close, volume}
        
        Raises:
            ccxt.NetworkError: Connectivity problems
            ccxt.ExchangeError: Operation failed
            ccxt.RateLimitError: Too many requests
        """
        since_ms = int(since.timestamp() * 1000) if since else None

        try:
            # fetch_ohlcv returns list of [timestamp, open, high, low, close, volume]
            ohlcv = await self.exchange.fetch_ohlcv(
                symbol=symbol,
                timeframe=timeframe,
                limit=limit,
                since=since_ms
            )

            formatted_data = []
            for candle in ohlcv:
                formatted_data.append({
                    "timestamp": candle[0],  # ms timestamp
                    "open": float(candle[1]),
                    "high": float(candle[2]),
                    "low": float(candle[3]),
                    "close": float(candle[4]),
                    "volume": float(candle[5]),
                })
            
            return formatted_data

        except RateLimitExceeded as e:
            logger.warning(f"Rate limit exceeded for {self.exchange_id}: {e}")
            raise
        except NetworkError as e:
            logger.error(f"Network error fetching data from {self.exchange_id}: {e}")
            raise
        except ExchangeError as e:
            logger.error(f"Exchange error fetching {symbol} from {self.exchange_id}: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error fetching data: {e}")
            raise
