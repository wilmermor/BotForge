import React from 'react';
import { Clock, BookOpen, ArrowUp, ArrowDown } from 'lucide-react';
import type { PositionsTabType, SimulationResult } from '../../hooks/types';

interface SimulationHistoryProps {
    positionsTab: PositionsTabType;
    setPositionsTab: (tab: PositionsTabType) => void;
    simulationResult: SimulationResult | null;
}

const SimulationHistory: React.FC<SimulationHistoryProps> = ({
    positionsTab,
    setPositionsTab,
    simulationResult
}) => {
    return (
        <div className="w-full mt-2">
            {/* Top Tabs */}
            <div className="flex items-center justify-between border-b border-[#2B3139] mb-6">
                <div className="flex">
                    {(['HISTORIAL'] as PositionsTabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setPositionsTab(tab)}
                            className={`px-4 py-3 text-sm font-bold transition-colors border-b-2 relative -bottom-[1px] ${positionsTab === tab
                                ? 'text-[#F0B90B] border-[#F0B90B]'
                                : 'text-[#848E9C] border-transparent hover:text-white'
                                }`}
                        >
                            {tab === 'HISTORIAL' ? 'HISTORIAL' : tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="w-full max-h-[500px] overflow-y-auto custom-scrollbar pb-6 pr-2">
                {positionsTab === 'HISTORIAL' && (
                    <div className="flex flex-col gap-2">
                        {simulationResult && simulationResult.metrics && (
                            <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-4 mb-4">
                                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-[#F0B90B]" />
                                    Resultados de Simulación (Métricas Finales)
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                                    <div>
                                        <div className="text-[#848E9C] text-[11px] mb-1">ROI</div>
                                        <div className={`font-bold ${simulationResult.metrics.roi_pct >= 0 ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                            {simulationResult.metrics.roi_pct.toFixed(2)}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-[11px] mb-1">Comp/Vend</div>
                                        <div className="text-white font-bold flex items-center gap-1">
                                            <span className="text-[#02C076]">{simulationResult.trades.filter(t => t.side === 'buy').length}</span>
                                            <span className="text-[#848E9C] text-[10px]">B</span>
                                            <span className="text-[#848E9C] mx-0.5">/</span>
                                            <span className="text-[#F6465D]">{simulationResult.trades.filter(t => t.side === 'sell').length}</span>
                                            <span className="text-[#848E9C] text-[10px]">S</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-[11px] mb-1">Profit Factor</div>
                                        <div className="text-white font-bold">{simulationResult.metrics.profit_factor?.toFixed(2) || '0.00'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-[11px] mb-1">Trades (G/P)</div>
                                        <div className="text-white font-bold">
                                            <span className="text-[#02C076]">{simulationResult.metrics.profitable_trades}</span>
                                            <span className="text-[#848E9C] mx-1">/</span>
                                            <span className="text-[#F6465D]">{simulationResult.metrics.losing_trades}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-[11px] mb-1">Max Drawdown</div>
                                        <div className="text-[#F6465D] font-bold">{simulationResult.metrics.max_drawdown_pct.toFixed(2)}%</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-[11px] mb-1">Sharpe Ratio</div>
                                        <div className="text-[#F0B90B] font-bold">{simulationResult.metrics.sharpe_ratio?.toFixed(2) || '0.00'}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {simulationResult && simulationResult.trades && simulationResult.trades.length > 0 ? (
                            simulationResult.trades.map((trade, idx) => (
                                <div key={idx} className="bg-[#1E2329] border border-[#2B3139] hover:bg-[#2B3139]/50 transition-colors rounded-lg p-3 flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-1 h-10 ${(trade.pnl !== null && trade.pnl >= 0) ? 'bg-[#02C076]' : (trade.pnl !== null ? 'bg-[#F6465D]' : 'bg-[#848E9C]')} rounded-full`} />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-white text-sm">{simulationResult.pair}</span>
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-1 ${trade.side === 'buy' ? 'bg-[#02C076]/10 text-[#02C076]' : 'bg-[#F6465D]/10 text-[#F6465D]'}`}>
                                                    {trade.side === 'buy' ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                                                    {trade.side === 'buy' ? 'Compra' : 'Venta'}
                                                </span>
                                                {trade.pnl !== null && (
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${trade.pnl >= 0 ? 'bg-[#02C076]/20 text-[#02C076]' : 'bg-[#F6465D]/20 text-[#F6465D]'}`}>
                                                        {trade.pnl >= 0 ? 'Profit' : 'Loss'}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[#848E9C] text-[11px] flex items-center gap-2">
                                                <span><Clock className="w-3 h-3 inline mr-1" /> {new Date(trade.timestamp).toLocaleString()}</span>
                                                <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                                                <span>Qty: {trade.quantity}</span>
                                                <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                                                {/*<span className="text-[#F0B90B]">Fee: ${trade.fee.toFixed(4)}</span>*/}
                                                <span className="text-[#F0B90B]">Fee: 0.0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold ${trade.pnl !== null ? (trade.pnl >= 0 ? 'text-[#02C076]' : 'text-[#F6465D]') : 'text-[#848E9C]'}`}>
                                            {trade.pnl !== null ? (trade.pnl > 0 ? `+${trade.pnl.toFixed(2)} USDT` : `${trade.pnl.toFixed(2)} USDT`) : 'Ejecutada'}
                                        </div>
                                        <div className="text-[#848E9C] text-xs">Precio: {trade.price.toFixed(2)}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <DefaultHistoryItems />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const DefaultHistoryItems = () => (
    <>
        {/* History List Item 1 */}
        <div className="bg-[#1E2329] border border-[#2B3139] hover:bg-[#2B3139]/50 transition-colors rounded-lg p-3 flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-1 h-10 bg-[#02C076] rounded-full" />
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">BTCUSDT Perp</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-1 bg-[#02C076]/10 text-[#02C076]">
                            <ArrowUp className="w-2.5 h-2.5" /> Compra
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold bg-[#02C076]/20 text-[#02C076]">
                            Profit
                        </span>
                    </div>
                    <div className="text-[#848E9C] text-[11px] flex items-center gap-2">
                        <span><Clock className="w-3 h-3 inline mr-1" /> Hoy, 14:23</span>
                        <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                        <span>Qty: 0.45</span>
                        <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                        <span className="text-[#F0B90B]">Fee: $1.20</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-[#02C076] font-bold">+184.20 USDT</div>
                <div className="text-[#848E9C] text-xs">Precio: 45,230.50</div>
            </div>
        </div>

        {/* History List Item 2 */}
        <div className="bg-[#1E2329] border border-[#2B3139] hover:bg-[#2B3139]/50 transition-colors rounded-lg p-3 flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-1 h-10 bg-[#F6465D] rounded-full" />
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">SOLUSDT Perp</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-1 bg-[#F6465D]/10 text-[#F6465D]">
                            <ArrowDown className="w-2.5 h-2.5" /> Venta
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold bg-[#F6465D]/20 text-[#F6465D]">
                            Loss
                        </span>
                    </div>
                    <div className="text-[#848E9C] text-[11px] flex items-center gap-2">
                        <span><Clock className="w-3 h-3 inline mr-1" /> Ayer, 09:15</span>
                        <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                        <span>Qty: 12.0</span>
                        <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                        <span className="text-[#F0B90B]">Fee: $0.85</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-[#F6465D] font-bold">-45.80 USDT</div>
                <div className="text-[#848E9C] text-xs">Precio: 98.40</div>
            </div>
        </div>
    </>
);

export default SimulationHistory;
