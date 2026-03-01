import React from 'react';
import { ChevronDown, ToggleRight, ToggleLeft, Settings } from 'lucide-react';
import type { StrategyType } from '../../hooks/types';
import GridConfigFields from './GridConfigFields';
import DcaConfigFields from './DcaConfigFields';

interface BotConfigurationPanelProps {
    strategyType: StrategyType;
    // Common
    marginMode: 'Cruzado' | 'Aislado';
    setMarginMode: (mode: 'Cruzado' | 'Aislado') => void;
    leverage: string;
    setLeverage: (val: string) => void;
    isTpSlExpanded: boolean;
    setIsTpSlExpanded: (expanded: boolean) => void;
    isLoading: boolean;
    handleStartSimulation: () => void;
    handleSaveStrategy: () => Promise<string | null>;

    // Grid specific
    gridType: 'ARITMETICA' | 'GEOMETRICA';
    setGridType: (type: 'ARITMETICA' | 'GEOMETRICA') => void;
    minPrice: string;
    setMinPrice: (val: string) => void;
    maxPrice: string;
    setMaxPrice: (val: string) => void;
    grids: string;
    setGrids: (val: string) => void;
    investment: string;
    setInvestment: (val: string) => void;
    qtyPerOrder: string;
    setQtyPerOrder: (val: string) => void;
    autoCalculate: boolean;
    setAutoCalculate: (val: boolean) => void;

    // DCA specific
    dcaBuyAmount: string;
    setDcaBuyAmount: (val: string) => void;
    dcaIntervalBars: string;
    setDcaIntervalBars: (val: string) => void;
    dcaTpPct: string;
    setDcaTpPct: (val: string) => void;
    dcaSlPct: string;
    setDcaSlPct: (val: string) => void;
}

const BotConfigurationPanel: React.FC<BotConfigurationPanelProps> = (props) => {
    const {
        strategyType,
        isTpSlExpanded, setIsTpSlExpanded, isLoading, handleStartSimulation, handleSaveStrategy
    } = props;

    return (
        <div className="lg:col-span-3 flex flex-col h-full bg-[#1E2329] rounded-xl border border-[#2B3139]">
            {/* Available Balance Header */}
            <div className="p-4 border-b border-[#2B3139] bg-[#1E2329] rounded-t-xl">
                <div className="text-[#848E9C] text-sm mb-1">Disponible</div>
                <div className="text-[28px] font-bold text-white tracking-tight">10,000.00 USDT</div>
            </div>

            {/* Config Scrollable Area */}
            <div className="flex-1 p-5 flex flex-col space-y-5 overflow-y-auto custom-scrollbar max-h-[600px]">
                {strategyType === 'GRID' ? (
                    <GridConfigFields
                        minPrice={props.minPrice} setMinPrice={props.setMinPrice}
                        maxPrice={props.maxPrice} setMaxPrice={props.setMaxPrice}
                        grids={props.grids} setGrids={props.setGrids}
                        gridType={props.gridType} setGridType={props.setGridType}
                        investment={props.investment} setInvestment={props.setInvestment}
                    />
                ) : (
                    <DcaConfigFields
                        dcaBuyAmount={props.dcaBuyAmount} setDcaBuyAmount={props.setDcaBuyAmount}
                        dcaIntervalBars={props.dcaIntervalBars} setDcaIntervalBars={props.setDcaIntervalBars}
                        dcaTpPct={props.dcaTpPct} setDcaTpPct={props.setDcaTpPct}
                        dcaSlPct={props.dcaSlPct} setDcaSlPct={props.setDcaSlPct}
                    />
                )}

                {/*{strategyType === 'GRID' && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-white font-medium">Cant/orden <span className="text-[#848E9C] font-normal">(opcional)</span></label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={props.autoCalculate}
                                    onChange={(e) => props.setAutoCalculate(e.target.checked)}
                                    className="hidden"
                                />
                                {props.autoCalculate ? (
                                    <ToggleRight className="w-4 h-4 text-[#02C076]" />
                                ) : (
                                    <ToggleLeft className="w-4 h-4 text-[#848E9C]" />
                                )}
                                <span className="text-[#848E9C] text-[10px]">Auto-calcular</span>
                            </label>
                        </div>
                        <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                            <input
                                type="number"
                                value={props.qtyPerOrder}
                                onChange={(e) => props.setQtyPerOrder(e.target.value)}
                                placeholder="0.000"
                                disabled={props.autoCalculate}
                                className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C] disabled:opacity-50"
                            />
                            <span className="text-[#848E9C] text-sm font-medium">BTC</span>
                        </div>
                    </div>
                )}*/}


                {/* TP/SL Expander — solo aplica para GRID */}
                {/*{strategyType === 'GRID' && (
                    <div>
                        <button
                            onClick={() => setIsTpSlExpanded(!isTpSlExpanded)}
                            className="flex items-center justify-between w-full text-white text-sm font-medium hover:text-[#F0B90B] transition-colors"
                        >
                            Take Profit / Stop Loss <ChevronDown className={`w-4 h-4 transform transition-transform ${isTpSlExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {isTpSlExpanded && (
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#02C076]">
                                    <span className="text-[#848E9C] text-xs w-6">TP</span>
                                    <input type="number" placeholder="%" className="w-full bg-transparent py-1.5 text-white text-sm focus:outline-none" />
                                </div>
                                <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F6465D]">
                                    <span className="text-[#848E9C] text-xs w-6">SL</span>
                                    <input type="number" placeholder="%" className="w-full bg-transparent py-1.5 text-white text-sm focus:outline-none" />
                                </div>
                            </div>
                        )}
                    </div>
                )}*/}
            </div>

            {/* Action Buttons */}
            <div className="p-5 border-t border-[#2B3139] bg-[#1E2329] rounded-b-xl flex flex-col gap-3">
                <button
                    onClick={handleStartSimulation}
                    disabled={isLoading}
                    className={`w-full py-3.5 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${isLoading ? 'bg-[#2B3139] cursor-not-allowed' : 'bg-[#02C076] hover:brightness-110 active:scale-[0.98]'}`}>
                    {isLoading ? 'SIMULANDO...' : 'INICIAR SIMULACIÓN'}
                </button>
                <button
                    onClick={() => handleSaveStrategy()}
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-lg font-medium text-white bg-[#2B3139] hover:bg-[#3A4149] disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm">
                    <Settings className="w-4 h-4" /> Guardar configuración
                </button>
            </div>
        </div>
    );
};

export default BotConfigurationPanel;
