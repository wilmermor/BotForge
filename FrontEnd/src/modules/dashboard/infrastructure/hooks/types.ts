export type PositionsTabType = 'HISTORIAL';
export type StrategyType = 'GRID' | 'DCA';

export interface GridParams {
    lower_price: number;
    upper_price: number;
    grid_count: number;
    investment_amount: number;
}

export interface DcaParams {
    buy_amount: number;
    interval_bars: number;
    take_profit_pct: number | null;
    stop_loss_pct: number | null;
}

export interface SimulationTrade {
    timestamp: string;
    side: 'buy' | 'sell';
    quantity: number;
    price: number;
    pnl: number | null;
}

export interface SimulationMetrics {
    total_trades: number;
    win_rate_pct: number;
    total_pnl: number;
    max_drawdown_pct: number;
    roi_pct: number;
    profitable_trades: number;
    losing_trades: number;
    profit_factor?: number;
}

export interface SimulationResult {
    pair: string;
    metrics: SimulationMetrics;
    trades: SimulationTrade[];
}
