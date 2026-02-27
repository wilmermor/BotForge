import TradingViewWidget from './TradingViewWidget';
import { useSimulador } from '../hooks/useSimulador';
import SimuladorHeader from './simulador/SimuladorHeader';
import SimuladorControls from './simulador/SimuladorControls';
import PerformanceIndicators from './simulador/PerformanceIndicators';
import BotConfigurationPanel from './simulador/BotConfigurationPanel';
import SimulationHistory from './simulador/SimulationHistory';
import { SimulationLoadingModal } from './modals/SimulationLoadingModal';

const SimuladorComponent = () => {
    const simulador = useSimulador();

    return (
        <div className="w-full h-full flex flex-col space-y-6">
            <SimulationLoadingModal
                isOpen={simulador.simulationStatus !== 'idle'}
                onClose={() => simulador.setSimulationStatus('idle')}
                status={simulador.simulationStatus}
                message={simulador.simulationError || undefined}
            />

            <SimuladorHeader strategyType={simulador.strategyType} />

            <SimuladorControls
                isStrategyModalOpen={simulador.isStrategyModalOpen}
                setIsStrategyModalOpen={simulador.setIsStrategyModalOpen}
                handleSelectStrategy={simulador.handleSelectStrategy}
                startDate={simulador.startDate}
                setStartDate={simulador.setStartDate}
                endDate={simulador.endDate}
                setEndDate={simulador.setEndDate}
                strategyType={simulador.strategyType}
                setStrategyType={simulador.setStrategyType}
            />

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                {/* LEFT COLUMN: Candlestick Chart and Indicators (70%) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    {/* Chart Container */}
                    <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-4 flex flex-col relative h-[400px] overflow-hidden group">
                        <TradingViewWidget />
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-[#1E2329]/80 text-[#848E9C] text-xs px-3 py-1 rounded"></span>
                        </div>
                    </div>

                    <PerformanceIndicators simulationResult={simulador.simulationResult} />
                </div>

                <BotConfigurationPanel {...simulador} />
            </div>

            <SimulationHistory
                positionsTab={simulador.positionsTab}
                setPositionsTab={simulador.setPositionsTab}
                simulationResult={simulador.simulationResult}
            />

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #2B3139;
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #3A4149;
                }
            `}</style>
        </div>
    );
};

export default SimuladorComponent;
