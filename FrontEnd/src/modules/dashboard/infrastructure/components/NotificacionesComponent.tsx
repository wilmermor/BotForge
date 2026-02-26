import React, { useState } from 'react';
import {
    CheckCircle2,
    Bell,
    TrendingDown,
    Info,
    Gift,
    XOctagon,
    Eye,
    Clock
} from 'lucide-react';
import { NotificationDetailModal } from './modals/NotificationDetailModal';

// Using a type alias to help strictly define different notification forms
export type NotificationType = 'success' | 'urgent' | 'alert' | 'info' | 'promo' | 'error';
export type NotificationCategory = 'Todas' | 'Bots' | 'Posiciones' | 'Sistema' | 'Alertas';

export interface NotificationDetails {
    statusDisplay?: string;
    duration?: string;
    trades?: number;
    profitStr?: string;
    winRate?: string;
    buyCount?: number;
    sellCount?: number;
    maxWin?: string;
    maxLoss?: string;

    pair?: string;
    direction?: string;
    entry?: string;
    exit?: string;
    qty?: string;
    pnl?: string;
    margin?: string;
    leverage?: string;
}

export interface NotificationItem {
    id: string;
    type: NotificationType;
    category: NotificationCategory;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    tags: Array<{ label: string; color: 'gray' | 'green' | 'red' | 'yellow' | 'blue' }>;
    // Specialized data needed for detail modal context
    details?: NotificationDetails;
}

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
    {
        id: 'NOT-2026-001',
        type: 'success',
        category: 'Bots',
        title: 'Bot Grid ETH/USDT finalizado con éxito',
        message: 'El bot completó 234 operaciones en 3 días. Profit total: +$567.80 (8.3%)',
        time: 'Hace 15 minutos',
        isRead: false,
        tags: [
            { label: 'Bot: Grid Pro', color: 'gray' },
            { label: 'ETH/USDT', color: 'gray' },
            { label: '+8.3%', color: 'green' }
        ],
        details: {
            statusDisplay: 'Completado con éxito',
            duration: '3 días 4 horas',
            trades: 234,
            profitStr: '+$567.80 (8.3%)',
            winRate: '68.4%',
            buyCount: 112,
            sellCount: 122,
            maxWin: '+$45.20',
            maxLoss: '-$12.30'
        }
    },
    {
        id: 'NOT-2026-002',
        type: 'urgent',
        category: 'Posiciones',
        title: '⚠️ Posición liquidada - AXS/USDT',
        message: 'La posición long de 18,200 USDT fue liquidada en $2.815. Pérdida: -$1,245.00',
        time: 'Hace 32 minutos',
        isRead: false,
        tags: [
            { label: 'Posición', color: 'gray' },
            { label: 'AXS/USDT', color: 'gray' },
            { label: '-$1,245', color: 'red' }
        ],
        details: {
            statusDisplay: 'Liquidado',
            pair: 'AXS/USDT',
            direction: 'Long',
            entry: '$2.627',
            exit: '$2.815',
            qty: '18,200 USDT',
            pnl: '-$1,245.00',
            margin: '$1,300.0',
            leverage: '14X'
        }
    },
    {
        id: 'NOT-2026-003',
        type: 'alert',
        category: 'Sistema',
        title: 'Límite de backtests mensual alcanzado 80%',
        message: 'Has usado 80 de 100 backtests disponibles. Actualiza tu plan para más capacidad.',
        time: 'Hace 2 horas',
        isRead: false,
        tags: [
            { label: 'Sistema', color: 'gray' },
            { label: 'Límite', color: 'gray' },
            { label: '80%', color: 'yellow' }
        ]
    },
    {
        id: 'NOT-2026-004',
        type: 'info',
        category: 'Bots',
        title: 'Bot SOL/USDT en pausa por volatilidad',
        message: 'El bot ha detenido operaciones debido a alta volatilidad. Se reanudará automáticamente en 30 min.',
        time: 'Hace 5 horas',
        isRead: true,
        tags: [
            { label: 'Bot', color: 'gray' },
            { label: 'SOL/USDT', color: 'gray' },
            { label: 'Pausado', color: 'blue' }
        ]
    },
    {
        id: 'NOT-2026-005',
        type: 'promo',
        category: 'Sistema',
        title: '✨ Nueva función: Trading con apalancamiento',
        message: 'Ahora puedes configurar bots con hasta 20X de apalancamiento en pares seleccionados.',
        time: 'Ayer',
        isRead: false,
        tags: [
            { label: 'Novedad', color: 'yellow' },
            { label: 'Actualización', color: 'yellow' }
        ]
    },
    {
        id: 'NOT-2026-006',
        type: 'error',
        category: 'Bots',
        title: 'Error en ejecución de bot BTC/USDT',
        message: 'El bot experimentó un error de conexión con el exchange. Revisa tu configuración de API.',
        time: 'Ayer',
        isRead: true,
        tags: [
            { label: 'Error', color: 'red' },
            { label: 'API', color: 'gray' },
            { label: 'Crítico', color: 'red' }
        ]
    }
];

