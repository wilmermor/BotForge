import { useState } from 'react';
import HistorialHeader from './historial/HistorialHeader';
import TransactionFilters from './historial/TransactionFilters';
import TransactionTable from './historial/TransactionTable';
import Pagination from './historial/Pagination';
import { useHistorial } from '../hooks/useHistorial';
import { StrategyDetailModal } from './modals/StrategyDetailModal';
import { DeleteSimulationModal } from './modals/DeleteSimulationModal';

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
    maxDrawdown?: string;
    timeframe?: string;
    strategyParams?: any;
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
        handleResetFilters,
        isLoading,
        deleteSimulation
    } = useHistorial();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState<StrategyRecord | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [strategyToDelete, setStrategyToDelete] = useState<StrategyRecord | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleOpenModal = (strategy: StrategyRecord) => {
        setSelectedStrategy(strategy);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (strategy: StrategyRecord) => {
        setStrategyToDelete(strategy);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!strategyToDelete) return;
        setIsDeleting(true);
        const success = await deleteSimulation(strategyToDelete.id);
        setIsDeleting(false);
        if (success) {
            setIsDeleteModalOpen(false);
            setStrategyToDelete(null);
        }
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
                    onOpenDeleteModal={handleOpenDeleteModal}
                    isLoading={isLoading}
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

            <DeleteSimulationModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                simulationName={strategyToDelete?.name || ''}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default HistorialComponent;
