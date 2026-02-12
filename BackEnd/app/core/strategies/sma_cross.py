"""
BotForge Backend – SMA Crossover Strategy

Classic moving average crossover: buy when short SMA crosses above long SMA,
sell when it crosses below.
"""

import numpy as np
import pandas as pd

from app.core.strategies.base import BaseStrategy
from app.core.indicators.technical import sma


class SMACrossStrategy(BaseStrategy):
    """Simple Moving Average Crossover strategy."""

    name = "sma_cross"

    def generate_signals(
        self,
        df: pd.DataFrame,
        short_period: int = 20,
        long_period: int = 50,
        **params,
    ) -> np.ndarray:
        """
        Generate buy/sell signals based on SMA crossover.

        Args:
            df: OHLCV DataFrame.
            short_period: Period for the fast SMA.
            long_period: Period for the slow SMA.

        Returns:
            Signal array: 1 (buy), -1 (sell), 0 (hold).
        """
        close = df["close"].values.astype(float)

        short_sma = sma(close, short_period)
        long_sma = sma(close, long_period)

        signals = np.zeros(len(close), dtype=int)

        # Crossover detection
        for i in range(1, len(close)):
            if np.isnan(short_sma[i]) or np.isnan(long_sma[i]):
                continue
            # Golden cross: short crosses above long
            if short_sma[i] > long_sma[i] and short_sma[i - 1] <= long_sma[i - 1]:
                signals[i] = 1
            # Death cross: short crosses below long
            elif short_sma[i] < long_sma[i] and short_sma[i - 1] >= long_sma[i - 1]:
                signals[i] = -1

        return signals
