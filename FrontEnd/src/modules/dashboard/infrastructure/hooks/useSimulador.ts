import type { PositionsTabType, StrategyType, SimulationResult } from './types';
import { useState } from 'react';

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

            // Build payload
            const payload = {
                strategy_id: selectedStrategyId || "cff381e0-5c8b-4982-b82a-af0170a609aa",
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

            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDlmMmU5MS05MmM3LTRmMmEtYWJhNi1hMDJjZTkzODllZDkiLCJleHAiOjE3NzIwNzM2MzYsInR5cGUiOiJhY2Nlc3MifQ.6kNDweB_j8t3x6GrOVXRb32abg8QS-3okHsgg4f6l1c";
            const response = await fetch("http://localhost:8000/api/v1/simulations/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                setSimulationResult(data);
                setPositionsTab('HISTORIAL');
            } else {
                console.error("Simulation failed:", await response.text());
            }
        } catch (error) {
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
        simulationResult,
        isStrategyModalOpen, setIsStrategyModalOpen,
        selectedStrategyId,

        // Actions
        handleSelectStrategy,
        handleStartSimulation
    };
};
