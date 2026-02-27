import { useState, useMemo } from 'react';
import type { StrategyRecord, BotType, BotStatus, StrategyCategory } from '../components/HistorialComponent';

const DUMMY_STRATEGIES: StrategyRecord[] = [
    {
        id: 'BOT-2026-0215-001',
        name: 'Grid Pro BTC/USDT',
        pair: 'BTC/USDT',
        type: 'Grid',
        status: 'Completado',
        executionDate: '2026-02-15 14:30',
        duration: '3d 4h',
        investment: '$1,000.00',
        result: '+$234.50',
        resultValue: 234.50,
        returnPct: '+23.45%',
        winRate: '68%',
        totalTrades: 156
    },
    {
        id: 'BOT-2026-0214-089',
        name: 'DCA ETH/USDT',
        pair: 'ETH/USDT',
        type: 'DCA',
        status: 'Completado',
        executionDate: '2026-02-14 09:15',
        duration: '1d 2h',
        investment: '$500.00',
        result: '-$45.30',
        resultValue: -45.30,
        returnPct: '-9.06%',
        winRate: '42%',
        totalTrades: 24
    },
    {
        id: 'BOT-2026-0216-012',
        name: 'Martingale SOL/USDT',
        pair: 'SOL/USDT',
        type: 'Martingale',
        status: 'En curso',
        executionDate: '2026-02-16 08:00',
        duration: 'En curso',
        investment: '$2,000.00',
        result: '+$78.20',
        resultValue: 78.20,
        returnPct: '+3.91%',
        winRate: '58%',
        totalTrades: 42
    },
    {
        id: 'BOT-2026-0213-045',
        name: 'Grid ADA/USDT',
        pair: 'ADA/USDT',
        type: 'Grid',
        status: 'Cancelado',
        executionDate: '2026-02-13 16:20',
        duration: 'Cancelado',
        investment: '$300.00',
        result: '$0.00',
        resultValue: 0,
        returnPct: '0%',
        winRate: '--',
        totalTrades: 8
    },
    {
        id: 'BOT-2026-0210-022',
        name: 'Custom RSI Scalper',
        pair: 'BNB/USDT',
        type: 'Personalizado',
        status: 'Completado',
        executionDate: '2026-02-10 11:45',
        duration: '5d 12h',
        investment: '$5,000.00',
        result: '+$1,120.00',
        resultValue: 1120.00,
        returnPct: '+22.40%',
        winRate: '72%',
        totalTrades: 312
    },
    {
        id: 'BOT-2026-0208-005',
        name: 'Quick Backtest',
        pair: 'DOT/USDT',
        type: 'Backtest',
        status: 'Completado',
        executionDate: '2026-02-08 15:30',
        duration: '2h 15m',
        investment: '$100.00',
        result: '+$5.40',
        resultValue: 5.40,
        returnPct: '+5.40%',
        winRate: '55%',
        totalTrades: 12
    }
];

export const useHistorial = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBotType, setSelectedBotType] = useState<BotType | 'Todas'>('Todas');
    const [selectedStatus, setSelectedStatus] = useState<BotStatus | 'Todos'>('Todos');
    const [selectedResult, setSelectedResult] = useState('P&L');
    const [activeTab, setActiveTab] = useState<StrategyCategory>('Todas las Estrategias');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredStrategies = useMemo(() => {
        return DUMMY_STRATEGIES.filter(s => {
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
    }, [searchQuery, selectedBotType, selectedStatus, selectedResult, activeTab]);

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
        handleResetFilters
    };
};
