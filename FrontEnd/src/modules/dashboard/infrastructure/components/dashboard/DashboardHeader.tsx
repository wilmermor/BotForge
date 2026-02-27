import { RefreshCw, Download, Calendar } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format, startOfWeek, startOfMonth } from 'date-fns';

interface DashboardHeaderProps {
    isLoading: boolean;
    onRefresh: () => void;
}

const DashboardHeader = ({ isLoading, onRefresh }: DashboardHeaderProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [datePreset, setDatePreset] = useState(searchParams.get('preset') || 'month');
    const [customRange, setCustomRange] = useState({
        start: searchParams.get('startDate') || '',
        end: searchParams.get('endDate') || ''
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('preset', datePreset);

            if (datePreset === 'custom') {
                if (customRange.start) newParams.set('startDate', customRange.start);
                if (customRange.end) newParams.set('endDate', customRange.end);
            } else {
                newParams.delete('startDate');
                newParams.delete('endDate');

                // Calculate dates based on preset
                const today = new Date();
                let start = '';
                const end = format(today, 'yyyy-MM-dd');

                if (datePreset === 'today') {
                    start = format(today, 'yyyy-MM-dd');
                } else if (datePreset === 'week') {
                    start = format(startOfWeek(today, { weekStartsOn: 1 }), 'yyyy-MM-dd');
                } else if (datePreset === 'month') {
                    start = format(startOfMonth(today), 'yyyy-MM-dd');
                }

                if (start) {
                    newParams.set('startDate', start);
                    newParams.set('endDate', end);
                }
            }

            setSearchParams(newParams);
        }, 500); // 500ms debounce

        return () => clearTimeout(handler);
    }, [datePreset, customRange.start, customRange.end, setSearchParams]);

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
                <p className="text-[#848E9C] text-sm mt-1">Resumen general de tu actividad y rendimiento</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                {/* Date Filter */}
                <div className="flex items-center gap-2 bg-[#1E2329] border border-[#2B3139] p-1 rounded-lg w-full sm:w-auto">
                    <Calendar className="w-4 h-4 text-[#848E9C] ml-2 hidden sm:block" />
                    <select
                        value={datePreset}
                        onChange={(e) => setDatePreset(e.target.value)}
                        className="bg-transparent text-white text-sm focus:outline-none p-1.5 cursor-pointer w-full sm:w-auto"
                    >
                        <option value="today">Hoy</option>
                        <option value="week">Esta semana</option>
                        <option value="month">Este mes</option>
                        <option value="custom">Personalizado</option>
                    </select>

                    {datePreset === 'custom' && (
                        <div className="flex items-center gap-2 px-2 border-l border-[#2B3139]">
                            <input
                                type="date"
                                value={customRange.start}
                                onChange={(e) => setCustomRange(p => ({ ...p, start: e.target.value }))}
                                className="bg-transparent text-white text-xs focus:outline-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                            />
                            <span className="text-[#848E9C]">-</span>
                            <input
                                type="date"
                                value={customRange.end}
                                onChange={(e) => setCustomRange(p => ({ ...p, end: e.target.value }))}
                                className="bg-transparent text-white text-xs focus:outline-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                        onClick={onRefresh}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-[#2B3139] hover:bg-[#3A4149] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">Actualizar</span>
                    </button>
                    <button className="flex items-center gap-2 bg-[#F0B90B] hover:bg-[#E0A90B] text-black px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Reporte</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
