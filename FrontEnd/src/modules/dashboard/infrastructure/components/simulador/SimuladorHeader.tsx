import React from 'react';
import type { StrategyType } from '../../hooks/types';

interface SimuladorHeaderProps {
    strategyType: StrategyType;
}

const SimuladorHeader: React.FC<SimuladorHeaderProps> = ({ strategyType }) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-[28px] font-bold text-white tracking-tight">
                        Simulador de Bots - {strategyType === 'GRID' ? 'Grid Trading' : 'DCA Strategy'}
                    </h1>
                    <div className="bg-[#2B3139] px-3 py-1.5 rounded-full border border-[#3A4149] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F0B90B] animate-pulse"></span>
                        <span className="text-xs font-semibold text-[#F0B90B]">MODO SIMULACIÓN | Balance virtual: 10,000 USDT</span>
                    </div>
                </div>
                <p className="text-[#848E9C] text-sm mt-1">
                    Configura y prueba tus {strategyType === 'GRID' ? 'estrategias de malla' : 'estrategias de promediado de costo'} automatizadas
                </p>
            </div>
        </header>
    );
};

export default SimuladorHeader;
