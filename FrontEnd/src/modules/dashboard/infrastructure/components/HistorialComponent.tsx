import { useState } from 'react';
import {
    Search,
    Download,
    RotateCcw,
    Eye,
    Trash2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
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
    resultValue: number; // For styling logic
    returnPct: string;
    winRate: string;
    totalTrades: number;
}

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

const HistorialComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBotType, setSelectedBotType] = useState('Todos');
    const [selectedStatus, setSelectedStatus] = useState('Todos');
    const [selectedResult, setSelectedResult] = useState('P&L');
    const [activeTab, setActiveTab] = useState<StrategyCategory>('Todas las Estrategias');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState<StrategyRecord | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const tabs: StrategyCategory[] = [
        'Todas las Estrategias',
        'Bots de Grid',
        'Bots de DCA',
        'Estrategias Personalizadas',
        'Backtests Rápidos'
    ];

    const handleOpenModal = (strategy: StrategyRecord) => {
        setSelectedStrategy(strategy);
        setIsModalOpen(true);
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedBotType('Todos');
        setSelectedStatus('Todos');
        setSelectedResult('Todos');
    };

    const filteredStrategies = DUMMY_STRATEGIES.filter(s => {
        const matchesSearch = s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.pair.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesTab = true;
        if (activeTab === 'Bots de Grid') matchesTab = s.type === 'Grid';
        else if (activeTab === 'Bots de DCA') matchesTab = s.type === 'DCA';
        else if (activeTab === 'Estrategias Personalizadas') matchesTab = s.type === 'Personalizado';
        else if (activeTab === 'Backtests Rápidos') matchesTab = s.type === 'Backtest';

        let matchesType = selectedBotType === 'Todos' || s.type === selectedBotType;
        let matchesStatus = selectedStatus === 'Todos' || s.status === selectedStatus;

        let matchesResult = true;
        if (selectedResult === 'Ganancia') matchesResult = s.resultValue > 0;
        else if (selectedResult === 'Pérdida') matchesResult = s.resultValue < 0;
        else if (selectedResult === 'Breakeven') matchesResult = s.resultValue === 0;

        return matchesSearch && matchesTab && matchesType && matchesStatus && matchesResult;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredStrategies.length / itemsPerPage);
    const paginatedStrategies = filteredStrategies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full pb-12 animate-fade-in font-sans">
            <div className="max-w-5xl mx-auto flex flex-col gap-6 px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-[28px] font-bold text-white leading-tight mb-1">Historial de Estrategias</h2>
                        <p className="text-[#848E9C] text-sm">Registro completo de backtests y ejecuciones en vivo</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-[#2B3139] text-[#848E9C] text-sm font-medium px-3 py-1.5 rounded-lg border border-[#3E454D]">
                            156 ejecutadas
                        </span>
                        <button className="flex items-center gap-2 bg-[#F0B90B] hover:brightness-110 text-black px-4 py-1.5 rounded-lg text-sm font-bold transition-all shadow-lg">
                            <Download className="h-4 w-4" />
                            Exportar
                        </button>
                    </div>
                </div>

                {/* Quick Filters (Tabs) */}
                <div className="flex items-center gap-6 border-b border-[#2B3139] overflow-x-auto whitespace-nowrap scrollbar-hide pb-px">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-[#F0B90B]' : 'text-[#848E9C] hover:text-white'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F0B90B]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Simplified Filters Bar - More Transparent */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#848E9C]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar par o estrategia..."
                            className="w-full bg-[#1E2329]/50 border border-[#2B3139] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#F0B90B] transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={selectedResult}
                            onChange={(e) => setSelectedResult(e.target.value)}
                            className="bg-[#1E2329]/50 border border-[#2B3139] text-white text-sm rounded-xl px-4 py-2.5 outline-none hover:border-[#F0B90B] transition-colors cursor-pointer"
                        >
                            <option value="P&L">Todos los P&L</option>
                            <option value="Ganancia">Profit</option>
                            <option value="Pérdida">Loss</option>
                        </select>

                        <button
                            onClick={handleResetFilters}
                            className="p-2.5 bg-[#1E2329]/50 border border-[#2B3139] text-[#848E9C] hover:text-[#F0B90B] rounded-xl transition-colors"
                            title="Resetear filtros"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Simplified Table Container - Transparent Body */}
                <div className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[#848E9C] text-[11px] font-bold uppercase tracking-widest">
                                    <th className="px-5 py-2 w-16">ID</th>
                                    <th className="px-5 py-2">Estrategia</th>
                                    <th className="px-5 py-2 text-center">Tipo</th>
                                    <th className="px-5 py-2 text-right">Resultado</th>
                                    <th className="px-5 py-2 text-right">ROI</th>
                                    <th className="px-5 py-2 text-center w-24 whitespace-nowrap">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedStrategies.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-[#2B3139] rounded-full flex items-center justify-center mb-4">
                                                    <Search className="h-8 w-8 text-[#848E9C] opacity-40" />
                                                </div>
                                                <h3 className="text-white text-lg font-bold mb-1">No hay resultados</h3>
                                                <p className="text-[#848E9C] text-sm">Prueba con otros filtros o realiza un backtest.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedStrategies.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={`group cursor-pointer transition-all bg-[#1E2329]/40 hover:bg-[#2B3139] border-l-4 border-l-transparent ${item.resultValue > 0 ? 'hover:border-l-[#02C076]' :
                                                item.resultValue < 0 ? 'hover:border-l-[#F6465D]' : 'hover:border-l-[#848E9C]'
                                                }`}
                                            onClick={() => handleOpenModal(item)}
                                        >
                                            <td className="px-5 py-4 first:rounded-l-xl border-y border-l border-[#2B3139] group-hover:border-[#3E454D] transition-colors font-mono text-[10px] text-[#848E9C]">
                                                {item.id.split('-').pop()}
                                            </td>
                                            <td className="px-5 py-4 border-y border-[#2B3139] group-hover:border-[#3E454D] transition-colors">
                                                <div className="text-white font-bold text-base leading-tight group-hover:text-[#F0B90B] transition-colors">{item.name}</div>
                                                <div className="text-[#848E9C] text-xs mt-0.5">{item.pair}</div>
                                            </td>
                                            <td className="px-5 py-4 border-y border-[#2B3139] group-hover:border-[#3E454D] transition-colors text-center">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.type === 'Grid' ? 'bg-[#02C07620] text-[#02C076]' :
                                                    item.type === 'DCA' ? 'bg-[#3B82F620] text-[#3B82F6]' :
                                                        'bg-[#F0B90B20] text-[#F0B90B]'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 border-y border-[#2B3139] group-hover:border-[#3E454D] transition-colors text-right">
                                                <span className={`font-bold text-base ${item.resultValue > 0 ? 'text-[#02C076]' :
                                                    item.resultValue < 0 ? 'text-[#F6465D]' : 'text-[#848E9C]'
                                                    }`}>
                                                    {item.result}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 border-y border-[#2B3139] group-hover:border-[#3E454D] transition-colors text-right">
                                                <span className={`font-medium text-base ${item.resultValue > 0 ? 'text-[#02C076]' :
                                                    item.resultValue < 0 ? 'text-[#F6465D]' : 'text-[#848E9C]'
                                                    }`}>
                                                    {item.returnPct}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 last:rounded-r-xl border-y border-r border-[#2B3139] group-hover:border-[#3E454D] transition-colors" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="h-9 w-9 bg-[#2B3139] hover:bg-[#F0B90B] rounded-lg text-[#848E9C] hover:text-black flex items-center justify-center transition-all shadow-sm"
                                                        title="Ver detalles"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="h-9 w-9 bg-[#2B3139] hover:bg-[#F6465D] rounded-lg text-[#848E9C] hover:text-white flex items-center justify-center transition-all shadow-sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Integrated Functional Pagination - Styled like Notifications footer */}
                    <div className="mt-8 flex flex-col items-center">
                        <span className="text-[#848E9C] text-sm mb-4">
                            Mostrando {paginatedStrategies.length} de {filteredStrategies.length} estrategias
                        </span>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2.5 rounded-xl bg-[#1E2329] border border-[#2B3139] text-[#848E9C] hover:text-[#F0B90B] hover:border-[#F0B90B] disabled:opacity-20 transition-all"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1
                                        ? 'bg-[#F0B90B] text-black shadow-lg shadow-[#F0B90B]/10'
                                        : 'bg-[#1E2329] border border-[#2B3139] text-[#848E9C] hover:text-white'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="p-2.5 rounded-xl bg-[#1E2329] border border-[#2B3139] text-[#848E9C] hover:text-[#F0B90B] hover:border-[#F0B90B] disabled:opacity-20 transition-all"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Detail */}
            {selectedStrategy && (
                <StrategyDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    strategy={selectedStrategy as StrategyRecord}
                />
            )}
        </div>
    );
};

export default HistorialComponent;
