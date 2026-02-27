
import { memo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Wallet, PieChart, BarChart2 } from 'lucide-react';
import type { DashboardStats } from '../../hooks/useDashboardData';

const IconMap: Record<string, React.ElementType> = {
    'wallet': Wallet,
    'dollar': DollarSign,
    'activity': Activity,
    'chart': BarChart2,
    'pie': PieChart,
    'trending-up': TrendingUp,
    'trending-down': TrendingDown
};

const staticStats: DashboardStats[] = [
    { id: "totalBalance", label: "Balance Total", value: "$125,000", change: 12.5, changeType: "positive", icon: "wallet" },
    { id: "activePositions", label: "Posiciones Activas", value: 8, change: -2, changeType: "negative", icon: "activity" },
    { id: "totalPnl", label: "Beneficio Total", value: "+$1,250", change: 5.4, changeType: "positive", icon: "trending-up" },
    { id: "winRate", label: "Win Rate", value: "68%", change: 1.2, changeType: "positive", icon: "pie" }
];

const StatsGrid = memo(() => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {staticStats.map((stat, index) => {
                const Icon = IconMap[stat.icon] || Activity;
                const isPositive = stat.changeType === 'positive';
                const colorClass = stat.changeType === 'positive' ? 'text-[#02C076]' :
                    stat.changeType === 'negative' ? 'text-[#F6465D]' : 'text-[#F0B90B]';

                return (
                    <div key={stat.id || index} className="bg-[#1E2329] border border-[#2B3139] p-5 rounded-xl hover:border-[#F0B90B]/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg bg-[#2B3139] group-hover:bg-[#F0B90B]/10 transition-colors`}>
                                <Icon className={`w-5 h-5 ${colorClass}`} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${isPositive ? 'bg-[#02C076]/10 text-[#02C076]' : stat.changeType === 'negative' ? 'bg-[#F6465D]/10 text-[#F6465D]' : 'bg-[#F0B90B]/10 text-[#F0B90B]'}`}>
                                {stat.change > 0 ? '+' : ''}{stat.change}%
                            </span>
                        </div>
                        <div>
                            <p className="text-[#848E9C] text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

StatsGrid.displayName = 'StatsGrid';
export default StatsGrid;
