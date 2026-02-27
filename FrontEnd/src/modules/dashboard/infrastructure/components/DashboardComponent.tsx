import DashboardHeader from './dashboard/DashboardHeader';
import StatsGrid from './dashboard/StatsGrid';
import ChartsSection from './dashboard/ChartsSection';
import ActivePositionsTable from './dashboard/ActivePositionsTable';

const DashboardComponent = () => {
    return (
        <div className="w-full h-full flex flex-col space-y-8 animate-in fade-in duration-500">
            <DashboardHeader isLoading={false} onRefresh={() => { }} />

            <StatsGrid />
            <ChartsSection />
            <ActivePositionsTable />

            {/* Custom Animations Inline */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                .shimmer {
                    background: #2B3139;
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0,
                        rgba(255, 255, 255, 0.05) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite linear;
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
};

export default DashboardComponent;
