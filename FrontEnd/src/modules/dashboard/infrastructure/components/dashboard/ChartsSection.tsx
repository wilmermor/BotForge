import { memo, useState, useMemo } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';
import { useDashboardData } from '../../hooks/useDashboardData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
    format,
    startOfWeek,
    endOfWeek,
    addWeeks,
    isWithinInterval,
    parseISO,
    startOfDay,
    endOfDay
} from 'date-fns';
import { es } from 'date-fns/locale';

const getColorForLabel = (label: string) => {
    if (label.includes('Ganadoras')) return '#02C076';
    if (label.includes('Perdedoras')) return '#F6465D';
    if (label.includes('Breakeven')) return '#F0B90B';
    return '#848E9C';
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1E2329] border border-[#2B3139] p-3 rounded-lg shadow-lg">
                <p className="text-[#848E9C] text-xs font-bold mb-1">{payload[0].name}</p>
                <p className="text-white text-sm font-bold">
                    {payload[0].value} estrategias
                </p>
            </div>
        );
    }
    return null;
};

const ChartsSection = memo(() => {
    const { data, isLoading } = useDashboardData();
    const [weekOffset, setWeekOffset] = useState(0);

    // Calculate current week range
    const now = new Date();
    const selectedDate = addWeeks(now, weekOffset);
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });

    // Format range: "Lun 12 al Dom 18, Feb"
    const dateRangeLabel = useMemo(() => {
        const startDay = format(weekStart, 'eee dd', { locale: es });
        const endDay = format(weekEnd, 'eee dd', { locale: es });
        const month = format(weekEnd, 'MMM', { locale: es });

        // Capitalize first letters
        const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

        return `${capitalize(startDay)} al ${capitalize(endDay)}, ${capitalize(month)}`;
    }, [weekStart, weekEnd]);

    // Format data for Recharts based on selected week
    const activityData = useMemo(() => {
        const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const counts = [0, 0, 0, 0, 0, 0, 0];

        if (data?.simulations) {
            data.simulations.forEach((sim: any) => {
                if (sim.created_at) {
                    const simDate = parseISO(sim.created_at);
                    if (isWithinInterval(simDate, { start: startOfDay(weekStart), end: endOfDay(weekEnd) })) {
                        const dayOfWeek = simDate.getDay(); // 0 is Sunday
                        const adjustedIndex = (dayOfWeek + 6) % 7; // Map 1-0 to 0-6 (Mon-Sun)
                        if (adjustedIndex >= 0 && adjustedIndex < 7) {
                            counts[adjustedIndex]++;
                        }
                    }
                }
            });
        }

        return dayNames.map((label, index) => ({
            name: label,
            simulaciones: counts[index]
        }));
    }, [data?.simulations, weekStart, weekEnd]);

    const assetsRaw = data?.charts?.assets || { labels: ['Sin datos'], data: [1] };
    const assetsData = assetsRaw.labels.map((label, index) => ({
        name: label,
        value: assetsRaw.data[index]
    }));

    // Calculate dominant ROI percentage for central display
    const totalAssets = assetsData.reduce((acc, curr) => acc + curr.value, 0);
    const dominantAsset = assetsData.length > 0 ? assetsData.reduce((prev, current) => (prev.value > current.value) ? prev : current) : null;
    const dominantPercentage = totalAssets > 0 && dominantAsset ? Math.round((dominantAsset.value / totalAssets) * 100) : 0;
    const dominantColor = dominantAsset ? getColorForLabel(dominantAsset.name) : '#848E9C';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#1E2329] border border-[#2B3139] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Actividad de Simulaciones</h3>

                    {/* Week Navigation */}
                    <div className="flex items-center gap-4 bg-[#2B3139]/50 px-3 py-1.5 rounded-lg border border-[#363C4E]">
                        <button
                            onClick={() => setWeekOffset(prev => prev - 1)}
                            className="text-[#848E9C] hover:text-white transition-colors p-1"
                            title="Semana anterior"
                        >
                            <FiChevronLeft size={20} />
                        </button>

                        <span className="text-sm font-medium text-white min-w-[160px] text-center">
                            {dateRangeLabel}
                        </span>

                        <button
                            onClick={() => setWeekOffset(prev => prev + 1)}
                            className="text-[#848E9C] hover:text-white transition-colors p-1"
                            title="Semana siguiente"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="w-full" style={{ minHeight: 0 }}>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-[280px]">
                            <div className="w-16 h-16 rounded-full border-4 border-[#2B3139] border-t-[#F0B90B] animate-spin"></div>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#848E9C" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#848E9C" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '12px', color: '#848E9C' }} />
                                <Line
                                    type="monotone"
                                    dataKey="simulaciones"
                                    stroke="#F0B90B"
                                    strokeWidth={3}
                                    dot={{ fill: '#F0B90B', strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                    name="Simulaciones"
                                    animationDuration={500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Estrategias por ROI</h3>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-[240px]">
                        <div className="w-32 h-32 rounded-full border-4 border-[#2B3139] border-t-[#02C076] animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={assetsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {assetsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getColorForLabel(entry.name)} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-2xl font-bold"
                                    fill={dominantColor}
                                >
                                    {dominantPercentage}%
                                </text>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-4 w-full mt-2">
                            {assetsData.map((entry, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColorForLabel(entry.name) }}></div>
                                    <span className="text-xs text-white font-medium">{entry.name} ({entry.value})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
});


ChartsSection.displayName = 'ChartsSection';
export default ChartsSection;
