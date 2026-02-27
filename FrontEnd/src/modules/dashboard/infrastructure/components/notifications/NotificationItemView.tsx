import {
    CheckCircle2,
    TrendingDown,
    Bell,
    Info,
    Gift,
    XOctagon,
    Clock,
    CheckCircle2 as CheckIcon,
    Eye
} from 'lucide-react';
import type { NotificationItem, NotificationType } from '../NotificacionesComponent';

interface NotificationItemViewProps {
    notification: NotificationItem;
    onSelect: (n: NotificationItem) => void;
    onMarkRead: (id: string) => void;
}

const getTypeStyles = (type: NotificationType) => {
    switch (type) {
        case 'success': return { border: 'border-l-[#02C076]', iconBg: 'bg-[#02C076]/20', iconColor: 'text-[#02C076]', Icon: CheckCircle2 };
        case 'urgent': return { border: 'border-l-[#F6465D]', iconBg: 'bg-[#F6465D]/20', iconColor: 'text-[#F6465D]', Icon: TrendingDown };
        case 'alert': return { border: 'border-l-[#F0B90B]', iconBg: 'bg-[#F0B90B]/20', iconColor: 'text-[#F0B90B]', Icon: Bell };
        case 'info': return { border: 'border-l-[#3B82F6]', iconBg: 'bg-[#3B82F6]/20', iconColor: 'text-[#3B82F6]', Icon: Info };
        case 'promo': return { border: 'border-l-[#F0B90B]', iconBg: 'bg-[#F0B90B]/20', iconColor: 'text-[#F0B90B]', Icon: Gift };
        case 'error': return { border: 'border-l-[#F6465D]', iconBg: 'bg-[#F6465D]/20', iconColor: 'text-[#F6465D]', Icon: XOctagon };
    }
};

const getTagStyles = (color: string) => {
    switch (color) {
        case 'green': return 'bg-[#02C076]/20 text-[#02C076]';
        case 'red': return 'bg-[#F6465D]/20 text-[#F6465D]';
        case 'yellow': return 'bg-[#F0B90B]/20 text-[#F0B90B]';
        case 'blue': return 'bg-[#3B82F6]/20 text-[#3B82F6]';
        default: return 'bg-[#2B3139] text-[#848E9C]';
    }
};

const NotificationItemView = ({ notification, onSelect, onMarkRead }: NotificationItemViewProps) => {
    const styles = getTypeStyles(notification.type);
    const ActionIcon = styles.Icon;

    return (
        <div
            onClick={() => onSelect(notification)}
            className={`bg-[#1E2329] border-l-4 ${styles.border} border-t border-r border-b border-[#2B3139] rounded-xl p-4 flex gap-4 transition-colors hover:bg-[#2B3139] cursor-pointer group relative`}
        >
            <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#2B3139] flex items-center justify-center">
                    <ActionIcon className={`w-5 h-5 ${styles.iconColor}`} />
                </div>
                {!notification.isRead && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F0B90B] border-2 border-[#1E2329]" />
                )}
            </div>

            <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="text-white font-bold text-base truncate">{notification.title}</h3>
                    <div className="hidden sm:flex items-center gap-1.5 text-[#848E9C] text-sm shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{notification.time}</span>
                    </div>
                </div>

                <p className="text-[#848E9C] text-sm leading-relaxed mb-3 pr-2">
                    {notification.message}
                </p>

                {notification.type === 'alert' && notification.title.includes('80%') && (
                    <div className="w-full max-w-sm h-1.5 bg-[#0B0E11] rounded-full mb-3 overflow-hidden">
                        <div className="w-[80%] h-full bg-[#F0B90B]" />
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-2">
                    {notification.tags.map((tag, i) => (
                        <span key={i} className={`text-xs font-bold px-2 py-0.5 rounded ${getTagStyles(tag.color)}`}>
                            {tag.label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-end justify-between shrink-0 ml-auto">
                {notification.type === 'urgent' && (
                    <span className="bg-[#F6465D]/20 text-[#F6465D] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#F6465D]/30 uppercase tracking-wider">
                        Alta
                    </span>
                )}
                {notification.type === 'alert' && (
                    <span className="bg-[#F0B90B]/20 text-[#F0B90B] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#F0B90B]/30 uppercase tracking-wider">
                        Media
                    </span>
                )}

                <div className="mt-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.isRead && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onMarkRead(notification.id);
                            }}
                            className="w-8 h-8 rounded-lg bg-[#2B3139] hover:bg-[#F0B90B] hover:text-black text-[#848E9C] flex items-center justify-center transition-colors"
                            title="Marcar como leída"
                        >
                            <CheckIcon className="w-4 h-4" />
                        </button>
                    )}
                    <button className="h-8 px-3 rounded-lg bg-[#2B3139] hover:bg-[#F0B90B] hover:text-black text-[#848E9C] flex items-center gap-2 transition-colors text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        <span className="hidden md:inline">Ver detalles</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationItemView;
