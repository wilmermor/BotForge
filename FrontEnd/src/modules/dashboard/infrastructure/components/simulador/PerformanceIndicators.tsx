import React from 'react';
import { Activity, TrendingUp, TrendingDown, BookOpen } from 'lucide-react';
import type { SimulationResult } from '../../hooks/types';

interface PerformanceIndicatorsProps {
    simulationResult: SimulationResult | null;
}

const PerformanceIndicators: React.FC<PerformanceIndicatorsProps> = ({ simulationResult }) => {
    const metrics = simulationResult?.metrics;

    const IndicatorCard = ({
        label,
        value,
        icon: Icon,
        colorClass = 'text-white',
        subValue = null
    }: {
        label: string,
        value: string | number,
        icon: any,
        colorClass?: string,
        subValue?: string | null
    }) => (
        <div className="bg-[#1E2329] border border-[#2B3139] hover:border-[#F0B90B]/30 transition-colors rounded-lg p-3 flex flex-col justify-between min-h-[85px]">
            <span className="text-[#848E9C] text-[11px] font-medium mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                <Icon className="w-3 h-3" /> {label}
            </span>
            <div className="flex flex-col">
                <span className={`font-bold text-lg leading-tight ${colorClass}`}>
                    {value}
                </span>
                {subValue && <span className="text-[#848E9C] text-[10px]">{subValue}</span>}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 w-full">
            <IndicatorCard
                label="PNL TOTAL"
                value={metrics ? `${(metrics.total_pnl ?? 0) > 0 ? '+' : ''}$${(metrics.total_pnl ?? 0).toFixed(2)}` : '$0.00'}
                icon={Activity}
                colorClass={metrics && (metrics.total_pnl ?? 0) < 0 ? 'text-[#F6465D]' : 'text-[#02C076]'}
                subValue={metrics ? `${(metrics.roi_pct ?? 0).toFixed(2)}% ROI` : '0.00% ROI'}
            />
            <IndicatorCard
                label="WIN RATE"
                value={metrics ? `${(metrics.win_rate_pct ?? 0).toFixed(2)}%` : '0.00%'}
                icon={TrendingUp}
                colorClass="text-[#F0B90B]"
                subValue={metrics ? `${metrics.profitable_trades ?? 0}W / ${metrics.losing_trades ?? 0}L` : '0W / 0L'}
            />
            <IndicatorCard
                label="PROFIT FACTOR"
                value={metrics?.profit_factor?.toFixed(2) || '0.00'}
                icon={TrendingUp}
                colorClass={metrics && (metrics.profit_factor || 0) > 1.5 ? 'text-[#02C076]' : 'text-white'}
            />
            <IndicatorCard
                label="DRAWDOWN MÁX"
                value={metrics ? `${(metrics.max_drawdown_pct ?? 0).toFixed(2)}%` : '0.00%'}
                icon={TrendingDown}
                colorClass="text-[#F6465D]"
            />
            <IndicatorCard
                label="SHARPE RATIO"
                value={metrics?.sharpe_ratio?.toFixed(2) || '0.00'}
                icon={Activity}
            />
            <IndicatorCard
                label="TRADES"
                value={metrics?.total_trades ?? 0}
                icon={BookOpen}
                subValue={Array.isArray(simulationResult?.trades) && simulationResult.trades.length > 0
                    ? `${simulationResult.trades.filter(t => t.side === 'buy').length} Compra / ${simulationResult.trades.filter(t => t.side === 'sell').length} Venta`
                    : null}
            />
        </div>
    );
};

export default PerformanceIndicators;
