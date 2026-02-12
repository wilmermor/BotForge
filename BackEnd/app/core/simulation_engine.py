"""
BotForge Backend – Simulation Engine

Vectorized backtesting engine using NumPy for high-performance
strategy simulation over OHLCV data.
"""

from dataclasses import dataclass, field
from datetime import datetime

import numpy as np
import pandas as pd


@dataclass
class Trade:
    """Represents a single executed trade."""

    entry_time: datetime
    exit_time: datetime
    entry_price: float
    exit_price: float
    side: str  # "long" | "short"
    size: float
    pnl: float
    pnl_pct: float


@dataclass
class BacktestResult:
    """Aggregated result of a backtest simulation."""

    symbol: str
    timeframe: str
    strategy: str
    start_date: datetime
    end_date: datetime
    initial_capital: float
    final_capital: float
    total_return_pct: float
    total_trades: int
    winning_trades: int
    losing_trades: int
    win_rate: float
    max_drawdown_pct: float
    sharpe_ratio: float
    trades: list[Trade] = field(default_factory=list)
    equity_curve: list[float] = field(default_factory=list)


class SimulationEngine:
    """
    Vectorized backtesting engine.

    Receives a DataFrame with OHLCV data and a signal array,
    then computes PnL, drawdown, and performance metrics.
    """

    def __init__(self, initial_capital: float = 10_000.0):
        self.initial_capital = initial_capital

    def run(
        self,
        df: pd.DataFrame,
        signals: np.ndarray,
        symbol: str = "BTC/USDT",
        timeframe: str = "1h",
        strategy: str = "custom",
    ) -> BacktestResult:
        """
        Execute a vectorized backtest.

        Args:
            df: DataFrame with columns ['timestamp', 'open', 'high', 'low', 'close', 'volume'].
            signals: Array of signals: 1 = buy, -1 = sell, 0 = hold.
            symbol: Trading pair identifier.
            timeframe: Candle interval.
            strategy: Strategy name for labeling.

        Returns:
            BacktestResult with all performance metrics.
        """
        if len(df) != len(signals):
            raise ValueError(
                f"DataFrame length ({len(df)}) must match signals length ({len(signals)})"
            )

        close = df["close"].values.astype(float)
        timestamps = pd.to_datetime(df["timestamp"])

        # --- Compute returns when in position ---
        price_returns = np.diff(close) / close[:-1]  # pct change
        # Positions: signal shifted by 1 (enter at next bar)
        positions = np.roll(signals, 1)
        positions[0] = 0  # No position on first bar

        # Strategy returns = position * price return
        strategy_returns = positions[1:] * price_returns

        # --- Equity curve ---
        equity_curve = self.initial_capital * np.cumprod(1 + strategy_returns)
        equity_curve = np.insert(equity_curve, 0, self.initial_capital)

        # --- Drawdown ---
        peak = np.maximum.accumulate(equity_curve)
        drawdown = (equity_curve - peak) / peak
        max_drawdown_pct = float(np.min(drawdown)) * 100

        # --- Extract individual trades ---
        trades = self._extract_trades(close, signals, timestamps)

        # --- Metrics ---
        final_capital = float(equity_curve[-1])
        total_return_pct = ((final_capital - self.initial_capital) / self.initial_capital) * 100
        winning = [t for t in trades if t.pnl > 0]
        losing = [t for t in trades if t.pnl <= 0]
        win_rate = len(winning) / len(trades) * 100 if trades else 0.0

        # Sharpe ratio (annualized, assuming hourly by default)
        if len(strategy_returns) > 1 and np.std(strategy_returns) > 0:
            sharpe = float(
                np.mean(strategy_returns) / np.std(strategy_returns) * np.sqrt(8760)
            )
        else:
            sharpe = 0.0

        return BacktestResult(
            symbol=symbol,
            timeframe=timeframe,
            strategy=strategy,
            start_date=timestamps.iloc[0].to_pydatetime(),
            end_date=timestamps.iloc[-1].to_pydatetime(),
            initial_capital=self.initial_capital,
            final_capital=round(final_capital, 2),
            total_return_pct=round(total_return_pct, 2),
            total_trades=len(trades),
            winning_trades=len(winning),
            losing_trades=len(losing),
            win_rate=round(win_rate, 2),
            max_drawdown_pct=round(max_drawdown_pct, 2),
            sharpe_ratio=round(sharpe, 4),
            trades=trades,
            equity_curve=equity_curve.tolist(),
        )

    def _extract_trades(
        self,
        close: np.ndarray,
        signals: np.ndarray,
        timestamps: pd.DatetimeIndex,
    ) -> list[Trade]:
        """Extract individual trades from signals."""
        trades: list[Trade] = []
        in_position = False
        entry_idx = 0

        for i in range(len(signals)):
            if signals[i] == 1 and not in_position:
                # Enter long
                in_position = True
                entry_idx = i
            elif signals[i] == -1 and in_position:
                # Exit long
                in_position = False
                entry_price = float(close[entry_idx])
                exit_price = float(close[i])
                pnl = exit_price - entry_price
                pnl_pct = (pnl / entry_price) * 100

                trades.append(
                    Trade(
                        entry_time=timestamps.iloc[entry_idx].to_pydatetime(),
                        exit_time=timestamps.iloc[i].to_pydatetime(),
                        entry_price=round(entry_price, 2),
                        exit_price=round(exit_price, 2),
                        side="long",
                        size=1.0,
                        pnl=round(pnl, 2),
                        pnl_pct=round(pnl_pct, 4),
                    )
                )

        return trades
