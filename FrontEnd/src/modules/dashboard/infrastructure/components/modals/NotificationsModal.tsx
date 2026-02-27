
import {
    Bell,
    CheckCircle2,
    Info,
    Settings as Gear,
    TrendingDown,
    Gift
} from 'lucide-react';
import type { ViewType } from '../Sidebar';

interface NotificationsModalProps {
    isOpen: boolean;
    onNavigate: (view: ViewType) => void;
}

export const NotificationsModal = ({ isOpen, onNavigate }: NotificationsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[380px] bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.5)] z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Top Arrow */}
            <div className="absolute -top-[9px] right-3 w-4 h-4 bg-[#1E2329] border-t border-l border-[#2B3139] rotate-45" />

            {/* Header */}
            <div className="p-4 border-b border-[#2B3139] flex justify-between items-center bg-[#1E2329] rounded-t-xl relative z-10">
                <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-[18px]">Notificaciones</h3>
                    <span className="bg-[#F0B90B] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                        3 nuevas
                    </span>
                </div>
                <button className="text-[#848E9C] text-xs hover:text-[#F0B90B] transition-colors">
                    Marcar todas como leídas
                </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-[380px] overflow-y-auto p-2 custom-scrollbar space-y-2 relative z-10">

                {/* 1. Success (New) */}
                <div className="bg-[#2B3139] hover:bg-[#3A4149] rounded-lg p-3 flex gap-3 transition-colors cursor-pointer group relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-1.5 w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                    <div className="w-8 h-8 rounded-lg bg-[#02C076]/20 flex items-center justify-center shrink-0 ml-2">
                        <CheckCircle2 className="w-5 h-5 text-[#02C076]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-[13px] truncate">Backtesting completado</h4>
                        <p className="text-[#848E9C] text-[13px] leading-tight mt-0.5">Tu estrategia BTC/USDT ha finalizado con +12.5% de ganancia.</p>
                    </div>
                    <div className="text-[#848E9C] text-xs shrink-0 whitespace-nowrap mt-0.5">Hace 5 min</div>
                </div>

                {/* 2. Alert (New) */}
                <div className="bg-[#2B3139] hover:bg-[#3A4149] rounded-lg p-3 flex gap-3 transition-colors cursor-pointer group relative border-l-2 border-[#F0B90B] ml-[2px]">
                    <div className="absolute top-1/2 -translate-y-1/2 left-1 w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                    <div className="w-8 h-8 rounded-lg bg-[#F0B90B]/20 flex items-center justify-center shrink-0 ml-1">
                        <Bell className="w-5 h-5 text-[#F0B90B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-[13px] truncate">Límite de backtests</h4>
                        <p className="text-[#848E9C] text-[13px] leading-tight mt-0.5">Has usado 80% de tus backtests mensuales.</p>
                        <div className="w-full h-1 bg-[#1E2329] rounded-full mt-2 overflow-hidden">
                            <div className="w-[80%] h-full bg-[#F0B90B]" />
                        </div>
                    </div>
                    <div className="text-[#848E9C] text-xs shrink-0 whitespace-nowrap mt-0.5">Hace 2 h</div>
                </div>

                {/* 3. Info (New) */}
                <div className="bg-[#2B3139] hover:bg-[#3A4149] rounded-lg p-3 flex gap-3 transition-colors cursor-pointer group relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-1.5 w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                    <div className="w-8 h-8 rounded-lg bg-[#848E9C]/20 flex items-center justify-center shrink-0 ml-2">
                        <Info className="w-5 h-5 text-[#848E9C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-[13px] truncate">Nueva función</h4>
                        <p className="text-[#848E9C] text-[13px] leading-tight mt-0.5">Grid Trading ya está disponible para backtesting.</p>
                    </div>
                    <div className="text-[#848E9C] text-xs shrink-0 whitespace-nowrap mt-0.5">Hace 1 día</div>
                </div>

                {/* 4. System (Read) */}
                <div className="bg-[#2B3139] hover:bg-[#3A4149] rounded-lg p-3 flex gap-3 transition-colors cursor-pointer opacity-80 pl-4">
                    <div className="w-8 h-8 rounded-lg bg-[#3A4149] flex items-center justify-center shrink-0">
                        <Gear className="w-5 h-5 text-[#848E9C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-[13px] truncate">Mantenimiento programado</h4>
                        <p className="text-[#848E9C] text-[13px] leading-tight mt-0.5">Plataforma no disponible el 20/02 02:00-04:00.</p>
                    </div>
                    <div className="text-[#848E9C] text-xs shrink-0 whitespace-nowrap mt-0.5">15 feb</div>
                </div>

                {/* 5. Liquidation (Read - Urgent) */}
                <div className="bg-[#2B3139] hover:bg-[#3A4149] rounded-lg p-3 flex gap-3 transition-colors cursor-pointer opacity-80 pl-4">
                    <div className="flex flex-col items-center shrink-0 gap-1">
                        <div className="w-8 h-8 rounded-lg bg-[#F6465D]/20 flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-[#F6465D]" />
                        </div>
                        <span className="bg-[#F6465D] text-white text-[9px] font-bold px-1 rounded">Urgente</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-[13px] truncate">Posición liquidada</h4>
                        <p className="text-[#848E9C] text-[13px] leading-tight mt-0.5">AXSUSDT - Liquidación en 2.815.</p>
                    </div>
                    <div className="text-[#848E9C] text-xs shrink-0 whitespace-nowrap mt-0.5">Hace 2 días</div>
                </div>

                {/* 6. Promotion (Read) */}
                <div className="bg-[#2B3139] hover:bg-[#3A4149] rounded-lg p-3 flex gap-3 transition-colors cursor-pointer opacity-80 pl-4">
                    <div className="flex flex-col items-center shrink-0 gap-1">
                        <div className="w-8 h-8 rounded-lg bg-[#F0B90B]/20 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-[#F0B90B]" />
                        </div>
                        <span className="bg-[#F0B90B] text-black text-[9px] font-bold px-1 rounded">Oferta</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-[13px] truncate">Oferta especial</h4>
                        <p className="text-[#848E9C] text-[13px] leading-tight mt-0.5">Actualiza a Plan Anual y ahorra 20%.</p>
                    </div>
                    <div className="text-[#848E9C] text-xs shrink-0 whitespace-nowrap mt-0.5">Hace 3 días</div>
                </div>

            </div>

            {/* Footer */}
            <div className="border-t border-[#2B3139] p-3 text-center bg-[#1E2329] rounded-b-xl relative z-10">
                <button
                    onClick={() => onNavigate('notificaciones')}
                    className="text-[#F0B90B] text-sm font-medium hover:text-[#F0B90B]/80 transition-colors py-1 w-full"
                >
                    Ver todas las notificaciones
                </button>
            </div>
        </div>
    );
};
