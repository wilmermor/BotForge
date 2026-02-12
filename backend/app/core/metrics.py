"""
BotForge - Performance Metrics Calculator.

Pure functions operating on NumPy arrays to calculate:
- ROI (Return on Investment)
- Sharpe Ratio (annualized)
- Maximum Drawdown
- Win Rate
- Profit Factor
"""

import numpy as np


def roi(initial_capital: float, final_capital: float) -> float:
    """
    Calculate Return on Investment percentage.

    Args:
        initial_capital: Starting capital.
        final_capital: Ending capital.

    Returns:
        ROI as percentage (e.g., 15.5 means 15.5%).
    """
    if initial_capital == 0:
        return 0.0
    return ((final_capital - initial_capital) / initial_capital) * 100


def sharpe_ratio(
    returns: np.ndarray,
    risk_free_rate: float = 0.0,
    periods_per_year: int = 365,
) -> float | None:
    """
    Calculate annualized Sharpe Ratio.

    Args:
        returns: Array of periodic returns (e.g., daily).
        risk_free_rate: Annualized risk-free rate (default 0).
        periods_per_year: Number of periods in a year (365 for daily).

    Returns:
        Annualized Sharpe Ratio, or None if insufficient data.
    """
    if len(returns) < 2:
        return None

    mean_return = np.mean(returns)
    std_return = np.std(returns, ddof=1)

    if std_return == 0:
        return None

    rf_per_period = risk_free_rate / periods_per_year
    sharpe = (mean_return - rf_per_period) / std_return
    return float(sharpe * np.sqrt(periods_per_year))


def max_drawdown(equity_curve: np.ndarray) -> float:
    """
    Calculate Maximum Drawdown percentage.

    Args:
        equity_curve: Array of portfolio values over time.

    Returns:
        Max drawdown as percentage (e.g., -25.3 means -25.3%).
    """
    if len(equity_curve) < 2:
        return 0.0

    peak = np.maximum.accumulate(equity_curve)
    drawdown = (equity_curve - peak) / peak * 100

    return float(np.min(drawdown))


def win_rate(pnls: np.ndarray) -> float:
    """
    Calculate Win Rate percentage.

    Args:
        pnls: Array of individual trade P&Ls.

    Returns:
        Win rate as percentage.
    """
    if len(pnls) == 0:
        return 0.0

    winners = np.sum(pnls > 0)
    return float(winners / len(pnls) * 100)


def profit_factor(pnls: np.ndarray) -> float | None:
    """
    Calculate Profit Factor (gross_profit / gross_loss).

    Args:
        pnls: Array of individual trade P&Ls.

    Returns:
        Profit factor, or None if no losing trades.
    """
    gross_profit = np.sum(pnls[pnls > 0])
    gross_loss = abs(np.sum(pnls[pnls < 0]))

    if gross_loss == 0:
        return None if gross_profit == 0 else float("inf")

    return float(gross_profit / gross_loss)
