
import { useState, useEffect } from 'react';
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
    const [userData, setUserData] = useState<any>(null);

    // Fetch user data when the modal is opened
    useEffect(() => {
        if (!isOpen) return;

        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch("http://localhost:8000/api/v1/users/me", {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                console.error("Error fetching user profile in modal:", error);
            }
        };

        fetchUserProfile();
    }, [isOpen]);

    if (!isOpen) return null;

    // Helper to get initials from full name
    const getInitials = (name?: string) => {
        if (!name) return '';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[320px] bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.5)] z-50 p-5 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Top Arrow */}
            <div className="absolute -top-[9px] right-[14px] w-4 h-4 bg-[#1E2329] border-t border-l border-[#2B3139] rotate-45" />

            {/* Header: User Info */}
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#2B3139] flex items-center justify-center shrink-0 overflow-hidden border border-[#3E454D] bg-cover bg-center">
                    {userData?.avatar ? (
                        <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        userData?.full_name ? (
                            <span className="text-white font-bold text-xl">{getInitials(userData.full_name)}</span>
                        ) : (
                            <User className="w-7 h-7 text-[#848E9C]" />
                        )
                    )}
                </div>
                <div>
                    <div className="flex flex-col">
                        <span className="text-[#848E9C] text-[10px] font-bold uppercase tracking-widest mb-0.5">Nombre completo</span>
                        <h3 className="text-white font-bold text-[17px] leading-tight">
                            {userData?.full_name || (userData ? 'Sin nombre' : 'Cargando...')}
                        </h3>
                    </div>
                    {/* Username removed as requested */}
                    <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="bg-[#F0B90B] text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-[3px] uppercase tracking-wider">
                            Plan {userData?.plan_rel?.name || 'Pro'}
                        </span>
                    </div>
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
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}
                    className="flex items-center gap-3 w-full py-2.5 px-2 rounded hover:bg-[#2B3139] text-[#F6465D] hover:brightness-110 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Cerrar sesión</span>
                </button>
            </div>
        </div>
    );
};
