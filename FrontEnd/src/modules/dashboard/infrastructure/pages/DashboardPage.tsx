import Sidebar from '../components/Sidebar';
import type { ViewType } from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import DashboardComponent from '../components/DashboardComponent';
import SimuladorComponent from '../components/SimuladorComponent';
import HistorialComponent from '../components/HistorialComponent';
import ConfiguracionComponent from '../components/ConfiguracionComponent';
import SoporteComponent from '../components/SoporteComponent';
import NotificacionesComponent from '../components/NotificacionesComponent';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type SettingsTab = 'perfil' | 'seguridad' | 'suscripcion';

const DashboardPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // Application State
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeView, setActiveView] = useState<ViewType>((searchParams.get('view') as ViewType) || 'dashboard');
    const [activeConfigTab, setActiveConfigTab] = useState<SettingsTab>('perfil');

    // Sync view if URL changes (external navigation)
    useEffect(() => {
        const view = searchParams.get('view') as ViewType;
        if (view && view !== activeView) {
            setActiveView(view);
        }
    }, [searchParams]);

    // Update URL when activeView changes (internal navigation)
    const handleUpdateView = (view: ViewType) => {
        setActiveView(view);
        setSearchParams({ view });
    };

    // unified navigation handler
    const handleNavigate = (view: ViewType, configTab?: SettingsTab) => {
        handleUpdateView(view);
        if (configTab) {
            setActiveConfigTab(configTab);
        }
    };

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardComponent />;
            case 'simulador':
                return <SimuladorComponent />;
            case 'historial':
                return <HistorialComponent />;
            case 'notificaciones':
                return <NotificacionesComponent />;
            case 'configuracion':
                return <ConfiguracionComponent activeTab={activeConfigTab} setActiveTab={setActiveConfigTab} />;
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
                setActiveView={handleUpdateView}
            />

            {/* Main Wrapper */}
            <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
                <TopHeader
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    activeView={activeView}
                    onNavigate={handleNavigate}
                />

                {/* Dynamic Content Canvas with Independent Scroll */}
                <main className="flex-1 overflow-y-auto bg-[#0B0E11] p-6 relative custom-scrollbar">
                    {renderContent()}
                </main>
            </div>
            {/* Global Custom Scrollbar logic passed down from previous views */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #2B3139;
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #3A4149;
                }
            `}</style>
        </div>
    );
};

export default DashboardPage;
