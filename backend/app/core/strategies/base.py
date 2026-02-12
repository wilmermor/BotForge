"""
BotForge - Abstract Base Strategy.

All trading strategies must inherit from BaseStrategy and implement
the generate_signals() method.
"""

from abc import ABC, abstractmethod
from typing import Any

import pandas as pd


class BaseStrategy(ABC):
    """
    Abstract base class for trading strategies.

    Each strategy receives OHLCV data as a DataFrame and generates
    buy/sell signals that the simulation engine processes.
    """

    def __init__(self, params: dict[str, Any]):
        """
        Initialize strategy with configuration parameters.

        Args:
            params: Strategy-specific parameters (from JSONB config).
        """
        self.params = params
        self.validate_params()

    @abstractmethod
    def validate_params(self) -> None:
        """
        Validate that required parameters are present and valid.

        Raises ValueError if invalid.
        """
        pass

    @abstractmethod
    def generate_signals(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Generate trading signals from OHLCV data.

        Args:
            df: DataFrame with columns [timestamp, open, high, low, close, volume].

        Returns:
            DataFrame with added 'signal' column:
                1 = buy, -1 = sell, 0 = hold
            And optionally: 'quantity', 'price' columns.
        """
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        """Human-readable strategy name."""
        pass
