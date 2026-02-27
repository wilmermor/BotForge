import DashboardHeader from './dashboard/DashboardHeader';
import StatsGrid from './dashboard/StatsGrid';
import ChartsSection from './dashboard/ChartsSection';
import ActivePositionsTable from './dashboard/ActivePositionsTable';

const DashboardComponent = () => {
    return (
        <div className="w-full h-full flex flex-col space-y-8 animate-in fade-in duration-500">
            <DashboardHeader />
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
            `}</style>
        </div>
    );
};

export default DashboardComponent;
