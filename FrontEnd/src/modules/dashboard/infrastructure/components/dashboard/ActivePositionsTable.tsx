
import { ExternalLink, Play, Pause } from 'lucide-react';

const ActivePositionsTable = () => {
    const positions = [
        { pair: 'BTC/USDT', type: 'GRID', entry: '27,450.20', price: '28,120.45', pnl: '+45.20', pnlPct: '+1.2%', status: 'Running' },
        { pair: 'ETH/USDT', type: 'DCA', entry: '1,840.10', price: '1,825.30', pnl: '-12.40', pnlPct: '-0.8%', status: 'Paused' },
        { pair: 'SOL/USDT', type: 'GRID', entry: '22.45', price: '24.12', pnl: '+18.40', pnlPct: '+8.2%', status: 'Running' },
        { pair: 'LINK/USDT', type: 'DCA', entry: '7.12', price: '7.45', pnl: '+4.15', pnlPct: '+2.1%', status: 'Running' },
    ];

    return (
        <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl overflow-hidden mt-6">
            <div className="p-6 border-b border-[#2B3139] flex justify-between items-center bg-[#1E2329]">
                <h3 className="text-lg font-bold text-white">Posiciones Activas</h3>
                <button className="text-[#F0B90B] text-xs font-bold hover:underline flex items-center gap-1">
                    Ver todo <ExternalLink className="w-3 h-3" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#2B3139]/30 text-[#848E9C] text-xs uppercase font-bold tracking-wider">
                            <th className="px-6 py-4">Par / Estrategia</th>
                            <th className="px-6 py-4">Precio Entrada</th>
                            <th className="px-6 py-4">Precio Actual</th>
                            <th className="px-6 py-4">PnL No Realizado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B3139]">
                        {positions.map((pos, i) => (
                            <tr key={i} className="hover:bg-[#2B3139]/20 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-sm tracking-tight">{pos.pair}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] bg-[#2B3139] text-[#848E9C] px-1.5 py-0.5 rounded font-bold">{pos.type}</span>
                                            <span className={`w-1.5 h-1.5 rounded-full ${pos.status === 'Running' ? 'bg-[#02C076] animate-pulse' : 'bg-[#EFB90B]'}`}></span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#EAECEF] font-medium text-sm">
                                    {pos.entry}
                                </td>
                                <td className="px-6 py-4 text-[#EAECEF] font-medium text-sm">
                                    {pos.price}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className={`font-bold text-sm ${pos.pnl.startsWith('+') ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                            {pos.pnl} USDT
                                        </span>
                                        <span className={`text-xs ${pos.pnlPct.startsWith('+') ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                            {pos.pnlPct}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-[#2B3139] rounded-lg transition-colors text-[#848E9C] hover:text-white">
                                            {pos.status === 'Running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                        </button>
                                        <button className="text-[#F0B90B] text-xs font-bold px-3 py-1.5 bg-[#F0B90B]/10 hover:bg-[#F0B90B]/20 rounded-lg transition-colors">
                                            Detalles
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivePositionsTable;
