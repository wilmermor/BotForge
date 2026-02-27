
import { useNavigate } from 'react-router-dom';
import {
    User,
    Settings,
    CreditCard,
    LogOut
} from 'lucide-react';
import type { ViewType } from '../Sidebar';

interface ProfileModalProps {
    isOpen: boolean;
    onNavigate: (view: ViewType, configTab?: 'perfil' | 'seguridad' | 'suscripcion') => void;
}

export const ProfileModal = ({ isOpen, onNavigate }: ProfileModalProps) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[320px] bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.5)] z-50 p-5 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Top Arrow */}
            <div className="absolute -top-[9px] right-[14px] w-4 h-4 bg-[#1E2329] border-t border-l border-[#2B3139] rotate-45" />

            {/* Header: User Info */}
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#2B3139] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xl">JD</span>
                </div>
                <div>
                    <h3 className="text-white font-bold text-[18px] leading-tight">Juan Díaz</h3>
                    <p className="text-[#848E9C] text-sm mb-1">@juandiaz</p>
                    <span className="bg-[#F0B90B] text-black text-xs font-bold px-2 py-0.5 rounded-sm">
                        Plan Pro
                    </span>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 bg-[#2B3139] rounded-lg p-3 mt-5 relative z-10">
                <div className="text-center">
                    <div className="text-white font-bold text-lg leading-none">24</div>
                    <div className="text-[#848E9C] text-xs mt-1">Backtests</div>
                </div>
                <div className="text-center border-l border-r border-[#1E2329]">
                    <div className="text-white font-bold text-lg leading-none">156</div>
                    <div className="text-[#848E9C] text-xs mt-1">Trades</div>
                </div>
                <div className="text-center">
                    <div className="text-[#02C076] font-bold text-lg leading-none">68%</div>
                    <div className="text-[#848E9C] text-xs mt-1">Win Rate</div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="mt-4 mb-2 relative z-10">
                <div className="h-[1px] bg-[#2B3139] mb-2" />
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => onNavigate('configuracion', 'perfil')}
                        className="flex items-center gap-3 w-full py-2.5 px-2 rounded hover:bg-[#2B3139] text-white hover:text-[#F0B90B] transition-colors group"
                    >
                        <User className="w-4 h-4 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                        <span className="text-sm font-medium">Mi Perfil</span>
                    </button>
                    <button
                        onClick={() => onNavigate('configuracion', 'seguridad')}
                        className="flex items-center gap-3 w-full py-2.5 px-2 rounded hover:bg-[#2B3139] text-white hover:text-[#F0B90B] transition-colors group"
                    >
                        <Settings className="w-4 h-4 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                        <span className="text-sm font-medium">Configuración de la cuenta</span>
                    </button>
                    <button
                        onClick={() => onNavigate('configuracion', 'suscripcion')}
                        className="flex items-center gap-3 w-full py-2.5 px-2 rounded hover:bg-[#2B3139] text-white hover:text-[#F0B90B] transition-colors group"
                    >
                        <CreditCard className="w-4 h-4 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                        <span className="text-sm font-medium">Suscripción y facturación</span>
                    </button>
                </div>
            </div>

            {/* Footer: Logout */}
            <div className="relative z-10">
                <div className="h-[1px] bg-[#2B3139] mb-2" />
                <button onClick={() => navigate('/login')} className="flex items-center gap-3 w-full py-2.5 px-2 rounded hover:bg-[#2B3139] text-[#F6465D] hover:brightness-110 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Cerrar sesión</span>
                </button>
            </div>
        </div>
    );
};
