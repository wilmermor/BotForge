import {
    Calendar, Wallet, TrendingUp, Trophy, BookOpen,
    MoreHorizontal, Filter, Info
} from 'lucide-react';

const DashboardComponent = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6 animate-fade-in">
            {/* 2. Encabezado del Dashboard */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-[28px] font-bold text-white leading-tight">Buenos días, Trader</h2>
                    <p className="text-[#848E9C] text-sm mt-1">Resumen de tu actividad y posiciones</p>
                </div>

                <div className="flex items-center gap-2">
                    <button className="bg-[#1E2329] border border-[#2B3139] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:border-[#F0B90B] transition-colors flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-[#F0B90B]" />
                        <span>Hoy</span>
                        <ChevronDownIcon />
                    </button>
                </div>
            </div>

            {/* 3. Sección 1 - Tarjetas de Balance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Tarjeta 1 - Balance Total */}
                <div className="bg-[#1E2329] rounded-xl p-5 border border-transparent hover:border-[#2B3139] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-[#848E9C] text-sm font-medium">Balance Total</span>
                        <Wallet className="h-5 w-5 text-[#F0B90B]" />
                    </div>
                    <div className="text-[28px] font-bold text-white mb-2">$24,567.89 <span className="text-lg text-[#848E9C] font-normal">USD</span></div>
                    <div className="inline-flex items-center px-2 py-0.5 rounded bg-[#02C076]/20">
                        <span className="text-[#02C076] text-xs font-bold">+5.2%</span>
                    </div>
                </div>

                {/* Tarjeta 2 - P&L Total */}
                <div className="bg-[#1E2329] rounded-xl p-5 border border-transparent hover:border-[#2B3139] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-[#848E9C] text-sm font-medium">P&L Total</span>
                        <TrendingUp className="h-5 w-5 text-[#02C076]" />
                    </div>
                    <div className="text-[24px] font-bold text-[#02C076] mb-2">+$3,245.50</div>
                    <div className="flex items-center text-sm font-medium text-[#02C076]">
                        <span>+15.3%</span>
                    </div>
                </div>

                {/* Tarjeta 3 - Win Rate */}
                <div className="bg-[#1E2329] rounded-xl p-5 border border-transparent hover:border-[#2B3139] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-[#848E9C] text-sm font-medium">Win Rate</span>
                        <Trophy className="h-5 w-5 text-[#F0B90B]" />
                    </div>
                    <div className="text-[28px] font-bold text-white mb-2">68.5%</div>
                    <span className="text-[#848E9C] text-xs font-medium">Últimos 30 días</span>
                </div>

                {/* Tarjeta 4 - Posiciones Activas */}
                <div className="bg-[#1E2329] rounded-xl p-5 border border-transparent hover:border-[#2B3139] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-[#848E9C] text-sm font-medium">Posiciones Totales</span>
                        <BookOpen className="h-5 w-5 text-[#848E9C]" />
                    </div>
                    <div className="text-[28px] font-bold text-white mb-2">7</div>
                    <span className="text-[#F0B90B] text-xs font-bold">3 en ejecución</span>
                </div>
            </div>

            {/* 4. Sección 2 - Gráficas de Estadísticas */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Gráfico de Rendimiento (60%) */}
                <div className="lg:col-span-3 bg-[#1E2329] rounded-xl p-5 flex flex-col min-h-[300px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white text-lg font-medium">Rendimiento de Estrategias</h3>
                        <div className="flex items-center gap-4 border-b border-[#2B3139]">
                            <button className="text-[#F0B90B] pb-2 text-sm font-medium border-b-2 border-[#F0B90B]">Por día</button>
                            <button className="text-[#848E9C] hover:text-white pb-2 text-sm font-medium transition-colors">Por semana</button>
                            <button className="text-[#848E9C] hover:text-white pb-2 text-sm font-medium transition-colors">Por mes</button>
                        </div>
                    </div>

                    {/* Fake Chart Area */}
                    <div className="flex-1 relative flex items-center justify-center p-4">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between py-4">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-[1px] bg-[#2B3139]/50"></div>)}
                        </div>

                        {/* Fake Line Chart SVG */}
                        <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Green Line (Profits) */}
                            <path d="M0,70 Q10,65 20,50 T40,40 T60,20 T80,30 T100,10" fill="none" stroke="#02C076" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                            {/* Red Line (Losses) */}
                            <path d="M0,90 Q15,85 30,95 T50,80 T70,85 T90,70 T100,75" fill="none" stroke="#F6465D" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                        </svg>

                        {/* Tooltip representation */}
                        <div className="absolute top-[30%] left-[60%] bg-[#2B3139] border border-[#3E454D] rounded-lg p-3 text-xs shadow-xl hidden md:block">
                            <div className="text-white font-medium mb-1">15 Feb 2026</div>
                            <div className="text-[#02C076] font-bold">+$125.50</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#02C076]"></span>
                            <span className="text-[#848E9C] text-sm">Ganancias</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#F6465D]"></span>
                            <span className="text-[#848E9C] text-sm">Pérdidas</span>
                        </div>
                    </div>
                </div>

                {/* Gráfico de Éxito/Fracaso (40%) */}
                <div className="lg:col-span-2 bg-[#1E2329] rounded-xl p-5 flex flex-col">
                    <h3 className="text-white text-lg font-medium mb-6">Ratio Éxito/Fracaso</h3>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        {/* Donut Chart representation */}
                        <div className="relative w-[160px] h-[160px] flex items-center justify-center">
                            {/* SVG Donut */}
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                {/* Red segment */}
                                <path
                                    className="text-[#F6465D]"
                                    strokeDasharray="32, 100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none" stroke="currentColor" strokeWidth="4"
                                />
                                {/* Green segment (68%) */}
                                <path
                                    className="text-[#02C076]"
                                    strokeDasharray="68, 100"
                                    strokeDashoffset="-32"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none" stroke="currentColor" strokeWidth="4"
                                />
                            </svg>
                            {/* Inner text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-white text-3xl font-bold">68%</span>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-col gap-3 mt-8 w-full max-w-[200px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#02C076]"></span>
                                    <span className="text-white text-sm">Éxitos</span>
                                </div>
                                <span className="text-white font-medium text-sm">156 trades</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#F6465D]"></span>
                                    <span className="text-white text-sm">Fracasos</span>
                                </div>
                                <span className="text-white font-medium text-sm">72 trades</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#2B3139] flex items-center justify-center">
                                <span className="text-[#848E9C] text-sm mr-2 flex items-center gap-1">Profit Factor <Info className="h-3 w-3" /></span>
                                <span className="text-[#F0B90B] font-bold text-lg">2.4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Sección 3 - Tabla de Posiciones Activas */}
            <div className="bg-[#1E2329] rounded-xl flex flex-col overflow-hidden">
                <div className="p-5 flex flex-wrap items-center justify-between border-b border-[#2B3139] gap-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-white text-lg font-medium">Posiciones Activas y en Ejecución</h3>
                        <span className="bg-[#2B3139] text-white text-xs px-2.5 py-1 rounded font-medium">7 activas</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 bg-[#2B3139] rounded text-[#848E9C] hover:text-white transition-colors">
                            <Filter className="h-4 w-4" />
                        </button>
                        <button className="text-[#F0B90B] text-sm font-medium hover:underline">
                            Ver todas
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#2B3139]/50">
                                <th className="p-4 py-3 text-[#848E9C] text-sm font-medium">Par / Activo</th>
                                <th className="p-4 py-3 text-[#848E9C] text-sm font-medium">Tipo</th>
                                <th className="p-4 py-3 text-[#848E9C] text-sm font-medium text-right">Cantidad</th>
                                <th className="p-4 py-3 text-[#848E9C] text-sm font-medium text-right">Precio Entrada</th>
                                <th className="p-4 py-3 text-[#848E9C] text-sm font-medium text-right">Precio Actual</th>
                                <th className="p-4 py-3 text-[#848E9C] text-sm font-medium text-right">P&L</th>
                                <th className="p-4 py-3 text-[#848E9C] text-sm font-medium text-center">Estado</th>
                                <th className="p-4 py-3 text-[#848E9C] text-sm font-medium text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Fila 1 - Activa Ganancia */}
                            <tr className="border-b border-[#2B3139] hover:bg-[#2B3139]/40 transition-colors group">
                                <td className="p-4 text-white font-medium flex items-center gap-2">
                                    <span className="text-[#F0B90B]">★</span> BTC/USDT
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded bg-[#02C076]/20 text-[#02C076] text-xs font-bold">LONG</span>
                                </td>
                                <td className="p-4 text-white text-right">0.25 BTC</td>
                                <td className="p-4 text-white text-right">$42,500.00</td>
                                <td className="p-4 text-white text-right">$44,230.00</td>
                                <td className="p-4 text-right">
                                    <div className="text-[#02C076] font-bold">+$432.50</div>
                                    <div className="text-[#02C076] text-xs">+5.1%</div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="px-2 py-1 rounded border border-[#02C076] text-[#02C076] text-xs font-medium">Activa</span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#848E9C] hover:text-[#F0B90B] transition-colors p-1"><MoreHorizontal className="h-4 w-4 mx-auto" /></button>
                                </td>
                            </tr>

                            {/* Fila 2 - Activa Pérdida */}
                            <tr className="border-b border-[#2B3139] hover:bg-[#2B3139]/40 transition-colors group">
                                <td className="p-4 text-white font-medium flex items-center gap-2">
                                    <span className="text-[#848E9C]">☆</span> ETH/USDT
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded bg-[#F6465D]/20 text-[#F6465D] text-xs font-bold">SHORT</span>
                                </td>
                                <td className="p-4 text-white text-right">2.5 ETH</td>
                                <td className="p-4 text-white text-right">$2,850.00</td>
                                <td className="p-4 text-white text-right">$2,920.00</td>
                                <td className="p-4 text-right">
                                    <div className="text-[#F6465D] font-bold">-$175.00</div>
                                    <div className="text-[#F6465D] text-xs">-2.1%</div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="px-2 py-1 rounded border border-[#02C076] text-[#02C076] text-xs font-medium">Activa</span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#848E9C] hover:text-[#F0B90B] transition-colors p-1"><MoreHorizontal className="h-4 w-4 mx-auto" /></button>
                                </td>
                            </tr>

                            {/* Fila 3 - Pendiente Ejecución */}
                            <tr className="border-b border-[#2B3139] hover:bg-[#2B3139]/40 transition-colors group">
                                <td className="p-4 text-white font-medium flex items-center gap-2">
                                    <span className="text-[#F0B90B]">★</span> SOL/USDT
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded bg-[#02C076]/20 text-[#02C076] text-xs font-bold">LONG</span>
                                </td>
                                <td className="p-4 text-white text-right">15 SOL</td>
                                <td className="p-4 text-white text-right">$98.50</td>
                                <td className="p-4 text-[#848E9C] text-right font-mono text-xs">Pendiente...</td>
                                <td className="p-4 text-right">
                                    <div className="text-[#848E9C] font-bold">$0.00</div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="px-2 py-1 rounded bg-[#F0B90B]/20 text-[#F0B90B] text-xs font-medium flex items-center justify-center gap-1 w-fit mx-auto">
                                        <div className="h-2 w-2 rounded-full bg-[#F0B90B] animate-pulse"></div>
                                        Ejecutando
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#848E9C] hover:text-[#F6465D] transition-colors p-1 text-xs font-medium">Cancelar</button>
                                </td>
                            </tr>

                            {/* Fila 4 - Activa Ganancia */}
                            <tr className="border-b border-[#2B3139] hover:bg-[#2B3139]/40 transition-colors group">
                                <td className="p-4 text-white font-medium flex items-center gap-2">
                                    <span className="text-[#848E9C]">☆</span> BNB/USDT
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded bg-[#02C076]/20 text-[#02C076] text-xs font-bold">LONG</span>
                                </td>
                                <td className="p-4 text-white text-right">1.2 BNB</td>
                                <td className="p-4 text-white text-right">$320.00</td>
                                <td className="p-4 text-white text-right">$345.00</td>
                                <td className="p-4 text-right">
                                    <div className="text-[#02C076] font-bold">+$30.00</div>
                                    <div className="text-[#02C076] text-xs">+7.8%</div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="px-2 py-1 rounded border border-[#02C076] text-[#02C076] text-xs font-medium">Activa</span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#848E9C] hover:text-[#F0B90B] transition-colors p-1"><MoreHorizontal className="h-4 w-4 mx-auto" /></button>
                                </td>
                            </tr>

                            {/* Fila 5 - Pendiente Ejecución */}
                            <tr className="hover:bg-[#2B3139]/40 transition-colors group">
                                <td className="p-4 text-white font-medium flex items-center gap-2">
                                    <span className="text-[#848E9C]">☆</span> ADA/USDT
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded bg-[#F6465D]/20 text-[#F6465D] text-xs font-bold">SHORT</span>
                                </td>
                                <td className="p-4 text-white text-right">1000 ADA</td>
                                <td className="p-4 text-white text-right">$0.450</td>
                                <td className="p-4 text-white text-right">$0.440</td>
                                <td className="p-4 text-right">
                                    <div className="text-[#02C076] font-bold">+$10.00</div>
                                    <div className="text-[#02C076] text-xs">+2.2%</div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="px-2 py-1 rounded bg-[#F0B90B]/20 text-[#F0B90B] text-xs font-medium flex items-center justify-center gap-1 w-fit mx-auto">
                                        <div className="h-2 w-2 rounded-full bg-[#F0B90B] animate-pulse"></div>
                                        Ejecutando
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#848E9C] hover:text-[#F6465D] transition-colors p-1 text-xs font-medium">Cancelar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Sección 4 - Resumen rápido */}
            <div className="flex flex-wrap items-center gap-6 mt-2 pb-6">
                <div className="text-[#848E9C] text-sm"><span className="text-white font-bold mr-1">Total Trades:</span> 228</div>
                <div className="text-[#848E9C] text-sm"><span className="text-[#02C076] font-bold mr-1">Ganancias:</span> 156</div>
                <div className="text-[#848E9C] text-sm"><span className="text-[#F6465D] font-bold mr-1">Pérdidas:</span> 72</div>
                <div className="text-[#848E9C] text-sm"><span className="text-[#F0B90B] font-bold mr-1">Ratio:</span> 2.17</div>
            </div>

        </div>
    );
};

// Help Icon component
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#848E9C]">
        <path d="m6 9 6 6 6-6" />
    </svg>
)

export default DashboardComponent;
