"""
BotForge Backend – Base Strategy

Abstract base class that all trading strategies must implement.
"""

from abc import ABC, abstractmethod

import numpy as np
import pandas as pd


class BaseStrategy(ABC):
    """
    Abstract base class for trading strategies.

    Subclasses must implement `generate_signals` which returns
    an array of signals: 1 (buy), -1 (sell), 0 (hold).
    """

    name: str = "base"

    @abstractmethod
    def generate_signals(self, df: pd.DataFrame, **params) -> np.ndarray:
        """
        Generate trading signals from OHLCV data.

        Args:
            df: DataFrame with columns ['timestamp', 'open', 'high', 'low', 'close', 'volume'].
            **params: Strategy-specific parameters.

        Returns:
            numpy array of signals (1 = buy, -1 = sell, 0 = hold).
        """
        ...
