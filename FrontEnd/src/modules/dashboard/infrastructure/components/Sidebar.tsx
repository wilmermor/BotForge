import { useState } from 'react';
import { BarChart2, LayoutGrid, Clock, Settings, MessageSquare, LogOut, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LogoutConfirmModal } from './modals/LogoutConfirmModal';

export type ViewType = 'dashboard' | 'simulador' | 'historial' | 'notificaciones' | 'configuracion' | 'soporte';

interface SidebarProps {
    isCollapsed: boolean;
    activeView: ViewType;
    setActiveView: (view: ViewType) => void;
}

const Sidebar = ({ isCollapsed, activeView, setActiveView }: SidebarProps) => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const menuItems = [
        { id: 'dashboard' as ViewType, name: 'Dashboard', icon: LayoutGrid },
        { id: 'simulador' as ViewType, name: 'Simulador', icon: BarChart2 },
        { id: 'historial' as ViewType, name: 'Historial', icon: Clock },
        { id: 'notificaciones' as ViewType, name: 'Notificaciones', icon: Bell},
    ];

    const systemItems = [
        { id: 'configuracion' as ViewType, name: 'Configuración', icon: Settings },
        { id: 'soporte' as ViewType, name: 'Soporte', icon: MessageSquare },
    ];

    const handleLogout = () => {
        setShowLogoutModal(false);
        localStorage.removeItem('token');
        navigate('/');
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
                    <img
                        src="/ISOTIPO4.svg"
                        alt="BotForge Logo"
                        className="h-14 w-auto t-[#F0B90B]"
                    />

                    {!isCollapsed && (
                        <span className="font-extrabold tracking-widest text-xl font-[Inter] transition-colors duration-500 text-[#F0B90B]">
                            BOTFORGE
                        </span>
                    )}
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
                                        <div className="flex items-center justify-between w-full ml-4">
                                            <span className={`text-[14px] font-medium whitespace-nowrap overflow-hidden ${isActive ? 'text-[#F0B90B]' : 'text-white'}`}>
                                                {item.name}
                                            </span>
                                        </div>
                                    )}

                                    {/* Tooltip for collapsed state */}
                                    {isCollapsed && (
                                        <div className="absolute left-16 hidden group-hover:block bg-[#1E2329] text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap z-50 border border-[#2B3139] shadow-lg flex items-center gap-2">
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
                        {systemItems.map((item) => {
                            const isActive = activeView === item.id;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveView(item.id)}
                                    className={`
                                        group relative flex items-center py-3 w-full transition-colors
                                        ${isActive ? 'bg-[#2B3139]' : 'text-[#848E9C] hover:bg-[#2B3139] hover:text-white'}
                                        ${isCollapsed ? 'justify-center px-0' : 'px-6'}
                                    `}
                                >
                                    {/* Active Left Border indicator */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#F0B90B] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                                    <Icon className={`h-6 w-6 shrink-0 transition-colors ${isActive ? 'text-[#F0B90B]' : 'group-hover:text-white'}`} />

                                    {!isCollapsed && (
                                        <span className={`ml-4 text-[14px] font-medium whitespace-nowrap overflow-hidden ${isActive ? 'text-[#F0B90B]' : ''}`}>
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
            </div>

            {/* Footer Actions */}
            <div className="py-4 px-6 border-t border-[#1E2329] shrink-0">
                <button
                    onClick={() => setShowLogoutModal(true)}
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
            {/* Logout Confirm Modal */}
            <LogoutConfirmModal
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </aside>
    );
};

export default Sidebar;
