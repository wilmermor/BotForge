import { BarChart2, LayoutGrid, Clock, Settings, MessageSquare, LogOut, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export type ViewType = 'dashboard' | 'simulador' | 'historial';

interface SidebarProps {
    isCollapsed: boolean;
    activeView: ViewType;
    setActiveView: (view: ViewType) => void;
}

const Sidebar = ({ isCollapsed, activeView, setActiveView }: SidebarProps) => {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'dashboard' as ViewType, name: 'Dashboard', icon: LayoutGrid },
        { id: 'simulador' as ViewType, name: 'Simulador', icon: BarChart2 },
        { id: 'historial' as ViewType, name: 'Historial', icon: Clock },
    ];

    const handleLogout = () => {
        // Simple redirect for now
        navigate('/login');
    };

    return (
        <aside
            className={`
                flex flex-col h-full bg-[#0B0E11] border-r border-[#1E2329] transition-all duration-300 z-20 shrink-0
                ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}
            `}
        >
            {/* Header: Logo */}
            <div className={`pt-6 pb-4 px-6 flex items-center shrink-0 ${isCollapsed ? 'justify-center px-0' : ''}`}>
                <div className="flex items-center gap-3">
                    <div className="text-[#F0B90B]">
                        <BarChart2 className="h-8 w-8 stroke-[2.5px]" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-white text-[18px] font-semibold tracking-wide whitespace-nowrap overflow-hidden">
                            BacktestPro
                        </span>
                    )}
                </div>
            </div>

            {/* User Profile Card */}
            <div className={`mb-6 transition-all ${isCollapsed ? 'px-2' : 'px-6'}`}>
                <div className={`
                    bg-[#1E2329] rounded-lg flex items-center 
                    ${isCollapsed ? 'p-2 justify-center' : 'p-3'}
                `}>
                    <div className="h-10 w-10 bg-[#2B3139] rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-white font-medium text-sm">TR</span>
                    </div>
                    {!isCollapsed && (
                        <div className="ml-3 flex-1 overflow-hidden">
                            <div className="text-white text-sm font-medium truncate">Trader</div>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="bg-[#F0B90B] text-black text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">PLAN PRO</span>
                            </div>
                        </div>
                    )}
                    {!isCollapsed && <ChevronDown className="h-4 w-4 text-[#848E9C] shrink-0" />}
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto w-full">
                <div className="mb-6">
                    {!isCollapsed && (
                        <h3 className="text-[#848E9C] text-[12px] font-medium px-6 mb-2">
                            MENÚ
                        </h3>
                    )}
                    <nav className="flex flex-col">
                        {menuItems.map((item) => {
                            const isActive = activeView === item.id;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveView(item.id)}
                                    className={`
                                        group relative flex items-center py-3 w-full transition-colors
                                        ${isActive ? 'bg-[#2B3139]' : 'hover:bg-[#2B3139]'}
                                        ${isCollapsed ? 'justify-center px-0' : 'px-6'}
                                    `}
                                >
                                    {/* Active Left Border indicator */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#F0B90B] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                                    <Icon className={`h-6 w-6 shrink-0 transition-colors ${isActive ? 'text-[#F0B90B]' : 'text-[#848E9C]'}`} />

                                    {!isCollapsed && (
                                        <span className={`ml-4 text-[14px] font-medium whitespace-nowrap overflow-hidden ${isActive ? 'text-[#F0B90B]' : 'text-white'}`}>
                                            {item.name}
                                        </span>
                                    )}

                                    {/* Tooltip for collapsed state */}
                                    {isCollapsed && (
                                        <div className="absolute left-16 hidden group-hover:block bg-[#1E2329] text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap z-50 border border-[#2B3139] shadow-lg">
                                            {item.name}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Secondary Menu */}
                <div className="mb-4">
                    {!isCollapsed && (
                        <h3 className="text-[#848E9C] text-[12px] font-medium px-6 mb-2">
                            SISTEMA
                        </h3>
                    )}
                    <nav className="flex flex-col">
                        <button className={`
                            group relative flex items-center py-3 w-full text-[#848E9C] hover:bg-[#2B3139] hover:text-white transition-colors
                            ${isCollapsed ? 'justify-center px-0' : 'px-6'}
                        `}>
                            <Settings className="h-6 w-6 shrink-0 transition-colors group-hover:text-white" />
                            {!isCollapsed && <span className="ml-4 text-[14px] font-medium whitespace-nowrap">Configuración</span>}
                            {isCollapsed && <div className="absolute left-16 hidden group-hover:block bg-[#1E2329] text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap z-50 border border-[#2B3139] shadow-lg">Configuración</div>}
                        </button>
                        <button className={`
                            group relative flex items-center py-3 w-full text-[#848E9C] hover:bg-[#2B3139] hover:text-white transition-colors
                            ${isCollapsed ? 'justify-center px-0' : 'px-6'}
                        `}>
                            <MessageSquare className="h-6 w-6 shrink-0 transition-colors group-hover:text-white" />
                            {!isCollapsed && <span className="ml-4 text-[14px] font-medium whitespace-nowrap">Soporte</span>}
                            {isCollapsed && <div className="absolute left-16 hidden group-hover:block bg-[#1E2329] text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap z-50 border border-[#2B3139] shadow-lg">Soporte</div>}
                        </button>
                    </nav>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="py-4 px-6 border-t border-[#1E2329] shrink-0">
                <button
                    onClick={handleLogout}
                    className={`
                        flex items-center w-full text-[#F6465D]/80 hover:text-[#F6465D] transition-colors group relative
                        ${isCollapsed ? 'justify-center px-0' : ''}
                    `}
                >
                    <LogOut className="h-6 w-6 shrink-0" />
                    {!isCollapsed && <span className="ml-4 text-[14px] font-medium whitespace-nowrap">Cerrar sesión</span>}
                    {isCollapsed && (
                        <div className="absolute left-16 hidden group-hover:block bg-[#1E2329] text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap z-50 border border-[#2B3139] shadow-lg">Cerrar sesión</div>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