const NotificacionesComponent = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>(DUMMY_NOTIFICATIONS);
    const [activeTab, setActiveTab] = useState<NotificationCategory>('Todas');
    const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

    const tabs: NotificationCategory[] = ['Todas', 'Bots', 'Posiciones', 'Sistema', 'Alertas'];

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const filteredNotifications = notifications.filter(n => {
        if (activeTab === 'Todas') return true;
        if (activeTab === 'Bots') return n.category === 'Bots';
        if (activeTab === 'Posiciones') return n.category === 'Posiciones';
        if (activeTab === 'Sistema') return n.category === 'Sistema' && n.type !== 'alert';
        if (activeTab === 'Alertas') return n.type === 'alert' || n.category === 'Alertas';
        return true;
    });

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const handleMarkRead = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

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

    return (
        <div className="w-full h-full pb-12">
            <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-[28px] font-bold text-white leading-tight mb-1">Centro de Notificaciones</h2>
                        <p className="text-[#848E9C] text-sm">Historial completo de actividad, alertas y estados de tus bots</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-[#2B3139] text-[#848E9C] text-sm font-medium px-3 py-1.5 rounded-lg border border-[#3E454D]">
                            {notifications.length} notificaciones
                        </span>
                        {unreadCount > 0 && (
                            <span className="bg-[#F0B90B] text-black text-sm font-bold px-3 py-1.5 rounded-lg">
                                {unreadCount} no leídas
                            </span>
                        )}
                        <button
                            onClick={handleMarkAllRead}
                            className="text-[#F0B90B] text-sm font-medium hover:underline transition-all hidden sm:block ml-2"
                        >
                            Marcar todas como leídas
                        </button>
                    </div>
                </div>

                {/* Quick Filters (Tabs) */}
                <div className="flex items-center gap-6 border-b border-[#2B3139] overflow-x-auto custom-scrollbar pb-px">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-[#F0B90B]' : 'text-[#848E9C] hover:text-white'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F0B90B]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="flex flex-col gap-3">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-12 flex flex-col items-center justify-center text-center mt-4">
                            <div className="w-16 h-16 bg-[#2B3139] rounded-full flex items-center justify-center mb-4">
                                <Bell className="w-8 h-8 text-[#848E9C]" />
                            </div>
                            <h3 className="text-white text-lg font-bold">No hay notificaciones</h3>
                            <p className="text-[#848E9C] mt-2 max-w-sm">Las alertas de tus bots y posiciones aparecerán aquí cuando estén disponibles.</p>
                        </div>
                    ) : (
                        filteredNotifications.map(notification => {
                            const styles = getTypeStyles(notification.type);
                            const ActionIcon = styles.Icon;

                            return (
                                <div
                                    key={notification.id}
                                    onClick={() => setSelectedNotification(notification)}
                                    className={`bg-[#1E2329] border-l-4 ${styles.border} border-t border-r border-b border-[#2B3139] rounded-xl p-4 flex gap-4 transition-colors hover:bg-[#2B3139] cursor-pointer group relative`}
                                >
                                    {/* Area 1: Icon & Unread State */}
                                    <div className="relative shrink-0">
                                        <div className={`w-10 h-10 rounded-full bg-[#2B3139] flex items-center justify-center`}>
                                            <ActionIcon className={`w-5 h-5 ${styles.iconColor}`} />
                                        </div>
                                        {!notification.isRead && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F0B90B] border-2 border-[#1E2329]" />
                                        )}
                                    </div>

                                    {/* Area 2: Main Content */}
                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-start justify-between gap-4 mb-1">
                                            <h3 className="text-white font-bold text-base truncate">{notification.title}</h3>

                                            {/* Area 3: Time (Desktop placement) */}
                                            <div className="hidden sm:flex items-center gap-1.5 text-[#848E9C] text-sm shrink-0">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{notification.time}</span>
                                            </div>
                                        </div>

                                        <p className="text-[#848E9C] text-sm leading-relaxed mb-3 pr-2">
                                            {notification.message}
                                        </p>

                                        {/* Progress bar injected for limit alerts */}
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

                                    {/* Area 4/5: Quick Actions & Priority */}
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
                                                    onClick={(e) => handleMarkRead(e, notification.id)}
                                                    className="w-8 h-8 rounded-lg bg-[#2B3139] hover:bg-[#F0B90B] hover:text-black text-[#848E9C] flex items-center justify-center transition-colors"
                                                    title="Marcar como leída"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
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
                        })
                    )}
                </div>

                {filteredNotifications.length > 0 && (
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-[#848E9C] text-sm mb-4">Mostrando {filteredNotifications.length} de {notifications.length} notificaciones</span>
                        <button className="bg-[#1E2329] border border-[#2B3139] text-white hover:text-[#F0B90B] hover:border-[#F0B90B] transition-colors rounded-lg px-6 py-2.5 text-sm font-medium">
                            Cargar más
                        </button>
                    </div>
                )}
            </div>

            {/* Global Modal Overlay */}
            <NotificationDetailModal
                isOpen={!!selectedNotification}
                onClose={() => setSelectedNotification(null)}
                notification={selectedNotification}
            />
        </div>
    );
};

export default NotificacionesComponent;
