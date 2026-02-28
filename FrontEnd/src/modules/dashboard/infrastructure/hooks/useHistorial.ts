import { useState, useMemo, useEffect } from 'react';
import type { StrategyRecord, BotType, BotStatus, StrategyCategory } from '../components/HistorialComponent';

// Removed DUMMY_STRATEGIES

export const useHistorial = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBotType, setSelectedBotType] = useState<BotType | 'Todas'>('Todas');
    const [selectedStatus, setSelectedStatus] = useState<BotStatus | 'Todos'>('Todos');
    const [selectedResult, setSelectedResult] = useState('P&L');
    const [activeTab, setActiveTab] = useState<StrategyCategory>('Todas las Estrategias');
    const [currentPage, setCurrentPage] = useState(1);
    const [strategies, setStrategies] = useState<StrategyRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchSimulations = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch("http://localhost:8000/api/v1/simulations/", {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    const mapped: StrategyRecord[] = data.map((log: any) => {
                        const paramsObj = log.strategy?.params || {};
                        const typeRaw = log.strategy?.type;
                        const tType = typeRaw === 'grid' ? 'Grid' : typeRaw === 'dca' ? 'DCA' : 'Backtest';

                        const investmentAmt = paramsObj.investment_amount || paramsObj.investment;

                        const pnl = log.metrics.total_pnl;
                        const resultFormatted = pnl > 0 ? `+$${pnl.toFixed(2)}` : pnl < 0 ? `-$${Math.abs(pnl).toFixed(2)}` : `$0.00`;
                        const roi = log.metrics.roi_pct;
                        const roiFormatted = roi > 0 ? `+${roi.toFixed(2)}%` : `${roi.toFixed(2)}%`;

                        return {
                            id: log.id,
                            name: log.strategy?.name || 'Simulación Bot',
                            pair: log.pair || 'N/A',
                            type: tType as BotType,
                            status: 'Completado',
                            executionDate: new Date(log.created_at).toLocaleString(),
                            duration: log.execution_time_ms ? `${(log.execution_time_ms / 1000).toFixed(1)}s` : '--',
                            investment: investmentAmt ? `$${Number(investmentAmt).toFixed(2)}` : '--',
                            result: resultFormatted,
                            resultValue: pnl,
                            returnPct: roiFormatted,
                            winRate: log.metrics.win_rate_pct ? `${log.metrics.win_rate_pct.toFixed(2)}%` : '0%',
                            totalTrades: log.metrics.total_trades || 0,
                            maxDrawdown: log.metrics.max_drawdown_pct ? `${log.metrics.max_drawdown_pct.toFixed(2)}%` : '0%',
                            timeframe: log.timeframe,
                            strategyParams: paramsObj
                        };
                    });
                    setStrategies(mapped);
                }
            } catch (error) {
                console.error("Error fetching simulations:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSimulations();
    }, []);

    const filteredStrategies = useMemo(() => {
        return strategies.filter(s => {
            const matchesSearch = s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.pair.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesTab = true;
            if (activeTab === 'Bots de Grid') matchesTab = s.type === 'Grid';
            else if (activeTab === 'Bots de DCA') matchesTab = s.type === 'DCA';
            else if (activeTab === 'Estrategias Personalizadas') matchesTab = s.type === 'Personalizado';
            else if (activeTab === 'Backtests Rápidos') matchesTab = s.type === 'Backtest';

            let matchesType = selectedBotType === 'Todas' || s.type === selectedBotType;
            let matchesStatus = selectedStatus === 'Todos' || s.status === selectedStatus;

            let matchesResult = true;
            if (selectedResult === 'Ganancia') matchesResult = s.resultValue > 0;
            else if (selectedResult === 'Pérdida') matchesResult = s.resultValue < 0;
            else if (selectedResult === 'Breakeven') matchesResult = s.resultValue === 0;

            return matchesSearch && matchesTab && matchesType && matchesStatus && matchesResult;
        });
    }, [strategies, searchQuery, selectedBotType, selectedStatus, selectedResult, activeTab]);

    const totalPages = Math.ceil(filteredStrategies.length / itemsPerPage);
    const paginatedStrategies = useMemo(() => {
        return filteredStrategies.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filteredStrategies, currentPage, itemsPerPage]);

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedBotType('Todas');
        setSelectedStatus('Todos');
        setSelectedResult('P&L');
    };

    const deleteSimulation = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/v1/simulations/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                setStrategies(prev => prev.filter(s => s.id !== id));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error deleting simulation:", error);
            return false;
        }
    };

    return {
        searchQuery,
        setSearchQuery,
        selectedBotType,
        setSelectedBotType,
        selectedStatus,
        setSelectedStatus,
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
    };
};
