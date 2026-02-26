import { Filter, MoreHorizontal, Download, Calendar, Search } from 'lucide-react';

const HistorialComponent = () => {
    const historicalData = [
        { id: 1, pair: 'BTC/USDT', type: 'LONG', amount: '0.25 BTC', entry: '$42,500.00', exit: '$44,230.00', pnl: '+$432.50', pnlPct: '+5.1%', status: 'Cerrada', date: '2026-02-25 14:30' },
        { id: 2, pair: 'ETH/USDT', type: 'SHORT', amount: '2.5 ETH', entry: '$2,850.00', exit: '$2,920.00', pnl: '-$175.00', pnlPct: '-2.1%', status: 'Cerrada', date: '2026-02-25 12:15' },
        { id: 3, pair: 'SOL/USDT', type: 'LONG', amount: '15 SOL', entry: '$98.50', exit: '$112.30', pnl: '+$207.00', pnlPct: '+14.0%', status: 'Cerrada', date: '2026-02-24 18:45' },
        { id: 4, pair: 'BNB/USDT', type: 'LONG', amount: '1.2 BNB', entry: '$320.00', exit: '$345.00', pnl: '+$30.00', pnlPct: '+7.8%', status: 'Cerrada', date: '2026-02-24 09:20' },
        { id: 5, pair: 'ADA/USDT', type: 'SHORT', amount: '1000 ADA', entry: '$0.450', exit: '$0.440', pnl: '+$10.00', pnlPct: '+2.2%', status: 'Cerrada', date: '2026-02-23 21:10' },
        { id: 6, pair: 'DOT/USDT', type: 'LONG', amount: '50 DOT', entry: '$7.20', exit: '$6.80', pnl: '-$20.00', pnlPct: '-5.5%', status: 'Cerrada', date: '2026-02-23 15:00' },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-fade-in">
            {/* Header / Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E2329] rounded-xl p-5 border border-[#2B3139]">
                    <div className="text-[#848E9C] text-sm font-medium mb-1">Trades Totales</div>
                    <div className="text-2xl font-bold text-white">128</div>
                    <div className="text-[#02C076] text-xs font-medium mt-1">+12 est. mes</div>
                </div>
                <div className="bg-[#1E2329] rounded-xl p-5 border border-[#2B3139]">
                    <div className="text-[#848E9C] text-sm font-medium mb-1">P&L Acumulado</div>
                    <div className="text-2xl font-bold text-[#02C076]">+$2,450.32</div>
                    <div className="text-[#848E9C] text-xs mt-1">ROI: +24.5%</div>
                </div>
                <div className="bg-[#1E2329] rounded-xl p-5 border border-[#2B3139]">
                    <div className="text-[#848E9C] text-sm font-medium mb-1">Win Rate</div>
                    <div className="text-2xl font-bold text-[#F0B90B]">65.4%</div>
                    <div className="text-[#848E9C] text-xs mt-1">84 ganados / 44 perdidos</div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#848E9C]" />
                        <input
                            type="text"
                            placeholder="Filtrar por par..."
                            className="bg-[#1E2329] border border-[#2B3139] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-full md:w-[240px] focus:outline-none focus:border-[#F0B90B] transition-colors"
                        />
                    </div>
                    <button className="bg-[#1E2329] border border-[#2B3139] text-white p-2 rounded-lg hover:border-[#F0B90B] transition-colors">
                        <Filter className="h-4 w-4" />
                    </button>
                    <button className="bg-[#1E2329] border border-[#2B3139] text-white p-2 rounded-lg hover:border-[#F0B90B] transition-colors">
                        <Calendar className="h-4 w-4" />
                    </button>
                </div>

                <button className="flex items-center gap-2 bg-[#F0B90B] text-black px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all">
                    <Download className="h-4 w-4" />
                    Exportar CSV
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-[#1E2329] rounded-xl flex flex-col overflow-hidden border border-[#2B3139]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-[#2B3139]/50 border-b border-[#2B3139]">
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider">Fecha / Hora</th>
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider">Par</th>
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider">Tipo</th>
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider text-right">Cantidad</th>
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider text-right">Entrada</th>
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider text-right">Salida</th>
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider text-right">P&L</th>
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider text-center">Estado</th>
                                <th className="p-4 py-4 text-[#848E9C] text-xs font-bold uppercase tracking-wider text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicalData.map((item) => (
                                <tr key={item.id} className="border-b border-[#2B3139] hover:bg-[#2B3139]/40 transition-colors group">
                                    <td className="p-4 text-[#848E9C] text-sm whitespace-nowrap">
                                        {item.date}
                                    </td>
                                    <td className="p-4 text-white font-bold">
                                        {item.pair}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${item.type === 'LONG' ? 'bg-[#02C076]/20 text-[#02C076]' : 'bg-[#F6465D]/20 text-[#F6465D]'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-white text-right text-sm">{item.amount}</td>
                                    <td className="p-4 text-white text-right text-sm font-medium">{item.entry}</td>
                                    <td className="p-4 text-white text-right text-sm font-medium">{item.exit}</td>
                                    <td className="p-4 text-right">
                                        <div className={`font-bold text-sm ${item.pnl.startsWith('+') ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                            {item.pnl}
                                        </div>
                                        <div className={`text-[10px] ${item.pnl.startsWith('+') ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                            {item.pnlPct}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="px-2.5 py-1 rounded-full bg-[#1E2329] border border-[#2B3139] text-[#848E9C] text-[11px] font-medium">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="text-[#848E9C] hover:text-[#F0B90B] transition-colors">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#2B3139] flex items-center justify-between bg-[#1E2329]/50">
                    <span className="text-[#848E9C] text-xs">Mostrando 6 de 128 resultados</span>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 rounded bg-[#2B3139] text-[#848E9C] text-xs hover:text-white transition-colors disabled:opacity-50">Anterior</button>
                        <button className="px-3 py-1 rounded bg-[#F0B90B] text-black text-xs font-bold">1</button>
                        <button className="px-3 py-1 rounded bg-[#2B3139] text-[#848E9C] text-xs hover:text-white transition-colors">2</button>
                        <button className="px-3 py-1 rounded bg-[#2B3139] text-[#848E9C] text-xs hover:text-white transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistorialComponent;
