import asyncio
import sys
import os

# Add backend directory to path so we can import app modules
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from app.services.market_data import MarketDataService

async def main():
    print("Initializing MarketDataService...")
    service = MarketDataService("binance")
    
    symbol = "BTC/USDT"
    print(f"Fetching recent 1h candle for {symbol}...")
    
    try:
        data = await service.fetch_ohlcv(symbol, limit=1)
        print("Success!")
        print(f"Data received: {data}")
    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        await service.close()
        print("Service closed.")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
