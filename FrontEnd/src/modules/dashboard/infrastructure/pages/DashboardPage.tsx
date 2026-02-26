import Sidebar from '../components/Sidebar';
import type { ViewType } from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import DashboardComponent from '../components/DashboardComponent';
import SimuladorComponent from '../components/SimuladorComponent';
import HistorialComponent from '../components/HistorialComponent';
import ConfiguracionComponent from '../components/ConfiguracionComponent';
import SoporteComponent from '../components/SoporteComponent';
import { useState } from 'react';

const DashboardPage = () => {
    // Application State
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeView, setActiveView] = useState<ViewType>('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardComponent />;
            case 'simulador':
                return <SimuladorComponent />;
            case 'historial':
                return <HistorialComponent />;
            case 'configuracion':
                return <ConfiguracionComponent />;
            case 'soporte':
                return <SoporteComponent />;
            default:
                return <DashboardComponent />;
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#0B0E11] text-white font-sans overflow-hidden">
            {/* Persist Sidebar */}
            <Sidebar
                isCollapsed={isCollapsed}
                activeView={activeView}
                setActiveView={setActiveView}
            />

            {/* Main Wrapper */}
            <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
                <TopHeader
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    activeView={activeView}
                />

                {/* Dynamic Content Canvas with Independent Scroll */}
                <main className="flex-1 overflow-y-auto bg-[#0B0E11] p-6 relative">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
