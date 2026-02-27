import { useState } from 'react';
import HistorialHeader from './historial/HistorialHeader';
import TransactionFilters from './historial/TransactionFilters';
import TransactionTable from './historial/TransactionTable';
import Pagination from './historial/Pagination';
import { useHistorial } from '../hooks/useHistorial';
import { StrategyDetailModal } from './modals/StrategyDetailModal';

export type BotType = 'Todas' | 'Grid' | 'DCA' | 'Martingale' | 'Personalizado' | 'Backtest';
export type BotStatus = 'Completado' | 'En curso' | 'Pausado' | 'Cancelado';
export type StrategyCategory = 'Todas las Estrategias' | 'Bots de Grid' | 'Bots de DCA' | 'Estrategias Personalizadas' | 'Backtests Rápidos';

export interface StrategyRecord {
    id: string;
    name: string;
    pair: string;
    type: BotType;
    status: BotStatus;
    executionDate: string;
    duration: string;
    investment: string;
    result: string;
    resultValue: number;
    returnPct: string;
    winRate: string;
    totalTrades: number;
}

const HistorialComponent = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedResult,
        setSelectedResult,
        activeTab,
        setActiveTab,
        currentPage,
        setCurrentPage,
        totalPages,
        filteredStrategies,
        paginatedStrategies,
        handleResetFilters
    } = useHistorial();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState<StrategyRecord | null>(null);

    const handleOpenModal = (strategy: StrategyRecord) => {
        setSelectedStrategy(strategy);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full pb-12 animate-fade-in font-sans">
            <div className="max-w-5xl mx-auto flex flex-col gap-6 px-4">
                <HistorialHeader />

                <TransactionFilters
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedResult={selectedResult}
                    setSelectedResult={setSelectedResult}
                    handleResetFilters={handleResetFilters}
                />

                <TransactionTable
                    strategies={paginatedStrategies}
                    onOpenModal={handleOpenModal}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsShown={paginatedStrategies.length}
                    totalItems={filteredStrategies.length}
                    onPageChange={setCurrentPage}
                />
            </div>

            {selectedStrategy && (
                <StrategyDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    strategy={selectedStrategy}
                />
            )}
        </div>
    );
};

export default HistorialComponent;
