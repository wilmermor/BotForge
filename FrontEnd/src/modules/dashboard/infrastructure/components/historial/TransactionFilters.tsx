import { Search, RotateCcw } from 'lucide-react';
import type { StrategyCategory } from '../HistorialComponent';

interface TransactionFiltersProps {
    activeTab: StrategyCategory;
    setActiveTab: (tab: StrategyCategory) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedResult: string;
    setSelectedResult: (result: string) => void;
    handleResetFilters: () => void;
}

const TransactionFilters = ({
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedResult,
    setSelectedResult,
    handleResetFilters
}: TransactionFiltersProps) => {
    const tabs: StrategyCategory[] = [
        'Todas las Estrategias',
        'Bots de Grid',
        'Bots de DCA',
        'Estrategias Personalizadas',
        'Backtests Rápidos'
    ];

    return (
        <div className="space-y-6">
            {/* Quick Filters (Tabs) */}
            <div className="flex items-center gap-6 border-b border-[#2B3139] overflow-x-auto whitespace-nowrap scrollbar-hide pb-px">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-[#F0B90B]' : 'text-[#848E9C] hover:text-white'}`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F0B90B]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Filters Bar */}
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
        </div>
    );
};

export default TransactionFilters;
