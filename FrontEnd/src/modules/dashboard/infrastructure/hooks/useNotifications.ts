import { useState, useMemo } from 'react';
import type { NotificationItem, NotificationCategory } from '../components/NotificacionesComponent';

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

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>(DUMMY_NOTIFICATIONS);
    const [activeTab, setActiveTab] = useState<NotificationCategory>('Todas');
    const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

    const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

    const filteredNotifications = useMemo(() => {
        return notifications.filter(n => {
            if (activeTab === 'Todas') return true;
            if (activeTab === 'Bots') return n.category === 'Bots';
            if (activeTab === 'Posiciones') return n.category === 'Posiciones';
            if (activeTab === 'Sistema') return n.category === 'Sistema' && n.type !== 'alert';
            if (activeTab === 'Alertas') return n.type === 'alert' || n.category === 'Alertas';
            return true;
        });
    }, [notifications, activeTab]);

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const handleMarkRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    return {
        notifications,
        unreadCount,
        filteredNotifications,
        activeTab,
        setActiveTab,
        selectedNotification,
        setSelectedNotification,
        handleMarkAllRead,
        handleMarkRead
    };
};
