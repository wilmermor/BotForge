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
        handleMarkRead
    } = useNotifications();

    return (
        <div className="w-full h-full pb-12">
            <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in">
                <NotificationsHeader
                    totalCount={notifications.length}
                    unreadCount={unreadCount}
                    onMarkAllRead={handleMarkAllRead}
                />

                <NotificationsList
                    notifications={filteredNotifications}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onSelect={setSelectedNotification}
                    onMarkRead={handleMarkRead}
                    totalCount={notifications.length}
                />
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
