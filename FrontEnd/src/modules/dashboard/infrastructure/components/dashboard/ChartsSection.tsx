import { memo } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';

const COLORS = ['#F0B90B', '#02C076', '#2B3139', '#F6465D', '#848E9C'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1E2329] border border-[#2B3139] p-3 rounded-lg shadow-lg">
                <p className="text-[#848E9C] text-xs font-bold mb-1">{label}</p>
                <p className="text-white text-sm font-bold">
                    {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

const staticCharts = {
    balance: { labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"], data: [100000, 105000, 102000, 115000, 120000, 125000] },
    assets: { labels: ["BTC", "ETH", "SOL"], data: [65, 25, 10] }
};

const ChartsSection = memo(() => {
    // Format data for Recharts
    const balanceData = staticCharts.balance.labels.map((label, index) => ({
        name: label,
        balance: staticCharts.balance.data[index]
    }));

    const assetsData = staticCharts.assets.labels.map((label, index) => ({
        name: label,
        value: staticCharts.assets.data[index]
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#1E2329] border border-[#2B3139] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Rendimiento (Balance / PnL)</h3>
                </div>

                <div className="h-[300px] w-full bg-[#1E2329] flex flex-col justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={balanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#848E9C" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#848E9C" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '12px', color: '#848E9C' }} />
                            <Line type="monotone" dataKey="balance" stroke="#F0B90B" strokeWidth={3} dot={{ fill: '#F0B90B', strokeWidth: 2 }} activeDot={{ r: 6 }} name="Balance" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Distribución de Activos</h3>
                <div className="flex flex-col items-center justify-center h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
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
                                {assetsData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-4 w-full mt-4">
                        {assetsData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="text-xs text-white font-medium">{entry.name} ({entry.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
});

ChartsSection.displayName = 'ChartsSection';
export default ChartsSection;
