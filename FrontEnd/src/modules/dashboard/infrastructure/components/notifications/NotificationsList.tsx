import { Bell } from 'lucide-react';
import type { NotificationItem, NotificationCategory } from '../NotificacionesComponent';
import NotificationItemView from './NotificationItemView';

interface NotificationsListProps {
    notifications: NotificationItem[];
    activeTab: NotificationCategory;
    setActiveTab: (tab: NotificationCategory) => void;
    onSelect: (n: NotificationItem) => void;
    onMarkRead: (id: string) => void;
    totalCount: number;
}

const NotificationsList = ({
    notifications,
    activeTab,
    setActiveTab,
    onSelect,
    onMarkRead,
    totalCount
}: NotificationsListProps) => {
    const tabs: NotificationCategory[] = ['Todas', 'Bots', 'Posiciones', 'Sistema', 'Alertas'];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6 border-b border-[#2B3139] overflow-x-auto custom-scrollbar pb-px">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-[#F0B90B]' : 'text-[#848E9C] hover:text-white'}`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F0B90B]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                {notifications.length === 0 ? (
                    <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-12 flex flex-col items-center justify-center text-center mt-4">
                        <div className="w-16 h-16 bg-[#2B3139] rounded-full flex items-center justify-center mb-4">
                            <Bell className="w-8 h-8 text-[#848E9C]" />
                        </div>
                        <h3 className="text-white text-lg font-bold">No hay notificaciones</h3>
                        <p className="text-[#848E9C] mt-2 max-w-sm">Las alertas de tus bots y posiciones aparecerán aquí cuando estén disponibles.</p>
                    </div>
                ) : (
                    notifications.map(notification => (
                        <NotificationItemView
                            key={notification.id}
                            notification={notification}
                            onSelect={onSelect}
                            onMarkRead={onMarkRead}
                        />
                    ))
                )}
            </div>

            {notifications.length > 0 && (
                <div className="mt-4 flex flex-col items-center">
                    <span className="text-[#848E9C] text-sm mb-4">Mostrando {notifications.length} de {totalCount} notificaciones</span>
                    <button className="bg-[#1E2329] border border-[#2B3139] text-white hover:text-[#F0B90B] hover:border-[#F0B90B] transition-colors rounded-lg px-6 py-2.5 text-sm font-medium">
                        Cargar más
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationsList;
