import { useState, useMemo, useEffect, useCallback } from 'react';
import type { NotificationItem, NotificationCategory } from '../components/NotificacionesComponent';

const BASE_URL = 'http://localhost:8000';

const fetchNotifications = async (): Promise<NotificationItem[]> => {
    const token = localStorage.getItem('token');
    if (!token) return [];

    const response = await fetch(`${BASE_URL}/api/v1/notifications/`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw new Error('Error al cargar notificaciones');
    }

    return response.json();
};

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [activeTab, setActiveTab] = useState<NotificationCategory>('Todas');
    const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadNotifications = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchNotifications();
            setNotifications(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, []);

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
        if (!token) return;

        try {
            await fetch(`${BASE_URL}/api/v1/notifications/read-all`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch {
            // Silent fail, optimistic update already done
        }
    };

    const handleMarkRead = async (id: string) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

        try {
            await fetch(`${BASE_URL}/api/v1/notifications/${id}/read`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch {
            // Revert on error
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: false } : n));
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
