import Sidebar from '../components/Sidebar';
import type { ViewType } from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import DashboardComponent from '../components/DashboardComponent';
import { ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';

const DashboardPage = () => {
    // Application State
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeView, setActiveView] = useState<ViewType>('dashboard');

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
                    {activeView === 'dashboard' ? (
                        <DashboardComponent />
                    ) : (
                        <div className="h-full min-h-[500px] border-2 border-dashed border-[#F0B90B]/50 rounded-xl bg-[#1E2329]/50 flex flex-col items-center justify-center relative p-8 text-center transition-all duration-300">
                            <ArrowLeftRight className="h-16 w-16 text-[#F0B90B] mb-6 opacity-80" />
                            <h2 className="text-2xl font-bold text-white mb-2">
                                COMPONENTE ACTIVO: <span className="text-[#F0B90B] uppercase">{activeView}</span>
                            </h2>
                            <p className="text-[#848E9C] text-lg max-w-md mx-auto">
                                Este espacio se reemplaza completamente según la opción seleccionada en la sidebar.
                            </p>
                            <div className="mt-12 flex items-center justify-center gap-4 opacity-50 pointer-events-none">
                                <div className="border border-[#2B3139] bg-[#0B0E11] rounded p-4 w-32 h-24 flex flex-col items-center justify-center gap-2">
                                    <div className="h-2 w-16 bg-[#2B3139] rounded"></div>
                                    <div className="h-12 w-full bg-[#1E2329] rounded"></div>
                                </div>
                                <div className="border border-[#F0B90B] bg-[#1E2329] rounded p-4 w-40 h-32 flex flex-col items-center justify-center gap-2 shadow-[0_0_15px_rgba(240,185,11,0.1)] scale-110">
                                    <div className="h-3 w-20 bg-[#F0B90B]/50 rounded"></div>
                                    <div className="h-16 w-full bg-[#2B3139] rounded"></div>
                                    <div className="h-2 w-12 bg-[#2B3139] rounded"></div>
                                </div>
                                <div className="border border-[#2B3139] bg-[#0B0E11] rounded p-4 w-32 h-24 flex flex-col items-center justify-center gap-2">
                                    <div className="h-2 w-full bg-[#2B3139] rounded mb-1"></div>
                                    <div className="h-2 w-full bg-[#2B3139] rounded mb-1"></div>
                                    <div className="h-2 w-full bg-[#2B3139] rounded"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 bg-[#0B0E11] border border-[#2B3139] px-4 py-2 rounded-lg text-xs font-medium text-[#848E9C]">
                                Componente En Construcción
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
