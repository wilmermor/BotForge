import pytest
from unittest.mock import MagicMock, AsyncMock, patch
from datetime import datetime, timezone
import ccxt.async_support as ccxt
from ccxt.base.errors import NetworkError, RateLimitExceeded
from app.services.market_data import MarketDataService

@pytest.fixture
async def market_service():
    service = MarketDataService("binance")
    yield service
    await service.close()

@pytest.mark.asyncio
async def test_fetch_ohlcv_success():
    # Mock data to be returned by ccxt
    # [timestamp, open, high, low, close, volume]
    mock_ohlcv_data = [
        [1600000000000, 10000.0, 10100.0, 9900.0, 10050.0, 1.5],
        [1600003600000, 10050.0, 10200.0, 10000.0, 10150.0, 2.0],
    ]

    with patch('ccxt.async_support.binance') as MockExchange:
        # Configuration of the mock
        mock_instance = MockExchange.return_value
        mock_instance.fetch_ohlcv = AsyncMock(return_value=mock_ohlcv_data)
        mock_instance.close = AsyncMock()
        
        service = MarketDataService("binance")
        # Inject the mock instance into the service to ensure we use the configured mock
        service.exchange = mock_instance

        result = await service.fetch_ohlcv("BTC/USDT")

        assert len(result) == 2
        assert result[0]["timestamp"] == 1600000000000
        assert result[0]["close"] == 10050.0
        assert result[1]["volume"] == 2.0
        
        # Verify call arguments
        mock_instance.fetch_ohlcv.assert_called_with(
            symbol="BTC/USDT",
            timeframe="1h",
            limit=100,
            since=None
        )
        
        await service.close()

@pytest.mark.asyncio
async def test_fetch_ohlcv_network_error():
    with patch('ccxt.async_support.binance') as MockExchange:
        mock_instance = MockExchange.return_value
        # Simulate NetworkError
        mock_instance.fetch_ohlcv = AsyncMock(side_effect=NetworkError("Network Error"))
        mock_instance.close = AsyncMock()

        service = MarketDataService("binance")
        service.exchange = mock_instance

        with pytest.raises(NetworkError):
            await service.fetch_ohlcv("BTC/USDT")
            
        await service.close()

@pytest.mark.asyncio
async def test_fetch_ohlcv_rate_limit_error():
    with patch('ccxt.async_support.binance') as MockExchange:
        mock_instance = MockExchange.return_value
        # Simulate RateLimitExceeded
        mock_instance.fetch_ohlcv = AsyncMock(side_effect=RateLimitExceeded("Rate Limit"))
        mock_instance.close = AsyncMock()

        service = MarketDataService("binance")
        service.exchange = mock_instance

        with pytest.raises(RateLimitExceeded):
            await service.fetch_ohlcv("BTC/USDT")
            
        await service.close()
