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
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const url = `${baseUrl}/api/v1/simulations/`; // Fetch simulations instead of /dashboard/stats

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Error al obtener los datos de simulaciones');
  }

  const data = await response.json();

  let totalPnl = 0;
  let totalRoi = 0;
  let totalWinRate = 0;
  let winRateCount = 0;

  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const activityCounts = [0, 0, 0, 0, 0, 0, 0];

  data.forEach((sim: any) => {
    const pnl = sim.metrics?.total_pnl || 0;
    const roi = sim.metrics?.roi_pct || 0;

    totalPnl += pnl;
    totalRoi += roi;

    if (roi > 0) positiveCount++;
    else if (roi < 0) negativeCount++;
    else neutralCount++;

    if (sim.metrics?.win_rate_pct !== undefined && sim.metrics?.win_rate_pct !== null) {
      totalWinRate += sim.metrics.win_rate_pct;
      winRateCount++;
    }

    if (sim.created_at) {
      const date = new Date(sim.created_at);
      const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
      if (dayOfWeek >= 0 && dayOfWeek < 7) {
        activityCounts[dayOfWeek]++;
      }
    }
  });

  const totalStrategies = data.length;
  const avgRoi = totalStrategies > 0 ? (totalRoi / totalStrategies) : 0;
  const avgWinRate = winRateCount > 0 ? (totalWinRate / winRateCount) : 0;

  const stats: DashboardStats[] = [
    {
      id: "totalStrategies",
      label: "Estrategias Totales",
      value: totalStrategies,
      change: 0, // Optionally calculate change against a timeframe
      changeType: "neutral",
      icon: "activity"
    },
    {
      id: "totalPnl",
      label: "P&L Total",
      value: totalPnl >= 0 ? `+$${totalPnl.toFixed(2)}` : `-$${Math.abs(totalPnl).toFixed(2)}`,
      change: 0,
      changeType: totalPnl >= 0 ? "positive" : "negative",
      icon: "dollar"
    },
    {
      id: "avgRoi",
      label: "ROI Promedio",
      value: `${avgRoi > 0 ? '+' : ''}${avgRoi.toFixed(2)}%`,
      change: 0,
      changeType: avgRoi >= 0 ? "positive" : "negative",
      icon: "trending-up"
    },
    {
      id: "winRate",
      label: "Win Rate Promedio",
      value: `${avgWinRate.toFixed(2)}%`,
      change: 0,
      changeType: "positive",
      icon: "pie"
    }
  ];

  // Configure pie chart data
  const assetsLabels = [];
  const assetsData = [];

  if (positiveCount > 0) {
    assetsLabels.push("Ganadoras ROI > 0");
    assetsData.push(positiveCount);
  }
  if (negativeCount > 0) {
    assetsLabels.push("Perdedoras ROI < 0");
    assetsData.push(negativeCount);
  }
  if (neutralCount > 0) {
    assetsLabels.push("Breakeven ROI = 0");
    assetsData.push(neutralCount);
  }

  // If no data, show empty state
  if (assetsLabels.length === 0) {
    assetsLabels.push("Sin datos");
    assetsData.push(1);
  }

  return {
    stats,
    charts: {
      balance: { labels: dayNames, data: activityCounts },
      pnl: { labels: [], data: [] },
      assets: { labels: assetsLabels, data: assetsData }
    },
    positions: { data: [], total: 0, page: 1, limit: 10 }
  };
};

export const useDashboardData = () => {
  const [searchParams] = useSearchParams();

  return useQuery<DashboardData, Error>({
    queryKey: ['dashboardData', searchParams.toString()],
    queryFn: () => fetchDashboardData(searchParams),
    refetchInterval: 30000, // Automático cada 30s
  });
};
