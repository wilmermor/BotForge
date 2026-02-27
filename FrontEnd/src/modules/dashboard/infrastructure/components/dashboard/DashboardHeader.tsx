import { RefreshCw, Download } from 'lucide-react';

const DashboardHeader = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
                <p className="text-[#848E9C] text-sm mt-1">Resumen general de tu actividad y rendimiento</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-[#2B3139] hover:bg-[#3A4149] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    Actualizar
                </button>
                <button className="flex items-center gap-2 bg-[#F0B90B] hover:bg-[#E0A90B] text-black px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                    <Download className="w-4 h-4" />
                    Reporte
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;
