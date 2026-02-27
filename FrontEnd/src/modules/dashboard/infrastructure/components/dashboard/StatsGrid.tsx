
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const StatsGrid = () => {
    const stats = [
        {
            label: 'Balance Total',
            value: '$12,450.80',
            change: '+5.2%',
            isPositive: true,
            icon: DollarSign,
            color: 'text-[#F0B90B]'
        },
        {
            label: 'Profit 24h',
            value: '+$342.15',
            change: '+12.4%',
            isPositive: true,
            icon: TrendingUp,
            color: 'text-[#02C076]'
        },
        {
            label: 'Drawdown Máx',
            value: '3.14%',
            change: '-0.5%',
            isPositive: true,
            icon: TrendingDown,
            color: 'text-[#F6465D]'
        },
        {
            label: 'Bots Activos',
            value: '8',
            change: '+1',
            isPositive: true,
            icon: Activity,
            color: 'text-[#F0B90B]'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-[#1E2329] border border-[#2B3139] p-5 rounded-xl hover:border-[#F0B90B]/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg bg-[#2B3139] group-hover:bg-[#F0B90B]/10 transition-colors`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${stat.isPositive ? 'bg-[#02C076]/10 text-[#02C076]' : 'bg-[#F6465D]/10 text-[#F6465D]'}`}>
                            {stat.change}
                        </span>
                    </div>
                    <div>
                        <p className="text-[#848E9C] text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
