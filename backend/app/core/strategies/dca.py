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
        buy_amount = self.params["buy_amount"]
        interval = self.params["interval_bars"]
        tp_pct = self.params.get("take_profit_pct")
        sl_pct = self.params.get("stop_loss_pct")

        signals = []
        quantities = []
        prices = []

        # Position tracking
        total_qty = 0.0
        total_cost = 0.0
        bars_since_last_buy = interval  # Buy on first bar

        close_prices = df["close"].values

        for i in range(len(close_prices)):
            price = close_prices[i]
            signal = 0
            qty = 0.0

            # Check TP/SL exits first (if we have a position)
            if total_qty > 0:
                avg_price = total_cost / total_qty
                pnl_pct = ((price - avg_price) / avg_price) * 100

                # Take Profit
                if tp_pct is not None and pnl_pct >= tp_pct:
                    signal = -1
                    qty = total_qty
                    total_qty = 0.0
                    total_cost = 0.0
                    bars_since_last_buy = 0
                    signals.append(signal)
                    quantities.append(qty)
                    prices.append(price)
                    continue

                # Stop Loss
                if sl_pct is not None and pnl_pct <= -sl_pct:
                    signal = -1
                    qty = total_qty
                    total_qty = 0.0
                    total_cost = 0.0
                    bars_since_last_buy = 0
                    signals.append(signal)
                    quantities.append(qty)
                    prices.append(price)
                    continue

            # DCA Buy at interval
            bars_since_last_buy += 1
            if bars_since_last_buy >= interval:
                signal = 1
                qty = buy_amount / price
                total_qty += qty
                total_cost += buy_amount
                bars_since_last_buy = 0

            signals.append(signal)
            quantities.append(qty)
            prices.append(price)

        df["signal"] = signals
        df["quantity"] = quantities
        df["exec_price"] = prices

        return df
