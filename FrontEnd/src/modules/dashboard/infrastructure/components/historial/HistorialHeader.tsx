import { Download } from 'lucide-react';

const HistorialHeader = () => {
    return (
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
    );
};

export default HistorialHeader;
