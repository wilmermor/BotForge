"""
BotForge Backend – Simulation Engine Tests
"""

import numpy as np
import pandas as pd
import pytest

from app.core.simulation_engine import SimulationEngine
from app.core.indicators.technical import sma, ema, rsi


# ========== Simulation Engine Tests ==========

class TestSimulationEngine:
    """Tests for the vectorized backtesting engine."""

    def _make_df(self, prices: list[float]) -> pd.DataFrame:
        """Helper to create a minimal OHLCV DataFrame from close prices."""
        n = len(prices)
        return pd.DataFrame({
            "timestamp": pd.date_range("2024-01-01", periods=n, freq="h"),
            "open": prices,
            "high": [p * 1.01 for p in prices],
            "low": [p * 0.99 for p in prices],
            "close": prices,
            "volume": [1000.0] * n,
        })

    def test_basic_profitable_trade(self):
        """A single buy-then-sell on rising prices should yield positive PnL."""
        prices = [100, 101, 102, 103, 104, 105]
        df = self._make_df(prices)
        signals = np.array([1, 0, 0, 0, 0, -1])  # buy at 100, sell at 105

        engine = SimulationEngine(initial_capital=10_000)
        result = engine.run(df, signals, symbol="TEST/USD", strategy="test")

        assert result.total_trades == 1
        assert result.winning_trades == 1
        assert result.losing_trades == 0
        assert result.trades[0].pnl > 0

    def test_basic_losing_trade(self):
        """A buy-then-sell on falling prices should yield negative PnL."""
        prices = [100, 99, 98, 97, 96, 95]
        df = self._make_df(prices)
        signals = np.array([1, 0, 0, 0, 0, -1])

        engine = SimulationEngine(initial_capital=10_000)
        result = engine.run(df, signals, symbol="TEST/USD", strategy="test")

        assert result.total_trades == 1
        assert result.trades[0].pnl < 0

    def test_no_signals_no_trades(self):
        """All-zero signals should produce no trades."""
        prices = [100, 101, 102, 103, 104]
        df = self._make_df(prices)
        signals = np.zeros(len(prices), dtype=int)

        engine = SimulationEngine()
        result = engine.run(df, signals)

        assert result.total_trades == 0
        assert result.equity_curve[0] == 10_000

    def test_mismatched_lengths_raises(self):
        """Mismatched DataFrame and signals should raise ValueError."""
        df = self._make_df([100, 101, 102])
        signals = np.array([1, 0])

        engine = SimulationEngine()
        with pytest.raises(ValueError, match="must match"):
            engine.run(df, signals)


# ========== Technical Indicator Tests ==========

class TestIndicators:
    """Tests for technical indicators."""

    def test_sma_basic(self):
        """SMA of [1,2,3,4,5] with period 3 should give correct values."""
        data = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
        result = sma(data, 3)

        assert np.isnan(result[0])
        assert np.isnan(result[1])
        assert result[2] == pytest.approx(2.0)
        assert result[3] == pytest.approx(3.0)
        assert result[4] == pytest.approx(4.0)

    def test_ema_basic(self):
        """EMA should produce non-NaN values after the warm-up period."""
        data = np.array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0])
        result = ema(data, 3)

        assert np.isnan(result[0])
        assert np.isnan(result[1])
        assert not np.isnan(result[2])
        assert not np.isnan(result[6])

    def test_rsi_range(self):
        """RSI should be between 0 and 100."""
        data = np.array([44, 44.34, 44.09, 43.61, 44.33, 44.83, 45.10,
                         45.42, 45.84, 46.08, 45.89, 46.03, 45.61, 46.28,
                         46.28, 46.00, 46.03, 46.41, 46.22, 45.64])
        result = rsi(data, 14)

        valid = result[~np.isnan(result)]
        assert len(valid) > 0
        assert all(0 <= v <= 100 for v in valid)

    def test_sma_invalid_period(self):
        """SMA with period < 1 should raise ValueError."""
        with pytest.raises(ValueError):
            sma(np.array([1.0, 2.0]), 0)
