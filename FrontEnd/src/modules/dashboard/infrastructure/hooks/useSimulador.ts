import type { PositionsTabType, StrategyType, SimulationResult } from './types';
import { useState } from 'react';
import type { SimulationStatus } from '../components/modals/SimulationLoadingModal';

export const useSimulador = () => {
    const [positionsTab, setPositionsTab] = useState<PositionsTabType>('HISTORIAL');
    const [strategyType, setStrategyType] = useState<StrategyType>('GRID');

    // Bot Configuration State
    const [gridType, setGridType] = useState<'ARITMETICA' | 'GEOMETRICA'>('ARITMETICA');
    const [marginMode, setMarginMode] = useState<'Cruzado' | 'Aislado'>('Cruzado');
    const [isTpSlExpanded, setIsTpSlExpanded] = useState(false);

    // Form inputs state
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [grids, setGrids] = useState('12');
    const [investment, setInvestment] = useState('');
    const [qtyPerOrder, setQtyPerOrder] = useState('');
    const [autoCalculate, setAutoCalculate] = useState(false);
    const [leverage, setLeverage] = useState('14');

    // Date Range State
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const today = new Date();
    const [startDate, setStartDate] = useState(thirtyDaysAgo.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);

    // DCA Strategy State
    const [dcaBuyAmount, setDcaBuyAmount] = useState('100');
    const [dcaIntervalBars, setDcaIntervalBars] = useState('24');
    const [dcaTpPct, setDcaTpPct] = useState('');
    const [dcaSlPct, setDcaSlPct] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [simulationStatus, setSimulationStatus] = useState<SimulationStatus>('idle');
    const [simulationError, setSimulationError] = useState<string | null>(null);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
    const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);

    const handleSelectStrategy = (strategy: any) => {
        setIsStrategyModalOpen(false);
        setSelectedStrategyId(strategy.id);
        const type = strategy.type.toUpperCase() as StrategyType;
        setStrategyType(type);

        if (type === 'GRID') {
            setMinPrice(strategy.params.lower_price?.toString() || '');
            setMaxPrice(strategy.params.upper_price?.toString() || '');
            setGrids(strategy.params.grid_count?.toString() || '12');
            setInvestment(strategy.params.investment_amount?.toString() || '');
        } else {
            setDcaBuyAmount(strategy.params.buy_amount?.toString() || '100');
            setDcaIntervalBars(strategy.params.interval_bars?.toString() || '24');
            setDcaTpPct(strategy.params.take_profit_pct?.toString() || '');
            setDcaSlPct(strategy.params.stop_loss_pct?.toString() || '');
        }
    };

    const handleStartSimulation = async () => {
        try {
            setIsLoading(true);
            setSimulationStatus('simulating');
            setSimulationError(null);

            // Build payload
            const payload = {
                strategy_id: selectedStrategyId,
                pair: "BTCUSDT",
                timeframe: "1h",
                date_start: new Date(startDate).toISOString(),
                date_end: new Date(endDate).toISOString(),
                strategy_type: strategyType.toLowerCase(),
                strategy_params: strategyType === 'GRID'
                    ? {
                        upper_price: parseFloat(maxPrice) || 3000,
                        lower_price: parseFloat(minPrice) || 2000,
                        grid_count: parseInt(grids) || 12,
                        investment_amount: parseFloat(investment) || 1000,
                    }
                    : {
                        buy_amount: parseFloat(dcaBuyAmount) || 100,
                        interval_bars: parseInt(dcaIntervalBars) || 24,
                        take_profit_pct: dcaTpPct ? parseFloat(dcaTpPct) : null,
                        stop_loss_pct: dcaSlPct ? parseFloat(dcaSlPct) : null,
                    }
            };

            //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzBjMDJiZC02NDUzLTRkMzctODk2NS1hNDMzZjMzZTRkZWEiLCJleHAiOjE3NzIyMDkyNTAsInR5cGUiOiJhY2Nlc3MifQ.5unVva5TUW-zym5T93MjULYti5EwlUPEvu0t6imnDbA"
            const token = localStorage.getItem('token') || '';
            const response = await fetch("http://localhost:8000/api/v1/simulations/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                // Sanitize metrics to avoid null/undefined crashes in render
                const sanitized = {
                    ...data,
                    trades: Array.isArray(data.trades) ? data.trades : [],
                    metrics: {
                        total_trades: data.metrics?.total_trades ?? 0,
                        win_rate_pct: data.metrics?.win_rate_pct ?? 0,
                        total_pnl: data.metrics?.total_pnl ?? 0,
                        max_drawdown_pct: data.metrics?.max_drawdown_pct ?? 0,
                        roi_pct: data.metrics?.roi_pct ?? 0,
                        profitable_trades: data.metrics?.profitable_trades ?? 0,
                        losing_trades: data.metrics?.losing_trades ?? 0,
                        profit_factor: data.metrics?.profit_factor ?? 0,
                        sharpe_ratio: data.metrics?.sharpe_ratio ?? 0,
                        sortino_ratio: data.metrics?.sortino_ratio ?? 0,
                        calmar_ratio: data.metrics?.calmar_ratio ?? 0,
                    },
                };
                setSimulationResult(sanitized);
                setSimulationStatus('completed');
                setPositionsTab('HISTORIAL');
            } else {
                setSimulationStatus('error');
                setSimulationError(data.detail || "Error en la simulación");
                console.error("Simulation failed:", data);
            }
        } catch (error) {
            setSimulationStatus('error');
            setSimulationError("Error de conexión con el servidor");
            console.error("Connection error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        // State
        positionsTab, setPositionsTab,
        strategyType, setStrategyType,
        gridType, setGridType,
        marginMode, setMarginMode,
        isTpSlExpanded, setIsTpSlExpanded,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        grids, setGrids,
        investment, setInvestment,
        qtyPerOrder, setQtyPerOrder,
        autoCalculate, setAutoCalculate,
        leverage, setLeverage,
        startDate, setStartDate,
        endDate, setEndDate,
        dcaBuyAmount, setDcaBuyAmount,
        dcaIntervalBars, setDcaIntervalBars,
        dcaTpPct, setDcaTpPct,
        dcaSlPct, setDcaSlPct,
        isLoading,
        simulationStatus, setSimulationStatus,
        simulationError,
        simulationResult,
        isStrategyModalOpen, setIsStrategyModalOpen,
        selectedStrategyId,

        // Actions
        handleSelectStrategy,
        handleStartSimulation
    };
};
