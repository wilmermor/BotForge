import { Download } from 'lucide-react';

const HistorialHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-[28px] font-bold text-white leading-tight mb-1">Historial de Estrategias</h2>
                <p className="text-[#848E9C] text-sm">Registro completo de backtests y ejecuciones en vivo</p>
            </div>


        </div>
    );
};

export default HistorialHeader;
