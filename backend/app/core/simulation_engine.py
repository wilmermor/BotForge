"""
BotForge - Simulation Engine.

Orchestrates the backtesting flow:
1. Convert raw OHLCV data to a pandas DataFrame.
2. Instantiate the requested strategy.
3. Generate signals.
4. Simulate trades and build equity curve.
5. Calculate performance metrics.

Returns a dict with metrics, equity_curve, and trades — ready for DB storage.
"""

from typing import Any

import numpy as np
import pandas as pd

from app.core.metrics import (
    calmar_ratio,
    max_drawdown,
    profit_factor,
    roi,
    sharpe_ratio,
    sortino_ratio,
    win_rate,
)
from app.core.strategies.base import BaseStrategy
from app.core.strategies.dca import DCAStrategy
from app.core.strategies.grid import GridStrategy

# Strategy registry
STRATEGY_REGISTRY: dict[str, type[BaseStrategy]] = {
    "grid": GridStrategy,
    "dca": DCAStrategy,
}


def _build_dataframe(ohlcv_data: list[dict]) -> pd.DataFrame:
    """Convert raw OHLCV list of dicts to a DataFrame."""
    df = pd.DataFrame(ohlcv_data)
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
    df = df.sort_values("timestamp").reset_index(drop=True)
    return df


def _simulate_trades(
    df: pd.DataFrame,
    initial_capital: float = 10000.0,
    fee_rate: float = 0.001,
    slippage_pct: float = 0.001,
) -> dict[str, Any]:
    """
    Walk through signal-annotated DataFrame and simulate trades.

    Tracks:
    - Cash balance and asset position.
    - Equity curve (cash + position value at each bar).
    - Individual trade P&L records.
    """
    cash = initial_capital
    position_qty = 0.0
    position_avg_price = 0.0
    total_cost_basis = 0.0

    equity_curve = []
    trades = []
    trade_pnls = []

    for _, row in df.iterrows():
        signal = row.get("signal", 0)
        qty = row.get("quantity", 0.0)
        price = row.get("exec_price", row["close"])

        if signal == 1 and qty > 0:
            # BUY
            actual_slippage = np.random.uniform(0, slippage_pct)
            exec_price = price * (1 + actual_slippage)
            
            cost = qty * exec_price
            fee = cost * fee_rate
            total_cost = cost + fee
            
            if total_cost <= cash:
                cash -= total_cost
                total_cost_basis += total_cost
                position_qty += qty
                if position_qty > 0:
                    position_avg_price = total_cost_basis / position_qty
                trades.append({
                    "timestamp": row["timestamp"].isoformat(),
                    "side": "buy",
                    "price": float(exec_price),
                    "fee": float(fee),
                    "quantity": float(qty),
                    "pnl": None,
                })

        elif signal == -1 and qty > 0 and position_qty > 0:
            # SELL
            actual_slippage = np.random.uniform(0, slippage_pct)
            exec_price = price * (1 - actual_slippage)
            
            sell_qty = min(qty, position_qty)
            revenue = sell_qty * exec_price
            fee = revenue * fee_rate
            net_revenue = revenue - fee
            
            cost_of_sold = sell_qty * position_avg_price
            pnl = net_revenue - cost_of_sold

            cash += net_revenue
            position_qty -= sell_qty
            if position_qty > 0:
                total_cost_basis = position_qty * position_avg_price
            else:
                total_cost_basis = 0.0
                position_avg_price = 0.0

            trade_pnls.append(pnl)
            trades.append({
                "timestamp": row["timestamp"].isoformat(),
                "side": "sell",
                "price": float(exec_price),
                "fee": float(fee),
                "quantity": float(sell_qty),
                "pnl": float(pnl),
            })

        # Record equity at this bar
        equity = cash + (position_qty * row["close"])
        equity_curve.append({
            "timestamp": row["timestamp"].isoformat(),
            "equity": float(equity),
        })

    # Final equity (mark-to-market)
    final_equity = cash + (position_qty * df.iloc[-1]["close"]) if len(df) > 0 else initial_capital

    return {
        "initial_capital": initial_capital,
        "final_equity": final_equity,
        "cash": cash,
        "position_qty": position_qty,
        "equity_curve": equity_curve,
        "trades": trades,
        "trade_pnls": np.array(trade_pnls) if trade_pnls else np.array([]),
    }


def run_simulation(
    ohlcv_data: list[dict],
    strategy_type: str,
    strategy_params: dict[str, Any],
    initial_capital: float = 10000.0,
    fee_rate: float = 0.001,
    slippage_pct: float = 0.001,
) -> dict[str, Any]:
    """
    Run a complete backtesting simulation.

    Args:
        ohlcv_data: List of OHLCV dicts from market data service.
        strategy_type: 'grid' or 'dca'.
        strategy_params: Strategy configuration.
        initial_capital: Starting capital (default $10,000).
        fee_rate: Fee fraction per trade (e.g. 0.001 for 0.1%).
        slippage_pct: Max slippage penalty per trade (e.g. 0.001 for 0.1%).

    Returns:
        Dict with 'metrics', 'equity_curve', and 'trades'.
    """
    # 1. Get strategy class
    strategy_cls = STRATEGY_REGISTRY.get(strategy_type)
    if not strategy_cls:
        raise ValueError(
            f"Unknown strategy type: {strategy_type}. "
            f"Available: {list(STRATEGY_REGISTRY.keys())}"
        )

    if not ohlcv_data:
        raise ValueError("No data to simulate")

    # 2. Build DataFrame
    df = _build_dataframe(ohlcv_data)

    # 3. Instantiate strategy and generate signals
    strategy = strategy_cls(strategy_params)
    df = strategy.generate_signals(df)

    # 4. Simulate trades
    result = _simulate_trades(df, initial_capital, fee_rate, slippage_pct)

    # 5. Calculate metrics
    equity_values = np.array([e["equity"] for e in result["equity_curve"]])

    # Periodic returns for Sharpe calculation
    if len(equity_values) > 1:
        returns = np.diff(equity_values) / equity_values[:-1]
    else:
        returns = np.array([])

    pnls = result["trade_pnls"]
    sell_trades = [t for t in result["trades"] if t["side"] == "sell"]

    max_dd = max_drawdown(equity_values)
    roi_val = roi(initial_capital, result["final_equity"])

    metrics = {
        "roi_pct": round(roi_val, 2),
        "sharpe_ratio": (
            round(sharpe_ratio(returns), 4)
            if sharpe_ratio(returns) is not None
            else None
        ),
        "sortino_ratio": (
            round(sortino_ratio(returns), 4)
            if sortino_ratio(returns) is not None
            else None
        ),
        "calmar_ratio": (
            round(calmar_ratio(roi_val, max_dd), 4)
            if calmar_ratio(roi_val, max_dd) is not None
            else None
        ),
        "max_drawdown_pct": round(max_dd, 2),
        "win_rate_pct": round(win_rate(pnls), 2) if len(pnls) > 0 else 0.0,
        "profit_factor": (
            round(profit_factor(pnls), 4)
            if profit_factor(pnls) is not None
            else None
        ),
        "total_trades": len(result["trades"]),
        "profitable_trades": int(np.sum(pnls > 0)) if len(pnls) > 0 else 0,
        "losing_trades": int(np.sum(pnls < 0)) if len(pnls) > 0 else 0,
        "total_pnl": round(
            float(result["final_equity"] - initial_capital), 2
        ),
    }

    return {
        "metrics": metrics,
        "equity_curve": result["equity_curve"],
        "trades": result["trades"],
    }
