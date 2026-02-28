import { Search, Eye, Trash2, Loader2 } from 'lucide-react';
import type { StrategyRecord } from '../HistorialComponent';

interface TransactionTableProps {
    strategies: StrategyRecord[];
    onOpenModal: (strategy: StrategyRecord) => void;
    onOpenDeleteModal: (strategy: StrategyRecord) => void;
    isLoading: boolean;
}

const TransactionTable = ({ strategies, onOpenModal, onOpenDeleteModal, isLoading }: TransactionTableProps) => {
    return (
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
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="py-24 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <Loader2 className="h-10 w-10 text-[#F0B90B] animate-spin mb-4" />
                                        <h3 className="text-white text-lg font-bold mb-1">Cargando simulaciones...</h3>
                                        <p className="text-[#848E9C] text-sm">Obteniendo tu historial desde el servidor.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : strategies.length === 0 ? (
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
                            strategies.map((item) => (
                                <tr
                                    key={item.id}
                                    className={`group cursor-pointer transition-all bg-[#1E2329]/40 hover:bg-[#2B3139] border-l-4 border-l-transparent ${item.resultValue > 0 ? 'hover:border-l-[#02C076]' :
                                        item.resultValue < 0 ? 'hover:border-l-[#F6465D]' : 'hover:border-l-[#848E9C]'}`}
                                    onClick={() => onOpenModal(item)}
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
                                            item.type === 'DCA' ? 'bg-[#3B82F620] text-[#3B82F6]' : 'bg-[#F0B90B20] text-[#F0B90B]'}`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 border-y border-[#2B3139] group-hover:border-[#3E454D] transition-colors text-right">
                                        <span className={`font-bold text-base ${item.resultValue > 0 ? 'text-[#02C076]' :
                                            item.resultValue < 0 ? 'text-[#F6465D]' : 'text-[#848E9C]'}`}>
                                            {item.result}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 border-y border-[#2B3139] group-hover:border-[#3E454D] transition-colors text-right">
                                        <span className={`font-medium text-base ${item.resultValue > 0 ? 'text-[#02C076]' :
                                            item.resultValue < 0 ? 'text-[#F6465D]' : 'text-[#848E9C]'}`}>
                                            {item.returnPct}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 last:rounded-r-xl border-y border-r border-[#2B3139] group-hover:border-[#3E454D] transition-colors" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
                                            <button
                                                onClick={() => onOpenModal(item)}
                                                className="h-9 w-9 bg-[#2B3139] hover:bg-[#F0B90B] rounded-lg text-[#848E9C] hover:text-black flex items-center justify-center transition-all shadow-sm"
                                                title="Ver detalles"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onOpenDeleteModal(item)}
                                                className="h-9 w-9 bg-[#2B3139] hover:bg-[#F6465D] rounded-lg text-[#848E9C] hover:text-white flex items-center justify-center transition-all shadow-sm"
                                                title="Borrar simulación"
                                            >
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
        </div>
    );
};

export default TransactionTable;
