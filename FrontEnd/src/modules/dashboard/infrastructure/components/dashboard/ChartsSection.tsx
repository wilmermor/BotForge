
const ChartsSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#1E2329] border border-[#2B3139] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Rendimiento por Estrategia</h3>
                    <div className="flex bg-[#2B3139] p-1 rounded-lg">
                        <button className="px-3 py-1 text-xs font-bold bg-[#1E2329] text-[#F0B90B] rounded-md shadow-sm border border-[#F0B90B]/20">Día</button>
                        <button className="px-3 py-1 text-xs font-bold text-[#848E9C] hover:text-white transition-colors">Semana</button>
                        <button className="px-3 py-1 text-xs font-bold text-[#848E9C] hover:text-white transition-colors">Mes</button>
                    </div>
                </div>
                <div className="h-[300px] w-full bg-[#1E2329] flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="flex items-end justify-between w-full h-full px-4 gap-2">
                        {[40, 65, 35, 80, 55, 90, 45, 70, 60, 85, 40, 75].map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group/bar">
                                <div
                                    className="w-full bg-[#2B3139] rounded-t-sm group-hover/bar:bg-[#F0B90B] transition-all duration-300 relative"
                                    style={{ height: `${val}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2B3139] text-[#F0B90B] text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                        {val * 12}
                                    </div>
                                </div>
                                <span className="text-[10px] text-[#848E9C] mt-2">D{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Distribución de Activos</h3>
                <div className="flex flex-col items-center justify-center h-[300px]">
                    <div className="relative w-48 h-48 mb-8">
                        <div className="absolute inset-0 rounded-full border-[16px] border-[#2B3139]"></div>
                        <div className="absolute inset-0 rounded-full border-[16px] border-[#F0B90B] border-t-transparent border-r-transparent rotate-45"></div>
                        <div className="absolute inset-0 rounded-full border-[16px] border-[#02C076] border-b-transparent border-l-transparent -rotate-12"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-white">BTC</span>
                            <span className="text-xs text-[#848E9C]">65%</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#F0B90B]"></div>
                            <span className="text-xs text-white font-medium">BTC (65%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#02C076]"></div>
                            <span className="text-xs text-white font-medium">ETH (25%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#2B3139]"></div>
                            <span className="text-xs text-white font-medium">SOL (10%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;
