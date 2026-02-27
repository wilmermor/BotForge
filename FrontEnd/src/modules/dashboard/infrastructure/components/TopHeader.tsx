import { useState, useRef, useEffect } from 'react';
import { Menu, Search } from 'lucide-react';
import type { ViewType } from './Sidebar';
import { NotificationsModal } from './modals/NotificationsModal';
import { ProfileModal } from './modals/ProfileModal';

interface TopHeaderProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
    activeView: ViewType;
    onNavigate: (view: ViewType, configTab?: 'perfil' | 'seguridad' | 'suscripcion') => void;
}

const viewTitles: Record<ViewType, string> = {
    'dashboard': 'Dashboard',
    'simulador': 'Simulador',
    'historial': 'Historial',
    'notificaciones': 'Notificaciones',
    'configuracion': 'Configuración',
    'soporte': 'Soporte',
};

const TopHeader = ({ isCollapsed, setIsCollapsed, activeView, onNavigate }: TopHeaderProps) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    // Close modals when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsNotificationsOpen(false);
    };

    const toggleNotifications = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        setIsProfileOpen(false);
    };

    const handleNavigate = (view: ViewType, configTab?: 'perfil' | 'seguridad' | 'suscripcion') => {
        onNavigate(view, configTab);
        setIsProfileOpen(false);
    };

    return (
        <header className="h-[64px] bg-[#0B0E11] border-b border-[#1E2329] flex items-center justify-between px-6 shrink-0 z-50 sticky top-0">
            {/* Left side: Menu toggle & Title */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-[#848E9C] hover:text-[#F0B90B] transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-white text-[20px] font-semibold leading-none tracking-tight capitalize">
                    {viewTitles[activeView]}
                </h1>
            </div>

            {/* Right side: Search, Notifications, Avatar */}
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="hidden md:flex relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#848E9C]" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-[#1E2329] border border-[#2B3139] text-white text-[13px] rounded-lg pl-9 pr-4 py-2 w-[220px] focus:outline-none focus:border-[#F0B90B] transition-colors placeholder:text-[#848E9C]"
                    />
                </div>

                {/* Notifications Dropdown Container */}
                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={toggleNotifications}
                        className={`relative p-2 transition-colors rounded-full flex items-center justify-center h-10 w-10 ${isNotificationsOpen ? 'text-white bg-[#1E2329]' : 'text-[#848E9C] hover:text-white'}`}
                    >
                        {/* We use an embedded Bell icon for explicit triggering area size */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#F0B90B] ring-2 ring-[#0B0E11]"></span>
                    </button>
                    <NotificationsModal isOpen={isNotificationsOpen} onNavigate={onNavigate} />
                </div>

                {/* Profile Dropdown Container */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={toggleProfile}
                        className={`h-9 w-9 rounded-full bg-[#2B3139] flex items-center justify-center border transition-colors ${isProfileOpen ? 'border-[#F0B90B]' : 'border-[#3E454D] hover:border-[#F0B90B]'}`}
                    >
                        <span className="text-white font-medium text-xs">JD</span>
                    </button>

                    <ProfileModal isOpen={isProfileOpen} onNavigate={handleNavigate} />
                </div>
            </div>

        </header>
    );
};

export default TopHeader;
