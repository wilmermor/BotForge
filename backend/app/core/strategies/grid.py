"""
BotForge - Grid Trading Strategy.

Grid trading places buy and sell orders at evenly spaced price levels
within a defined range. When price moves between levels, the strategy
accumulates on dips and sells on rises.

Parameters:
    upper_price: float — top of the grid range
    lower_price: float — bottom of the grid range
    grid_count: int   — number of grid levels
    investment_amount: float — total capital to deploy
"""

from typing import Any

import numpy as np
import pandas as pd

from app.core.strategies.base import BaseStrategy


class GridStrategy(BaseStrategy):
    """Grid trading strategy implementation."""

    @property
    def name(self) -> str:
        return "Grid Trading"

    def validate_params(self) -> None:
        """Validate grid strategy parameters."""
        required = ["upper_price", "lower_price", "grid_count", "investment_amount"]
        for key in required:
            if key not in self.params:
                raise ValueError(f"Missing required parameter: {key}")

        if self.params["upper_price"] <= self.params["lower_price"]:
            raise ValueError("upper_price must be greater than lower_price")
        if self.params["grid_count"] < 2:
            raise ValueError("grid_count must be at least 2")
        if self.params["investment_amount"] <= 0:
            raise ValueError("investment_amount must be positive")

    def generate_signals(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Generate grid trading signals.

        Logic:
        - Create evenly spaced grid levels between lower_price and upper_price.
        - When price crosses below a grid level → BUY signal.
        - When price crosses above a grid level → SELL signal.
        - Each grid level can hold at most one position.
        """
        df = df.copy()
        upper = self.params["upper_price"]
        lower = self.params["lower_price"]
        grid_count = self.params["grid_count"]
        investment = self.params["investment_amount"]

        # Create grid levels
        grid_levels = np.linspace(lower, upper, grid_count + 1)
        amount_per_grid = investment / grid_count

        # Track which grid levels have been bought
        grid_bought = {level: False for level in grid_levels}

        signals = []
        quantities = []
        prices = []

        close_prices = df["close"].values

        for i in range(len(close_prices)):
            price = close_prices[i]
            signal = 0
            qty = 0.0
            exec_price = price

            # Check each grid level
            for level in grid_levels:
                if price <= level and not grid_bought[level]:
                    # Price is at or below this grid level → BUY
                    signal = 1
                    qty = amount_per_grid / price
                    grid_bought[level] = True
                    break
                elif price >= level and grid_bought[level]:
                    # Price is at or above a bought level → SELL
                    signal = -1
                    qty = amount_per_grid / level  # Sell the qty bought at level
                    grid_bought[level] = False
                    break

            signals.append(signal)
            quantities.append(qty)
            prices.append(exec_price)

        df["signal"] = signals
        df["quantity"] = quantities
        df["exec_price"] = prices

        return df
