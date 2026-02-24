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
        
        # Edge case: empty dataframe or missing close column
        if df.empty or "close" not in df.columns:
            df["signal"] = 0
            df["quantity"] = 0.0
            if "close" in df.columns:
                df["exec_price"] = df["close"]
            else:
                df["exec_price"] = 0.0
            return df

        # Edge case: handle NaNs by forward-filling, then backward-filling
        df["close"] = df["close"].ffill().bfill()

        upper = float(self.params["upper_price"])
        lower = float(self.params["lower_price"])
        grid_count = int(self.params["grid_count"])
        investment = float(self.params["investment_amount"])

        # Create grid levels
        grid_levels = np.linspace(lower, upper, grid_count + 1)
        amount_per_grid = investment / grid_count

        # Optimize by using arrays for cache locality and fast access
        levels_qty = np.zeros(len(grid_levels), dtype=np.float64)
        
        close_prices = df["close"].to_numpy()
        n_prices = len(close_prices)
        n_levels = len(grid_levels)
        
        signals = np.zeros(n_prices, dtype=np.int8)
        quantities = np.zeros(n_prices, dtype=np.float64)
        
        for i in range(n_prices):
            price = close_prices[i]
            
            # Additional safety: should not happen after bfill, but protect against invalid prices
            if price <= 0.0 or np.isnan(price):
                continue
                
            # Ensure max 1 action per time step to avoid net overlap
            action_taken = False
            
            # Check Sells First: iterate lowest to highest level
            # If price rises above a level we hold, we sell it.
            for j in range(n_levels):
                if price >= grid_levels[j] and levels_qty[j] > 0.0:
                    signals[i] = -1
                    quantities[i] = levels_qty[j]
                    levels_qty[j] = 0.0
                    action_taken = True
                    break
                    
            if not action_taken:
                # Check Buys: iterate highest to lowest level
                # If price drops below a level we don't hold, we buy it.
                for j in range(n_levels - 1, -1, -1):
                    if price <= grid_levels[j] and levels_qty[j] == 0.0:
                        signals[i] = 1
                        buy_qty = amount_per_grid / price
                        quantities[i] = buy_qty
                        levels_qty[j] = buy_qty
                        break

        df["signal"] = signals
        df["quantity"] = quantities
        df["exec_price"] = close_prices

        return df
