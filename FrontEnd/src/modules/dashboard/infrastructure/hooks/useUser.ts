import { useQuery } from '@tanstack/react-query';

export interface UserPlan {
    id: string;
    name: string;
    description: string;
}

export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    country: string | null;
    avatar: string | null;
    plan_id: string;
    plan_rel: UserPlan | null;
    is_active: boolean;
    created_at: string;
}

const fetchUserProfile = async (): Promise<UserProfile> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const baseUrl = 'http://127.0.0.1:8000';
    const response = await fetch(`${baseUrl}/api/v1/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw new Error('Error al obtener el perfil de usuario');
    }

    return response.json();
};

export const useUser = () => {
    return useQuery<UserProfile, Error>({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
