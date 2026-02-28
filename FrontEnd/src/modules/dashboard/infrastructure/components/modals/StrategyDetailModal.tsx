import React from 'react';
import { X, Copy, Download, Zap, TrendingUp, BarChart3, Clock, Wallet } from 'lucide-react';
import type { StrategyRecord } from '../HistorialComponent';

interface StrategyDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    strategy: StrategyRecord;
}

export const StrategyDetailModal: React.FC<StrategyDetailModalProps> = ({ isOpen, onClose, strategy }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="bg-[#1E2329] border border-[#2B3139] rounded-2xl w-full max-w-[600px] overflow-hidden shadow-2xl relative animate-scale-in">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#848E9C] hover:text-[#F0B90B] transition-colors p-1"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Header Section */}
                <div className="p-6 border-b border-[#2B3139]">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-white">Detalle de Estrategia</h2>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${strategy.type === 'Grid' ? 'bg-[#02C07620] text-[#02C076]' :
                            strategy.type === 'DCA' ? 'bg-[#3B82F620] text-[#3B82F6]' :
                                'bg-[#F0B90B20] text-[#F0B90B]'
                            }`}>
                            {strategy.type}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{strategy.name}</span>
                        <span className="text-[#848E9C] font-mono text-xs">{strategy.id}</span>
                    </div>
                </div>

                {/* Main Content (Scrollable) */}
                <div className="p-5 max-h-[65vh] overflow-y-auto custom-scrollbar">

                    {/* Bot Parameters Grid */}
                    <div className="mb-8">
                        <h3 className="text-[#848E9C] text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Zap className="h-3.5 w-3.5 text-[#F0B90B]" />
                            Configuración del Bot
                        </h3>
                        <div className="bg-[#2B3139] rounded-xl p-5 border border-[#3A4149] grid grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Tipo de bot</div>
                                <div className="text-white text-sm font-medium">{strategy.type}</div>
                            </div>
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Inversión total</div>
                                <div className="text-white text-sm font-medium">{strategy.investment}</div>
                            </div>
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Par de trading</div>
                                <div className="text-white text-sm font-medium">{strategy.pair}</div>
                            </div>
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Timeframe</div>
                                <div className="text-white text-sm font-medium">{strategy.timeframe || 'N/A'}</div>
                            </div>
                            {strategy.type === 'Grid' && strategy.strategyParams && (
                                <>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-1">Rango de precio</div>
                                        <div className="text-white text-sm font-medium">
                                            ${strategy.strategyParams.lower_price || '0'} - ${strategy.strategyParams.upper_price || '0'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-1">Grids</div>
                                        <div className="text-white text-sm font-medium">
                                            {strategy.strategyParams.grid_count || '0'} ({strategy.strategyParams.grid_type || 'Aritmética'})
                                        </div>
                                    </div>
                                </>
                            )}
                            {strategy.type === 'DCA' && strategy.strategyParams && (
                                <>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-1">Base Order</div>
                                        <div className="text-white text-sm font-medium">
                                            ${strategy.strategyParams.buy_amount || '0'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-1">intervals</div>
                                        <div className="text-white text-sm font-medium">
                                            {strategy.strategyParams.interval_bars || '0'}
                                        </div>
                                    </div>
                                </>
                            )}
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Modo margen</div>
                                <div className="text-white text-sm font-medium">
                                    {strategy.strategyParams?.margin_mode || 'Cruzado (Cross)'}
                                </div>
                            </div>
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Apalancamiento</div>
                                <div className="text-white text-sm font-medium">
                                    {strategy.strategyParams?.leverage || '1'}X
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div>
                        <h3 className="text-[#848E9C] text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <BarChart3 className="h-3.5 w-3.5 text-[#02C076]" />
                            Rendimiento Global
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="bg-[#2B3139]/30 border border-[#2B3139] rounded-xl p-4">
                                <div className="text-[#848E9C] text-xs mb-1 flex items-center gap-1.5">
                                    <Wallet className="h-3 w-3" /> Profit Total
                                </div>
                                <div className={`text-lg font-bold ${strategy.resultValue >= 0 ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                    {strategy.result}
                                </div>
                            </div>
                            <div className="bg-[#2B3139]/30 border border-[#2B3139] rounded-xl p-4">
                                <div className="text-[#848E9C] text-xs mb-1 flex items-center gap-1.5">
                                    <TrendingUp className="h-3 w-3" /> ROI
                                </div>
                                <div className={`text-lg font-bold ${strategy.resultValue >= 0 ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                    {strategy.returnPct}
                                </div>
                            </div>
                            <div className="bg-[#2B3139]/30 border border-[#2B3139] rounded-xl p-4">
                                <div className="text-[#848E9C] text-xs mb-1 flex items-center gap-1.5">
                                    <Clock className="h-3 w-3" /> Duración
                                </div>
                                <div className="text-lg font-bold text-white">
                                    {strategy.duration}
                                </div>
                            </div>
                            <div className="bg-[#2B3139]/30 border border-[#2B3139] rounded-xl p-4">
                                <div className="text-[#848E9C] text-xs mb-1">Win Rate</div>
                                <div className="text-lg font-bold text-white">{strategy.winRate}</div>
                            </div>
                            <div className="bg-[#2B3139]/30 border border-[#2B3139] rounded-xl p-4">
                                <div className="text-[#848E9C] text-xs mb-1">Total Trades</div>
                                <div className="text-lg font-bold text-white">{strategy.totalTrades}</div>
                            </div>
                            <div className="bg-[#2B3139]/30 border border-[#2B3139] rounded-xl p-4">
                                <div className="text-[#848E9C] text-xs mb-1 text-[#F6465D]">Max Drawdown</div>
                                <div className="text-lg font-bold text-[#F6465D]">
                                    {strategy.maxDrawdown || '0.00%'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions Inside Content */}
                    {/*<div className="mt-8 flex items-center gap-3">
                        <button className="flex-1 bg-[#F0B90B] hover:brightness-110 text-black py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                            <Copy className="h-4 w-4" />
                            Replicar Estrategia
                        </button>
                        <button className="bg-[#2B3139] hover:bg-[#3A4149] text-white p-3 rounded-xl transition-all" title="Exportar">
                            <Download className="h-5 w-5" />
                        </button>
                    </div>*/}
                </div>

                {/* Final Footer */}
                <div className="bg-[#2B3139]/20 p-4 border-t border-[#2B3139] flex items-center justify-center">
                    <button
                        onClick={onClose}
                        className="text-[#848E9C] hover:text-white text-sm transition-colors"
                    >
                        Cerrar Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};
