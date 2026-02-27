import React from 'react';
import { Calendar, FolderOpen, Settings, Activity } from 'lucide-react';
import type { StrategyType } from '../../hooks/types';
import { StrategySelectionModal } from '../modals/StrategySelectionModal';

interface SimuladorControlsProps {
    isStrategyModalOpen: boolean;
    setIsStrategyModalOpen: (open: boolean) => void;
    handleSelectStrategy: (strategy: any) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    strategyType: StrategyType;
    setStrategyType: (type: StrategyType) => void;
}

const SimuladorControls: React.FC<SimuladorControlsProps> = ({
    isStrategyModalOpen,
    setIsStrategyModalOpen,
    handleSelectStrategy,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    strategyType,
    setStrategyType
}) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full rounded-xl mb-2">
            <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Strategy Library Button */}
                <div className="relative">
                    <button
                        onClick={() => setIsStrategyModalOpen(!isStrategyModalOpen)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all border ${isStrategyModalOpen
                            ? 'bg-[#F0B90B] text-black border-[#F0B90B]'
                            : 'bg-[#2B3139] text-white border-[#3A4149] hover:border-[#F0B90B]'
                            }`}
                    >
                        <FolderOpen className="w-4 h-4" />
                        Mis Estrategias
                    </button>

                    <StrategySelectionModal
                        isOpen={isStrategyModalOpen}
                        onClose={() => setIsStrategyModalOpen(false)}
                        onSelect={handleSelectStrategy}
                    />
                </div>

                <div className="w-[1px] h-8 bg-[#2B3139] hidden md:block" />

                {/* Pair Selector */}
                <button className="bg-[#2B3139] border border-[#3A4149] hover:border-[#4A5159] px-4 py-2 rounded-lg flex items-center gap-2 text-white font-medium transition-colors">
                    BTC/USDT
                </button>

                {/* Date Range Selector */}
                <div className="flex items-center gap-2 bg-[#2B3139] border border-[#3A4149] hover:border-[#4A5159] px-3 py-1.5 rounded-lg transition-colors">
                    <Calendar className="w-4 h-4 text-[#848E9C]" />
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-transparent text-sm text-white focus:outline-none w-[110px] [&::-webkit-calendar-picker-indicator]:filter-invert"
                        />
                        <span className="text-[#848E9C]">-</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-transparent text-sm text-white focus:outline-none w-[110px] [&::-webkit-calendar-picker-indicator]:filter-invert"
                        />
                    </div>
                </div>
            </div>

            <div className="relative flex bg-[#2B3139] p-1 rounded-xl border border-[#3A4149] w-64 h-[44px]">
                {/* Animated Background Selector */}
                <div
                    className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#F0B90B] rounded-lg transition-transform duration-300 ease-in-out ${strategyType === 'DCA' ? 'translate-x-full' : 'translate-x-0'}`}
                />

                <button
                    onClick={() => setStrategyType('GRID')}
                    className={`relative z-10 flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${strategyType === 'GRID' ? 'text-[#1E2329]' : 'text-[#848E9C] hover:text-white'}`}
                >
                    <Settings className="w-4 h-4" /> GRID
                </button>
                <button
                    onClick={() => setStrategyType('DCA')}
                    className={`relative z-10 flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${strategyType === 'DCA' ? 'text-[#1E2329]' : 'text-[#848E9C] hover:text-white'}`}
                >
                    <Activity className="w-4 h-4" /> DCA
                </button>
            </div>
        </div>
    );
};

export default SimuladorControls;
