"""
BotForge - DCA (Dollar-Cost Averaging) Strategy.

DCA buys a fixed dollar amount of an asset at regular intervals,
regardless of price. Optional take-profit and stop-loss exits.

Parameters:
    buy_amount: float      — USD amount to buy at each interval
    interval_bars: int     — number of bars between each buy (e.g., 24 = every 24h on 1h)
    take_profit_pct: float — optional % gain to trigger full sell (e.g., 10.0 = 10%)
    stop_loss_pct: float   — optional % loss to trigger full sell (e.g., 5.0 = -5%)
"""

from typing import Any

import numpy as np
import pandas as pd

from app.core.strategies.base import BaseStrategy


class DCAStrategy(BaseStrategy):
    """Dollar-Cost Averaging strategy implementation."""

    @property
    def name(self) -> str:
        return "Dollar-Cost Averaging (DCA)"

    def validate_params(self) -> None:
        """Validate DCA strategy parameters."""
        if "buy_amount" not in self.params:
            raise ValueError("Missing required parameter: buy_amount")
        if self.params["buy_amount"] <= 0:
            raise ValueError("buy_amount must be positive")
        if "interval_bars" not in self.params:
            raise ValueError("Missing required parameter: interval_bars")
        if self.params["interval_bars"] < 1:
            raise ValueError("interval_bars must be at least 1")

    def generate_signals(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Generate DCA signals.

        Logic:
        - Every `interval_bars` candles, generate a BUY signal.
        - Track average entry price and total position.
        - If take_profit_pct is set and unrealized gain >= TP → SELL ALL.
        - If stop_loss_pct is set and unrealized loss >= SL → SELL ALL.
        - After a TP/SL exit, restart DCA accumulation.
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

        buy_amount = float(self.params["buy_amount"])
        interval = int(self.params["interval_bars"])
        
        tp_pct = self.params.get("take_profit_pct")
        if tp_pct is not None: tp_pct = float(tp_pct)
            
        sl_pct = self.params.get("stop_loss_pct")
        if sl_pct is not None: sl_pct = float(sl_pct)

        close_prices = df["close"].to_numpy()
        n_prices = len(close_prices)

        signals = np.zeros(n_prices, dtype=np.int8)
        quantities = np.zeros(n_prices, dtype=np.float64)

        # Position tracking
        total_qty = 0.0
        total_cost = 0.0
        bars_since_last_buy = interval  # Buy on first bar

        for i in range(n_prices):
            price = close_prices[i]

            # Security catch, prevent devision by zero or issues with NaNs
            if price <= 0.0 or np.isnan(price):
                continue

            # Check TP/SL exits first (if we have a position)
            if total_qty > 0.0:
                avg_price = total_cost / total_qty
                
                if avg_price > 0.0:
                    pnl_pct = ((price - avg_price) / avg_price) * 100.0
                else:
                    pnl_pct = 0.0

                # Take Profit
                if tp_pct is not None and pnl_pct >= tp_pct:
                    signals[i] = -1
                    quantities[i] = total_qty
                    total_qty = 0.0
                    total_cost = 0.0
                    bars_since_last_buy = 0
                    continue

                # Stop Loss
                if sl_pct is not None and pnl_pct <= -sl_pct:
                    signals[i] = -1
                    quantities[i] = total_qty
                    total_qty = 0.0
                    total_cost = 0.0
                    bars_since_last_buy = 0
                    continue

            # DCA Buy at interval
            bars_since_last_buy += 1
            if bars_since_last_buy >= interval:
                signals[i] = 1
                buy_qty = buy_amount / price
                quantities[i] = buy_qty
                total_qty += buy_qty
                total_cost += buy_amount
                bars_since_last_buy = 0

        df["signal"] = signals
        df["quantity"] = quantities
        df["exec_price"] = close_prices

        return df
