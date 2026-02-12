"""
BotForge Backend – Backtest Service

Orchestrates the simulation engine with data retrieval and persistence.
"""

from sqlalchemy.orm import Session

from app.models.backtest import Backtest, TradeRecord
from app.schemas.backtest import BacktestRequest, BacktestResponse, BacktestSummary


class BacktestService:
    """Business logic layer for backtest operations."""

    def __init__(self, db: Session):
        self.db = db

    def run_backtest(self, request: BacktestRequest) -> BacktestResponse:
        """
        Execute a backtest and persist the results.

        TODO: Connect to real OHLCV data and SimulationEngine.
        Currently returns a placeholder response.
        """
        # Placeholder until data ingestion is implemented
        backtest = Backtest(
            symbol=request.symbol,
            timeframe=request.timeframe,
            strategy=request.strategy,
            parameters=request.parameters,
            initial_capital=request.initial_capital,
            final_capital=request.initial_capital,
            total_return_pct=0.0,
            total_trades=0,
            winning_trades=0,
            losing_trades=0,
            win_rate=0.0,
            max_drawdown_pct=0.0,
            sharpe_ratio=0.0,
        )

        self.db.add(backtest)
        self.db.commit()
        self.db.refresh(backtest)

        return BacktestResponse(
            id=backtest.id,
            symbol=backtest.symbol,
            timeframe=backtest.timeframe,
            strategy=backtest.strategy,
            start_date=backtest.start_date or backtest.created_at,
            end_date=backtest.end_date or backtest.created_at,
            initial_capital=backtest.initial_capital,
            final_capital=backtest.final_capital,
            total_return_pct=backtest.total_return_pct,
            total_trades=backtest.total_trades,
            winning_trades=backtest.winning_trades,
            losing_trades=backtest.losing_trades,
            win_rate=backtest.win_rate,
            max_drawdown_pct=backtest.max_drawdown_pct,
            sharpe_ratio=backtest.sharpe_ratio,
            trades=[],
            equity_curve=[],
            created_at=backtest.created_at,
        )

    def get_backtest_by_id(self, backtest_id: int) -> BacktestResponse | None:
        """Retrieve a backtest by its ID."""
        backtest = self.db.query(Backtest).filter(Backtest.id == backtest_id).first()
        if not backtest:
            return None

        return BacktestResponse(
            id=backtest.id,
            symbol=backtest.symbol,
            timeframe=backtest.timeframe,
            strategy=backtest.strategy,
            start_date=backtest.start_date or backtest.created_at,
            end_date=backtest.end_date or backtest.created_at,
            initial_capital=backtest.initial_capital,
            final_capital=backtest.final_capital,
            total_return_pct=backtest.total_return_pct,
            total_trades=backtest.total_trades,
            winning_trades=backtest.winning_trades,
            losing_trades=backtest.losing_trades,
            win_rate=backtest.win_rate,
            max_drawdown_pct=backtest.max_drawdown_pct,
            sharpe_ratio=backtest.sharpe_ratio,
            trades=[],
            equity_curve=[],
            created_at=backtest.created_at,
        )

    def list_backtests(self, skip: int = 0, limit: int = 20) -> list[BacktestSummary]:
        """List backtests with pagination."""
        backtests = (
            self.db.query(Backtest)
            .order_by(Backtest.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

        return [
            BacktestSummary(
                id=bt.id,
                symbol=bt.symbol,
                timeframe=bt.timeframe,
                strategy=bt.strategy,
                total_return_pct=bt.total_return_pct,
                win_rate=bt.win_rate,
                total_trades=bt.total_trades,
                created_at=bt.created_at,
            )
            for bt in backtests
        ]
