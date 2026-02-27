import React from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import type { SimulationResult } from '../../hooks/types';

interface PerformanceIndicatorsProps {
    simulationResult: SimulationResult | null;
}

const PerformanceIndicators: React.FC<PerformanceIndicatorsProps> = ({ simulationResult }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex flex-col justify-center">
                <span className="text-[#848E9C] text-xs font-medium mb-1 flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Trades totales
                </span>
                <span className="text-white font-bold text-sm">
                    {simulationResult ? simulationResult.metrics.total_trades : '0'}
                </span>
            </div>
            <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex flex-col justify-center">
                <span className="text-[#848E9C] text-xs font-medium mb-1">Win Rate</span>
                <span className="text-white font-bold text-sm">
                    {simulationResult ? `${simulationResult.metrics.win_rate_pct.toFixed(2)}%` : '0.00%'}
                </span>
            </div>
            <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex flex-col justify-center">
                <span className="text-[#848E9C] text-xs font-medium mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[#02C076]" /> Profit estimado
                </span>
                <span className={`font-bold text-sm ${simulationResult && simulationResult.metrics.total_pnl < 0 ? 'text-[#F6465D]' : 'text-[#02C076]'}`}>
                    {simulationResult ? `${simulationResult.metrics.total_pnl > 0 ? '+' : ''}$${simulationResult.metrics.total_pnl.toFixed(2)}` : '+$0.00'}
                </span>
            </div>
            <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex flex-col justify-center">
                <span className="text-[#848E9C] text-xs font-medium mb-1 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3 text-[#F6465D]" /> Drawdown Max
                </span>
                <span className="text-[#F6465D] font-bold text-sm">
                    {simulationResult ? `${simulationResult.metrics.max_drawdown_pct.toFixed(2)}%` : '0.00%'}
                </span>
            </div>
        </div>
    );
};

export default PerformanceIndicators;
