import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export interface DashboardStats {
  id: string;
  label: string;
  value: number | string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface ChartData {
  labels: string[];
  data: number[];
}

export interface DashboardCharts {
  balance: ChartData;
  pnl: ChartData;
  assets?: {
     labels: string[];
     data: number[];
  };
}

export interface Position {
  id?: string;
  pair: string;
  type: string;
  entry: string | number;
  price: string | number;
  pnl: string | number;
  pnlPct: string | number;
  status: 'Running' | 'Paused' | 'Stopped' | string;
}

export interface DashboardPositions {
  data: Position[];
  total: number;
  page: number;
  limit: number;
}

export interface DashboardData {
  stats: DashboardStats[];
  charts: DashboardCharts;
  positions: DashboardPositions;
}

const fetchDashboardData = async (params: URLSearchParams): Promise<DashboardData> => {
  const query = params.toString();
  // We use import.meta.env.VITE_API_URL or a relative path as requested
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const url = `${baseUrl}/api/dashboard/stats${query ? `?${query}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener los datos del dashboard');
  }
  return response.json();
};

export const useDashboardData = () => {
  const [searchParams] = useSearchParams();

  return useQuery<DashboardData, Error>({
    queryKey: ['dashboardData', searchParams.toString()],
    queryFn: () => fetchDashboardData(searchParams),
    refetchInterval: 30000, // Automático cada 30s
  });
};
