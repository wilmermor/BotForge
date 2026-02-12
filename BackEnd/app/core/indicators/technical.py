"""
BotForge Backend – Technical Indicators

Vectorized implementations of common technical indicators using NumPy.
"""

import numpy as np


def sma(data: np.ndarray, period: int) -> np.ndarray:
    """
    Simple Moving Average.

    Args:
        data: 1D array of prices.
        period: Number of periods.

    Returns:
        SMA array (NaN for the first `period - 1` elements).
    """
    if period < 1:
        raise ValueError("Period must be >= 1")

    result = np.full(len(data), np.nan)
    for i in range(period - 1, len(data)):
        result[i] = np.mean(data[i - period + 1 : i + 1])
    return result


def ema(data: np.ndarray, period: int) -> np.ndarray:
    """
    Exponential Moving Average.

    Args:
        data: 1D array of prices.
        period: Number of periods.

    Returns:
        EMA array (NaN for the first `period - 1` elements).
    """
    if period < 1:
        raise ValueError("Period must be >= 1")

    result = np.full(len(data), np.nan)
    multiplier = 2.0 / (period + 1)

    # Seed with SMA
    result[period - 1] = np.mean(data[:period])

    for i in range(period, len(data)):
        result[i] = (data[i] - result[i - 1]) * multiplier + result[i - 1]

    return result


def rsi(data: np.ndarray, period: int = 14) -> np.ndarray:
    """
    Relative Strength Index.

    Args:
        data: 1D array of prices.
        period: RSI period (default 14).

    Returns:
        RSI array (values 0-100, NaN for initial elements).
    """
    if period < 1:
        raise ValueError("Period must be >= 1")

    deltas = np.diff(data)
    gains = np.where(deltas > 0, deltas, 0.0)
    losses = np.where(deltas < 0, -deltas, 0.0)

    result = np.full(len(data), np.nan)

    # Initial averages
    avg_gain = np.mean(gains[:period])
    avg_loss = np.mean(losses[:period])

    if avg_loss == 0:
        result[period] = 100.0
    else:
        rs = avg_gain / avg_loss
        result[period] = 100.0 - (100.0 / (1.0 + rs))

    # Rolling calculation
    for i in range(period, len(deltas)):
        avg_gain = (avg_gain * (period - 1) + gains[i]) / period
        avg_loss = (avg_loss * (period - 1) + losses[i]) / period

        if avg_loss == 0:
            result[i + 1] = 100.0
        else:
            rs = avg_gain / avg_loss
            result[i + 1] = 100.0 - (100.0 / (1.0 + rs))

    return result
