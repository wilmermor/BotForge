
import {
    Bell,
    CheckCircle2,
    Info,
    TrendingDown,
    Gift,
    XOctagon
} from 'lucide-react';
import type { ViewType } from '../Sidebar';
import type { NotificationItem, NotificationType } from '../NotificacionesComponent';

interface NotificationsModalProps {
    isOpen: boolean;
    onNavigate: (view: ViewType) => void;
    notifications: NotificationItem[];
    unreadCount: number;
    onMarkAllRead: () => void;
}

const getTypeStyles = (type: NotificationType) => {
    switch (type) {
        case 'success': return { iconBg: 'bg-[#02C076]/20', iconColor: 'text-[#02C076]', Icon: CheckCircle2 };
        case 'urgent': return { iconBg: 'bg-[#F6465D]/20', iconColor: 'text-[#F6465D]', Icon: TrendingDown };
        case 'alert': return { iconBg: 'bg-[#F0B90B]/20', iconColor: 'text-[#F0B90B]', Icon: Bell };
        case 'info': return { iconBg: 'bg-[#3B82F6]/20', iconColor: 'text-[#3B82F6]', Icon: Info };
        case 'promo': return { iconBg: 'bg-[#F0B90B]/20', iconColor: 'text-[#F0B90B]', Icon: Gift };
        case 'error': return { iconBg: 'bg-[#F6465D]/20', iconColor: 'text-[#F6465D]', Icon: XOctagon };
        default: return { iconBg: 'bg-[#848E9C]/20', iconColor: 'text-[#848E9C]', Icon: Bell };
    }
};

export const NotificationsModal = ({ isOpen, onNavigate, notifications, unreadCount, onMarkAllRead }: NotificationsModalProps) => {
    if (!isOpen) return null;

    // Show only the latest 10 notifications in the modal
    const displayNotifications = notifications.slice(0, 10);

    return (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[380px] bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.5)] z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Top Arrow */}
            <div className="absolute -top-[9px] right-3 w-4 h-4 bg-[#1E2329] border-t border-l border-[#2B3139] rotate-45" />

            {/* Header */}
            <div className="p-4 border-b border-[#2B3139] flex justify-between items-center bg-[#1E2329] rounded-t-xl relative z-10">
                <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-[18px]">Notificaciones</h3>
                    {unreadCount > 0 && (
                        <span className="bg-[#F0B90B] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                            {unreadCount} nuevas
                        </span>
                    )}
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={onMarkAllRead}
                        className="text-[#848E9C] text-xs hover:text-[#F0B90B] transition-colors"
                    >
                        Marcar todas como leídas
                    </button>
                )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[380px] overflow-y-auto p-2 custom-scrollbar space-y-2 relative z-10">
                {notifications.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                        <div className="w-12 h-12 bg-[#2B3139] rounded-full flex items-center justify-center mb-3">
                            <Bell className="w-6 h-6 text-[#848E9C]" />
                        </div>
                        <p className="text-white font-medium text-sm">No tienes notificaciones</p>
                        <p className="text-[#848E9C] text-xs mt-1">Te avisaremos cuando haya actividad importante.</p>
                    </div>
                ) : (
                    displayNotifications.map((n) => {
                        const styles = getTypeStyles(n.type);
                        const Icon = styles.Icon;

                        return (
                            <div
                                key={n.id}
                                onClick={() => {
                                    onNavigate('notificaciones');
                                    // Optionally select the notification in the main view logic if needed
                                }}
                                className={`bg-[#2B3139] hover:bg-[#3A4149] rounded-lg p-3 flex gap-3 transition-colors cursor-pointer group relative ${!n.isRead ? 'border-l-2 border-[#F0B90B] ml-[2px]' : 'pl-4'}`}
                            >
                                {!n.isRead && (
                                    <div className="absolute top-1/2 -translate-y-1/2 left-1 w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                                )}
                                <div className={`w-8 h-8 rounded-lg ${styles.iconBg} flex items-center justify-center shrink-0 ${!n.isRead ? 'ml-1' : ''}`}>
                                    <Icon className={`w-5 h-5 ${styles.iconColor}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-bold text-[13px] truncate">{n.title}</h4>
                                    <p className="text-[#848E9C] text-[13px] leading-tight mt-0.5">{n.message}</p>

                                    {/* Progress bar for specific alerts if needed, or other details */}
                                    {n.type === 'alert' && n.title.includes('80%') && (
                                        <div className="w-full h-1 bg-[#1E2329] rounded-full mt-2 overflow-hidden">
                                            <div className="w-[80%] h-full bg-[#F0B90B]" />
                                        </div>
                                    )}
                                </div>
                                <div className="text-[#848E9C] text-xs shrink-0 whitespace-nowrap mt-0.5">{n.time}</div>
                            </div>
                        );
                    })
                )}
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

