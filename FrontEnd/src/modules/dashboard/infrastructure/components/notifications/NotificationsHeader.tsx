interface NotificationsHeaderProps {
    totalCount: number;
    unreadCount: number;
    onMarkAllRead: () => void;
}

const NotificationsHeader = ({ totalCount, unreadCount, onMarkAllRead }: NotificationsHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-[28px] font-bold text-white leading-tight mb-1">Centro de Notificaciones</h2>
                <p className="text-[#848E9C] text-sm">Historial completo de actividad, alertas y estados de tus bots</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#2B3139] text-[#848E9C] text-sm font-medium px-3 py-1.5 rounded-lg border border-[#3E454D]">
                    {totalCount} notificaciones
                </span>
                {unreadCount > 0 && (
                    <span className="bg-[#F0B90B] text-black text-sm font-bold px-3 py-1.5 rounded-lg">
                        {unreadCount} no leídas
                    </span>
                )}
                <button
                    onClick={onMarkAllRead}
                    className="text-[#F0B90B] text-sm font-medium hover:underline transition-all hidden sm:block ml-2"
                >
                    Marcar todas como leídas
                </button>
            </div>
        </div>
    );
};

export default NotificationsHeader;
