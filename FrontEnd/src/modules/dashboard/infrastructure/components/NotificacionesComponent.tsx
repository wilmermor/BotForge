import { Loader2, WifiOff } from 'lucide-react';
import NotificationsHeader from './notifications/NotificationsHeader';
import NotificationsList from './notifications/NotificationsList';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationDetailModal } from './modals/NotificationDetailModal';

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
    createdAt: string;
    isRead: boolean;
    tags: Array<{ label: string; color: 'gray' | 'green' | 'red' | 'yellow' | 'blue' }>;
    details?: NotificationDetails;
}

const NotificacionesComponent = () => {
    const {
        notifications,
        unreadCount,
        filteredNotifications,
        activeTab,
        setActiveTab,
        selectedNotification,
        setSelectedNotification,
        handleMarkAllRead,
        handleMarkRead,
        isLoading,
        error,
        reload,
    } = useNotifications();

    return (
        <div className="w-full h-full pb-12">
            <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in">
                <NotificationsHeader
                    totalCount={notifications.length}
                    unreadCount={unreadCount}
                    onMarkAllRead={handleMarkAllRead}
                />

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 text-[#F0B90B] animate-spin" />
                        <p className="text-[#848E9C] text-sm">Cargando notificaciones...</p>
                    </div>
                ) : error ? (
                    <div className="bg-[#1E2329] border border-[#F6465D]/30 rounded-xl p-10 flex flex-col items-center gap-4">
                        <WifiOff className="w-10 h-10 text-[#F6465D]" />
                        <p className="text-white font-medium">Error al cargar notificaciones</p>
                        <p className="text-[#848E9C] text-sm text-center">{error}</p>
                        <button
                            onClick={reload}
                            className="mt-2 px-5 py-2 bg-[#2B3139] hover:bg-[#363c46] text-white text-sm rounded-lg transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                ) : (
                    <NotificationsList
                        notifications={filteredNotifications}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onSelect={setSelectedNotification}
                        onMarkRead={handleMarkRead}
                        totalCount={notifications.length}
                    />
                )}
            </div>

            <NotificationDetailModal
                isOpen={!!selectedNotification}
                onClose={() => setSelectedNotification(null)}
                notification={selectedNotification}
            />
        </div>
    );
};

export default NotificacionesComponent;
