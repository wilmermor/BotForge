import { useState, useMemo, useEffect, useCallback } from 'react';
import type { NotificationItem, NotificationCategory } from '../components/NotificacionesComponent';

const BASE_URL = 'http://localhost:8000';

const MOCK_NOTIFICATIONS: NotificationItem[] = [
    {
        id: '1',
        type: 'success',
        category: 'Bots',
        title: 'Backtesting completado',
        message: 'Tu estrategia BTC/USDT ha finalizado con +12.5% de ganancia.',
        time: 'Hace 5 min',
        createdAt: new Date().toISOString(),
        isRead: false,
        tags: [{ label: 'BTC/USDT', color: 'blue' }, { label: 'Ganancia', color: 'green' }]
    },
    {
        id: '2',
        type: 'alert',
        category: 'Sistema',
        title: 'Límite de backtests',
        message: 'Has usado 80% de tus backtests mensuales.',
        time: 'Hace 2 h',
        createdAt: new Date().toISOString(),
        isRead: false,
        tags: [{ label: 'Plan', color: 'yellow' }, { label: 'Consumo', color: 'blue' }]
    },
    {
        id: '3',
        type: 'info',
        category: 'Sistema',
        title: 'Nueva función',
        message: 'Grid Trading ya está disponible para backtesting.',
        time: 'Hace 1 día',
        createdAt: new Date().toISOString(),
        isRead: false,
        tags: [{ label: 'Actualización', color: 'blue' }]
    },
    {
        id: '4',
        type: 'info',
        category: 'Sistema',
        title: 'Mantenimiento programado',
        message: 'Plataforma no disponible el 20/02 02:00-04:00.',
        time: '15 feb',
        createdAt: new Date('2026-02-15T14:32:45').toISOString(),
        isRead: true,
        tags: [{ label: 'Sistema', color: 'gray' }]
    },
    {
        id: '5',
        type: 'urgent',
        category: 'Posiciones',
        title: 'Posición liquidada',
        message: 'AXSUSDT - Liquidación en 2.815.',
        time: 'Hace 2 días',
        createdAt: new Date().toISOString(),
        isRead: true,
        tags: [{ label: 'AXS/USDT', color: 'red' }, { label: 'Liquidación', color: 'red' }]
    },
    {
        id: '6',
        type: 'promo',
        category: 'Alertas',
        title: 'Oferta especial',
        message: 'Actualiza a Plan Anual y ahorra 20%.',
        time: 'Hace 3 días',
        createdAt: new Date().toISOString(),
        isRead: true,
        tags: [{ label: 'Suscripción', color: 'yellow' }]
    }
];

const fetchNotifications = async (): Promise<NotificationItem[]> => {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
        const response = await fetch(`${BASE_URL}/api/v1/notifications/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return []; // Fallback to empty and use mocks in hook
        }

        const data = await response.json();
        return data.length > 0 ? data : []; 
    } catch {
        return [];
    }
};

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
    const [activeTab, setActiveTab] = useState<NotificationCategory>('Todas');
    const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadNotifications = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchNotifications();
            // If API returns data, use it, otherwise keep mocks for visual consistency
            if (data && data.length > 0) {
                setNotifications(data);
            } else if (notifications.length === 0) {
                setNotifications(MOCK_NOTIFICATIONS);
            }
        } catch (err) {
            console.error("Error loading notifications:", err);
            // Don't set error if we have mocks, just log it
            if (notifications.length === 0) {
                setError((err as Error).message);
            }
        } finally {
            setIsLoading(false);
        }
    }, [notifications.length]);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

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

    const handleMarkAllRead = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Local update for mocks
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            return;
        }

        // Optimistic update
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));

        try {
            await fetch(`${BASE_URL}/api/v1/notifications/read-all`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch {
            // Revert or handle silent fail
        }
    };

    const handleMarkRead = async (id: string) => {
        const token = localStorage.getItem('token');
        
        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

        if (!token) return;

        try {
            await fetch(`${BASE_URL}/api/v1/notifications/${id}/read`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch {
            // Revert on error
            setNotifications(prev => prev.map(n => n.id === id && id.length > 5 ? { ...n, isRead: false } : n));
        }
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
        handleMarkRead,
        isLoading,
        error,
        reload: loadNotifications,
    };
};

