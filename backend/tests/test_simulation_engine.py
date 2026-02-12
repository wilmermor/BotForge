"""
BotForge - Simulation Engine Unit Tests.

Tests the backtesting engine, strategies, and metrics without DB/API.
"""

import numpy as np
import pytest

from app.core.metrics import max_drawdown, profit_factor, roi, sharpe_ratio, win_rate
from app.core.simulation_engine import run_simulation


# ----------------------------------------------------------------
# Sample OHLCV data (simulated BTC-like price movement)
# ----------------------------------------------------------------
def _make_ohlcv(prices: list[float]) -> list[dict]:
    """Create OHLCV data from a list of close prices."""
    data = []
    base_ts = 1700000000000  # ms timestamp
    for i, price in enumerate(prices):
        data.append({
            "timestamp": base_ts + i * 3600000,  # 1h intervals
            "open": price * 0.999,
            "high": price * 1.005,
            "low": price * 0.995,
            "close": price,
            "volume": 100.0 + i,
        })
    return data


# ----------------------------------------------------------------
# Metrics tests
# ----------------------------------------------------------------

class TestMetrics:
    def test_roi_positive(self):
        assert roi(10000, 11500) == 15.0

    def test_roi_negative(self):
        assert roi(10000, 8000) == -20.0

    def test_roi_zero_capital(self):
        assert roi(0, 100) == 0.0

    def test_sharpe_ratio_basic(self):
        returns = np.array([0.01, 0.02, -0.005, 0.015, 0.008])
        result = sharpe_ratio(returns)
        assert result is not None
        assert isinstance(result, float)

    def test_sharpe_ratio_insufficient_data(self):
        assert sharpe_ratio(np.array([0.01])) is None

    def test_max_drawdown(self):
        curve = np.array([100, 110, 105, 95, 100, 120])
        dd = max_drawdown(curve)
        assert dd < 0  # Should be negative
        assert dd == pytest.approx(-13.636, abs=0.01)

    def test_win_rate(self):
        pnls = np.array([100, -50, 200, -30, 80])
        assert win_rate(pnls) == 60.0

    def test_win_rate_empty(self):
        assert win_rate(np.array([])) == 0.0

    def test_profit_factor(self):
        pnls = np.array([100, -50, 200, -30])
        pf = profit_factor(pnls)
        assert pf is not None
        assert pf == pytest.approx(3.75, abs=0.01)

    def test_profit_factor_no_losses(self):
        pnls = np.array([100, 200])
        assert profit_factor(pnls) == float("inf")


# ----------------------------------------------------------------
# Grid strategy tests
# ----------------------------------------------------------------

class TestGridSimulation:
    def test_grid_basic(self):
        """Grid strategy generates trades when price moves through grid levels."""
        # Price swings between 60k and 70k
        prices = [65000, 63000, 61000, 60000, 62000, 64000, 66000,
                  68000, 70000, 67000, 64000, 61000, 63000, 66000, 69000]
        ohlcv = _make_ohlcv(prices)

        result = run_simulation(
            ohlcv_data=ohlcv,
            strategy_type="grid",
            strategy_params={
                "upper_price": 70000,
                "lower_price": 60000,
                "grid_count": 5,
                "investment_amount": 5000,
            },
        )

        assert "metrics" in result
        assert "equity_curve" in result
        assert "trades" in result
        assert result["metrics"]["total_trades"] >= 0
        assert len(result["equity_curve"]) == len(prices)

    def test_grid_invalid_params(self):
        """Grid with invalid params raises ValueError."""
        with pytest.raises(ValueError, match="upper_price must be greater"):
            run_simulation(
                ohlcv_data=_make_ohlcv([100, 200]),
                strategy_type="grid",
                strategy_params={
                    "upper_price": 50,
                    "lower_price": 100,
                    "grid_count": 5,
                    "investment_amount": 1000,
                },
            )


# ----------------------------------------------------------------
# DCA strategy tests
# ----------------------------------------------------------------

class TestDCASimulation:
    def test_dca_basic(self):
        """DCA buys at regular intervals."""
        prices = [50000, 49000, 48000, 47000, 48000, 49000, 50000,
                  51000, 52000, 53000, 54000, 55000]
        ohlcv = _make_ohlcv(prices)

        result = run_simulation(
            ohlcv_data=ohlcv,
            strategy_type="dca",
            strategy_params={
                "buy_amount": 100,
                "interval_bars": 3,
            },
        )

        assert result["metrics"]["total_trades"] > 0
        # All trades should be buys (no TP/SL set)
        buy_trades = [t for t in result["trades"] if t["side"] == "buy"]
        assert len(buy_trades) >= 3  # ~12 bars / 3 interval

    def test_dca_with_take_profit(self):
        """DCA with take-profit triggers a sell."""
        # Price rises significantly
        prices = [50000, 50000, 50000, 55000, 60000, 65000]
        ohlcv = _make_ohlcv(prices)

        result = run_simulation(
            ohlcv_data=ohlcv,
            strategy_type="dca",
            strategy_params={
                "buy_amount": 100,
                "interval_bars": 1,
                "take_profit_pct": 10.0,
            },
        )

        sell_trades = [t for t in result["trades"] if t["side"] == "sell"]
        assert len(sell_trades) >= 1

    def test_unknown_strategy(self):
        """Unknown strategy type raises ValueError."""
        with pytest.raises(ValueError, match="Unknown strategy type"):
            run_simulation(
                ohlcv_data=_make_ohlcv([100]),
                strategy_type="martingale",
                strategy_params={},
            )

    def test_empty_data(self):
        """Empty OHLCV data raises ValueError."""
        with pytest.raises(ValueError, match="No data"):
            run_simulation(
                ohlcv_data=[],
                strategy_type="dca",
                strategy_params={"buy_amount": 100, "interval_bars": 1},
            )
