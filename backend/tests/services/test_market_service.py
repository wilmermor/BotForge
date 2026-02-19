import pytest
from unittest.mock import MagicMock, AsyncMock, patch
from datetime import datetime, timezone
import json
from app.services.market_service import fetch_ohlcv
from app.services.market_data import MarketDataService

@pytest.fixture
def mock_redis():
    mock = AsyncMock()
    mock.get = AsyncMock(return_value=None)
    mock.set = AsyncMock()
    return mock

@pytest.fixture
def mock_market_data_service():
    with patch("app.services.market_service.MarketDataService") as MockService:
        mock_instance = MockService.return_value
        mock_instance.fetch_ohlcv = AsyncMock()
        mock_instance.close = AsyncMock()
        yield mock_instance

@pytest.mark.asyncio
async def test_fetch_ohlcv_cache_hit(mock_redis):
    """Test that data is returned from Redis if available."""
    cached_data = [{"timestamp": 1600000000000, "close": 100}]
    mock_redis.get.return_value = json.dumps(cached_data)

    result = await fetch_ohlcv(
        pair="BTCUSDT",
        timeframe="1h",
        start_date=datetime(2023, 1, 1),
        end_date=datetime(2023, 1, 2),
        redis_client=mock_redis
    )

    assert result == cached_data
    mock_redis.get.assert_called_once()
    # Should not instantiate MarketDataService
    with patch("app.services.market_service.MarketDataService") as MockService:
        assert not MockService.called

@pytest.mark.asyncio
async def test_fetch_ohlcv_cache_miss_single_batch(mock_redis, mock_market_data_service):
    """Test fetching from service on cache miss (single batch)."""
    mock_data = [{"timestamp": 1600000000000, "close": 100}]
    mock_market_data_service.fetch_ohlcv.return_value = mock_data

    start_date = datetime(2023, 1, 1, tzinfo=timezone.utc)
    end_date = datetime(2023, 1, 2, tzinfo=timezone.utc)

    result = await fetch_ohlcv(
        pair="BTCUSDT",
        timeframe="1h",
        start_date=start_date,
        end_date=end_date,
        redis_client=mock_redis
    )

    assert result == mock_data
    # Verify symbol conversion
    mock_market_data_service.fetch_ohlcv.assert_called_with(
        symbol="BTC/USDT",
        timeframe="1h",
        since=start_date,
        limit=1000
    )
    mock_redis.set.assert_called_once()
    mock_market_data_service.close.assert_called_once()

@pytest.mark.asyncio
async def test_fetch_ohlcv_pagination(mock_redis, mock_market_data_service):
    """Test pagination loop when fetching large ranges."""
    # Batch 1: timestamp 1000
    # Batch 2: timestamp 2000
    # End: timestamp 3000
    batch1 = [{"timestamp": 1000, "close": 10}]
    batch2 = [{"timestamp": 2000, "close": 20}]
    
    # Mock return values for consecutive calls
    mock_market_data_service.fetch_ohlcv.side_effect = [batch1, batch2, []]

    start_date = datetime.fromtimestamp(1000/1000, tz=timezone.utc) # ts=1
    end_date = datetime.fromtimestamp(3000/1000, tz=timezone.utc)   # ts=3

    # Patch BATCH_LIMIT to 1 so the loop continues even with 1 item
    with patch("app.services.market_service.BATCH_LIMIT", 1):
        result = await fetch_ohlcv(
            pair="ETHBTC", 
            timeframe="1s",
            start_date=start_date,
            end_date=end_date,
            redis_client=mock_redis
        )

    assert len(result) == 2
    assert result[0] == batch1[0]
    assert result[1] == batch2[0]
    
    assert mock_market_data_service.fetch_ohlcv.call_count == 3
    # Check calls
    # Call 1: since=1.0
    # Call 2: since=1.001 (1000ms + 1ms)
    # Call 3: since=2.001 (2000ms + 1ms)
    
    mock_market_data_service.fetch_ohlcv.assert_any_call(
        symbol="ETH/BTC", # Converted
        timeframe="1s",
        since=start_date,
        limit=1
    )

