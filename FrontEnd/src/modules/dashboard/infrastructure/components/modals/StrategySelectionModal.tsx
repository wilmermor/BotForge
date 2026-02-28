
import { useState, useEffect } from 'react';
import {
    Search,
    Settings,
    Activity,
    ChevronRight,
    X,
    FolderOpen,
    Play
} from 'lucide-react';

interface Strategy {
    id: string;
    name: string;
    type: 'grid' | 'dca';
    params: any;
    updated_at: string;
}

interface StrategySelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (strategy: Strategy) => void;
}

export const StrategySelectionModal = ({ isOpen, onClose, onSelect }: StrategySelectionModalProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'ALL' | 'GRID' | 'DCA'>('ALL');
    const [strategies, setStrategies] = useState<Strategy[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchStrategies();
        }
    }, [isOpen]);

    const fetchStrategies = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token') || '';
            const response = await fetch("http://localhost:8000/api/v1/strategies/", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setStrategies(data);
            }
        } catch (error) {
            console.error("Error fetching strategies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const filteredStrategies = strategies.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'ALL' || s.type.toUpperCase() === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="absolute left-0 top-[calc(100%+8px)] w-[400px] bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.6)] z-50 origin-top-left animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Top Arrow */}
            <div className="absolute -top-[9px] left-6 w-4 h-4 bg-[#1E2329] border-t border-l border-[#2B3139] rotate-45" />

            {/* Header */}
            <div className="p-4 border-b border-[#2B3139] flex justify-between items-center bg-[#1E2329] rounded-t-xl relative z-10">
                <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-[#F0B90B]" />
                    <h3 className="text-white font-bold text-[18px]">Estrategias Guardadas</h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-[#848E9C] hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Filters & Search */}
            <div className="p-4 space-y-3 bg-[#1E2329] relative z-10 border-b border-[#2B3139]">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#848E9C] group-focus-within:text-[#F0B90B] transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar estrategia..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#2B3139] border border-transparent focus:border-[#F0B90B] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none transition-all"
                    />
                </div>

                <div className="flex bg-[#2B3139] p-1 rounded-lg">
                    {['ALL', 'GRID', 'DCA'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type as any)}
                            className={`flex-1 py-1.5 text-[11px] font-bold rounded transition-all ${filterType === type
                                ? 'bg-[#1E2329] text-[#F0B90B] shadow-md'
                                : 'text-[#848E9C] hover:text-white'
                                }`}
                        >
                            {type === 'ALL' ? 'TODAS' : type}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar space-y-1 relative z-10 bg-[#1E2329]">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-6 h-6 border-2 border-[#F0B90B] border-t-transparent rounded-full mx-auto mb-2" />
                        <span className="text-[#848E9C] text-sm font-medium">Cargando estrategias...</span>
                    </div>
                ) : filteredStrategies.length > 0 ? (
                    filteredStrategies.map((strategy) => (
                        <div
                            key={strategy.id}
                            onClick={() => onSelect(strategy)}
                            className="bg-transparent hover:bg-[#2B3139] rounded-lg p-3 flex items-center gap-3 transition-colors cursor-pointer group"
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${strategy.type.toLowerCase() === 'grid' ? 'bg-[#F0B90B]/10' : 'bg-[#02C076]/10'
                                }`}>
                                {strategy.type.toLowerCase() === 'grid' ? (
                                    <Settings className="w-5 h-5 text-[#F0B90B]" />
                                ) : (
                                    <Activity className="w-5 h-5 text-[#02C076]" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-white font-bold text-[14px] truncate">{strategy.name}</h4>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${strategy.type.toLowerCase() === 'grid' ? 'bg-[#F0B90B]/20 text-[#F0B90B]' : 'bg-[#02C076]/20 text-[#02C076]'
                                        }`}>
                                        {strategy.type}
                                    </span>
                                </div>
                                <div className="text-[#848E9C] text-[11px] mt-0.5 flex flex-wrap gap-2">
                                    {strategy.type.toLowerCase() === 'grid' && strategy.params && (
                                        <>
                                            <span className="font-medium inline-block bg-[#1E2329] px-1.5 rounded text-[#EAECEF]">Rango: {strategy.params.lower_price} - {strategy.params.upper_price}</span>
                                            <span className="font-medium inline-block bg-[#1E2329] px-1.5 rounded text-[#EAECEF]">Grids: {strategy.params.grid_count}</span>
                                        </>
                                    )}
                                    {strategy.type.toLowerCase() === 'dca' && strategy.params && (
                                        <>
                                            <span className="font-medium inline-block bg-[#1E2329] px-1.5 rounded text-[#EAECEF]">Inv: {strategy.params.buy_amount} USDT</span>
                                            <span className="font-medium inline-block bg-[#1E2329] px-1.5 rounded text-[#EAECEF]">Int: {strategy.params.interval_bars} velas</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#2B3139] group-hover:text-[#848E9C] transition-colors" />
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center flex flex-col items-center gap-3 opacity-60">
                        <FolderOpen className="w-8 h-8 text-[#2B3139]" />
                        <span className="text-[#848E9C] text-sm">No se encontraron estrategias</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#2B3139] p-2 bg-[#1E2329] rounded-b-xl relative z-10">

            </div>
        </div>
    );
};
