import { Menu, Bell, Search } from 'lucide-react';
import type { ViewType } from './Sidebar';

interface TopHeaderProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
    activeView: ViewType;
}

const viewTitles: Record<ViewType, string> = {
    'dashboard': 'Dashboard',
    'simulador': 'Simulador',
    'historial': 'Historial',
};

const TopHeader = ({ isCollapsed, setIsCollapsed, activeView }: TopHeaderProps) => {
    return (
        <header className="h-[64px] bg-[#0B0E11] border-b border-[#1E2329] flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
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

                {/* Notifications */}
                <button className="relative p-2 text-[#848E9C] hover:text-white transition-colors">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#F0B90B] ring-2 ring-[#0B0E11]"></span>
                </button>

                {/* Avatar Alternative */}
                <button className="h-9 w-9 rounded-full bg-[#2B3139] flex items-center justify-center border border-[#3E454D] hover:border-[#F0B90B] transition-colors">
                    <span className="text-white font-medium text-xs">TR</span>
                </button>
            </div>
        </header>
    );
};

export default TopHeader;
