import { useState, useEffect } from 'react';
import {
    Calendar,
    ChevronDown,
    Activity,
    Info,
    TrendingUp,
    TrendingDown,
    Settings,
    Clock,
    CheckCircle2,
    BookOpen,
    ToggleRight,
    ToggleLeft
} from 'lucide-react';

import TradingViewWidget from './TradingViewWidget';

type PositionsTabType = 'ACTIVAS' | 'EJECUCION' | 'HISTORIAL';

const SimuladorComponent = () => {
    const [positionsTab, setPositionsTab] = useState<PositionsTabType>('ACTIVAS');

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

    // Simulation Execution State
    const [isLoading, setIsLoading] = useState(false);
    const [simulationResult, setSimulationResult] = useState<any>(null);

    const handleStartSimulation = async () => {
        try {
            setIsLoading(true);

            // Build payload
            const payload = {
                strategy_id: "cff381e0-5c8b-4982-b82a-af0170a609aa",//id de estrategia placeholder
                pair: "BTCUSDT",
                timeframe: "1h",
                date_start: new Date(startDate).toISOString(),
                date_end: new Date(endDate).toISOString(),
                strategy_type: "grid",
                strategy_params: {
                    upper_price: parseFloat(maxPrice) || 3000,
                    lower_price: parseFloat(minPrice) || 2000,
                    grid_count: parseInt(grids) || 12,
                    investment_amount: parseFloat(investment) || 1000,
                }
            };

            //const token = localStorage.getItem('token') || '';

            //token placeholder sacado de la autorización por swager
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDlmMmU5MS05MmM3LTRmMmEtYWJhNi1hMDJjZTkzODllZDkiLCJleHAiOjE3NzIwNzM2MzYsInR5cGUiOiJhY2Nlc3MifQ.6kNDweB_j8t3x6GrOVXRb32abg8QS-3okHsgg4f6l1c"
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
                // Optionally switch to HISTORIAL tab
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

    return (
        <div className="w-full h-full flex flex-col  space-y-6">

            {/* Header: Simulador de Bots */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-[28px] font-bold text-white tracking-tight">
                            Simulador de Bots - Grid Trading
                        </h1>
                        <div className="bg-[#2B3139] px-3 py-1.5 rounded-full border border-[#3A4149] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#F0B90B] animate-pulse"></span>
                            <span className="text-xs font-semibold text-[#F0B90B]">MODO SIMULACIÓN | Balance virtual: 10,000 USDT</span>
                        </div>
                    </div>
                    <p className="text-[#848E9C] text-sm mt-1">
                        Configura y prueba tus estrategias automatizadas
                    </p>
                </div>
            </header>

            {/* Main Grid: 70 / 30 */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

                {/* LEFT COLUMN: Candlestick Chart and Indicators (70%) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    {/* Top Selectors */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            {/* Pair Selector */}
                            <button className="bg-[#1E2329] border border-[#2B3139] hover:border-[#3A4149] px-4 py-2 rounded-lg flex items-center gap-2 text-white font-medium transition-colors">
                                BTC/USDT <ChevronDown className="w-4 h-4 text-[#848E9C]" />
                            </button>

                            {/* Interval Tabs */}
                            <div className="hidden sm:flex items-center bg-[#1E2329] p-1 rounded-lg border border-[#2B3139]">
                                {['1h', '4h', '12h', '1d'].map((interval) => (
                                    <button
                                        key={interval}
                                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${interval === '4h'
                                            ? 'bg-[#2B3139] text-[#F0B90B] border-b-2 border-[#F0B90B] pb-[2px]'
                                            : 'text-[#848E9C] hover:text-white hover:bg-[#2B3139]/50'
                                            }`}
                                    >
                                        {interval}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Range Selector */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-[#1E2329] border border-[#2B3139] hover:border-[#3A4149] px-3 py-1.5 rounded-lg transition-colors">
                                <Calendar className="w-4 h-4 text-[#848E9C]" />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="bg-transparent text-sm text-white focus:outline-none w-[110px] [&::-webkit-calendar-picker-indicator]:filter-invert"
                                    />
                                    <span className="text-[#848E9C]">-</span>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="bg-transparent text-sm text-white focus:outline-none w-[110px] [&::-webkit-calendar-picker-indicator]:filter-invert"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-4 flex flex-col relative h-[400px] overflow-hidden group">
                        {/* Wrapper to simulate the grid lines placeholder on top of the chart */}
                        <TradingViewWidget />
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-[#1E2329]/80 text-[#848E9C] text-xs px-3 py-1 rounded">Las líneas punteadas del grid (#F0B90B) se renderizan en el gráfico principal</span>
                        </div>
                    </div>

                    {/* Bot Performance Indicators */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                        <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex flex-col justify-center">
                            <span className="text-[#848E9C] text-xs font-medium mb-1 flex items-center gap-1">
                                <Activity className="w-3 h-3" /> Trades totales
                            </span>
                            <span className="text-white font-bold text-sm">
                                {simulationResult ? simulationResult.metrics.total_trades : '0'}
                            </span>
                        </div>
                        <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex flex-col justify-center">
                            <span className="text-[#848E9C] text-xs font-medium mb-1">Win Rate</span>
                            <span className="text-white font-bold text-sm">
                                {simulationResult ? `${simulationResult.metrics.win_rate_pct.toFixed(2)}%` : '0.00%'}
                            </span>
                        </div>
                        <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex flex-col justify-center">
                            <span className="text-[#848E9C] text-xs font-medium mb-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-[#02C076]" /> Profit estimado
                            </span>
                            <span className={`font-bold text-sm ${simulationResult && simulationResult.metrics.total_pnl < 0 ? 'text-[#F6465D]' : 'text-[#02C076]'}`}>
                                {simulationResult ? `${simulationResult.metrics.total_pnl > 0 ? '+' : ''}$${simulationResult.metrics.total_pnl.toFixed(2)}` : '+$0.00'}
                            </span>
                        </div>
                        <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex flex-col justify-center">
                            <span className="text-[#848E9C] text-xs font-medium mb-1 flex items-center gap-1">
                                <TrendingDown className="w-3 h-3 text-[#F6465D]" /> Drawdown Max
                            </span>
                            <span className="text-[#F6465D] font-bold text-sm">
                                {simulationResult ? `${simulationResult.metrics.max_drawdown_pct.toFixed(2)}%` : '0.00%'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Bot Configuration Panel (30%) */}
                <div className="lg:col-span-3 flex flex-col h-full bg-[#1E2329] rounded-xl border border-[#2B3139]">

                    {/* Available Balance Header */}
                    <div className="p-4 border-b border-[#2B3139] bg-[#1E2329] rounded-t-xl">
                        <div className="text-[#848E9C] text-sm mb-1">Disponible</div>
                        <div className="text-[28px] font-bold text-white tracking-tight">10,000.00 USDT</div>
                    </div>

                    {/* Config Scrollable Area */}
                    <div className="flex-1 p-5 flex flex-col space-y-5 overflow-y-auto custom-scrollbar">

                        {/* Field 1: Price Range */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm text-white font-medium">Rango de precio</label>
                            </div>
                            <div className="flex gap-2 mb-1">
                                <div className="flex-1 bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        placeholder="Min: 2.000"
                                        className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                                    />
                                </div>
                                <div className="flex-1 bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="Max: 3.000"
                                        className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                                    />
                                </div>
                            </div>
                            <div className="text-xs text-[#848E9C] text-right">Precio marca: 2.124 USDT</div>
                        </div>

                        {/* Field 2: Grid Quantity */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm text-white font-medium">Cantidad de grids</label>
                                <div className="flex bg-[#2B3139] rounded p-0.5">
                                    <button
                                        onClick={() => setGridType('ARITMETICA')}
                                        className={`px-2 py-1 text-[10px] font-medium rounded ${gridType === 'ARITMETICA'
                                            ? 'bg-[#1E2329] text-[#F0B90B] border border-[#F0B90B]/50'
                                            : 'text-[#848E9C] hover:text-white'
                                            }`}
                                    >
                                        Aritmética
                                    </button>
                                    <button
                                        onClick={() => setGridType('GEOMETRICA')}
                                        className={`px-2 py-1 text-[10px] font-medium rounded ${gridType === 'GEOMETRICA'
                                            ? 'bg-[#1E2329] text-[#F0B90B] border border-[#F0B90B]/50'
                                            : 'text-[#848E9C] hover:text-white'
                                            }`}
                                    >
                                        Geométrica
                                    </button>
                                </div>
                            </div>
                            <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                                <input
                                    type="number"
                                    value={grids}
                                    onChange={(e) => setGrids(e.target.value)}
                                    placeholder="12"
                                    className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                                />
                            </div>
                        </div>

                        {/* Field 3: Total Investment */}
                        <div>
                            <label className="text-sm text-white font-medium block mb-2">Inversión total</label>
                            <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors mb-1">
                                <input
                                    type="number"
                                    value={investment}
                                    onChange={(e) => setInvestment(e.target.value)}
                                    placeholder="1,000.00"
                                    className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                                />
                                <span className="text-[#848E9C] text-sm font-medium">USDT</span>
                            </div>
                            <div className="text-xs text-[#848E9C] text-right">Por grid: 83.33 USDT</div>
                        </div>

                        {/* Field 4: Amount per order (optional) */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm text-white font-medium">Cant/orden <span className="text-[#848E9C] font-normal">(opcional)</span></label>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={autoCalculate}
                                        onChange={(e) => setAutoCalculate(e.target.checked)}
                                        className="hidden"
                                    />
                                    {autoCalculate ? (
                                        <ToggleRight className="w-4 h-4 text-[#02C076]" />
                                    ) : (
                                        <ToggleLeft className="w-4 h-4 text-[#848E9C]" />
                                    )}
                                    <span className="text-[#848E9C] text-[10px]">Auto-calcular</span>
                                </label>
                            </div>
                            <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                                <input
                                    type="number"
                                    value={qtyPerOrder}
                                    onChange={(e) => setQtyPerOrder(e.target.value)}
                                    placeholder="0.000"
                                    disabled={autoCalculate}
                                    className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C] disabled:opacity-50"
                                />
                                <span className="text-[#848E9C] text-sm font-medium">BTC</span>
                            </div>
                        </div>

                        {/* Liquidation Summary */}
                        <div className="bg-[#1E2329] border border-[#2B3139] p-3 rounded-lg shadow-inner">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <div className="text-[#848E9C] mb-1">Precio de liq. est. (long):</div>
                                    <div className="text-[#F6465D] font-bold">1.850</div>
                                </div>
                                <div>
                                    <div className="text-[#848E9C] mb-1">Precio de liq. est. (short):</div>
                                    <div className="text-[#F6465D] font-bold">3.150</div>
                                </div>
                            </div>
                        </div>

                        {/* Margin Mode & Leverage */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm text-white font-medium block mb-2">Modo de margen</label>
                                <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent hover:border-[#3A4149] transition-colors cursor-pointer group">
                                    <select
                                        value={marginMode}
                                        onChange={(e) => setMarginMode(e.target.value as any)}
                                        className="w-full bg-transparent py-2 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="Cruzado">Cruzado</option>
                                        <option value="Aislado">Aislado</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-[#848E9C] group-hover:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-white font-medium block mb-2">Leverage</label>
                                <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                                    <input
                                        type="number"
                                        value={leverage}
                                        onChange={(e) => setLeverage(e.target.value)}
                                        className="w-full bg-transparent py-2 text-white text-sm focus:outline-none text-right"
                                    />
                                    <span className="text-white text-sm font-medium ml-1">X</span>
                                </div>
                            </div>
                        </div>

                        {/* TP/SL Expander */}
                        <div>
                            <button
                                onClick={() => setIsTpSlExpanded(!isTpSlExpanded)}
                                className="flex items-center justify-between w-full text-white text-sm font-medium hover:text-[#F0B90B] transition-colors"
                            >
                                Take Profit / Stop Loss <ChevronDown className={`w-4 h-4 transform transition-transform ${isTpSlExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            {isTpSlExpanded && (
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#02C076]">
                                        <span className="text-[#848E9C] text-xs w-6">TP</span>
                                        <input type="number" placeholder="%" className="w-full bg-transparent py-1.5 text-white text-sm focus:outline-none" />
                                    </div>
                                    <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F6465D]">
                                        <span className="text-[#848E9C] text-xs w-6">SL</span>
                                        <input type="number" placeholder="%" className="w-full bg-transparent py-1.5 text-white text-sm focus:outline-none" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-5 border-t border-[#2B3139] bg-[#1E2329] rounded-b-xl flex flex-col gap-3">
                        <button
                            onClick={handleStartSimulation}
                            disabled={isLoading}
                            className={`w-full py-3.5 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${isLoading ? 'bg-[#2B3139] cursor-not-allowed' : 'bg-[#02C076] hover:brightness-110 active:scale-[0.98]'}`}>
                            {isLoading ? 'SIMULANDO...' : 'INICIAR SIMULACIÓN'}
                        </button>
                        <button className="w-full py-2.5 rounded-lg font-medium text-white bg-[#2B3139] hover:bg-[#3A4149] transition-all flex items-center justify-center gap-2 text-sm">
                            <Settings className="w-4 h-4" /> Guardar configuración
                        </button>
                    </div>

                </div>

            </div>

            {/* BOTTOM SECTION: Positions and Executions (100% Width) */}
            <div className="w-full mt-2">
                {/* Top Tabs */}
                <div className="flex items-center justify-between border-b border-[#2B3139] mb-6">
                    <div className="flex">
                        {(['ACTIVAS', 'EJECUCION', 'HISTORIAL'] as PositionsTabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setPositionsTab(tab)}
                                className={`px-4 py-3 text-sm font-bold transition-colors border-b-2 relative -bottom-[1px] ${positionsTab === tab
                                    ? 'text-[#F0B90B] border-[#F0B90B]'
                                    : 'text-[#848E9C] border-transparent hover:text-white'
                                    }`}
                            >
                                {tab === 'ACTIVAS' ? 'POSICIONES ACTIVAS' : tab === 'EJECUCION' ? 'EN EJECUCIÓN' : 'HISTORIAL'}
                            </button>
                        ))}
                    </div>
                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#2B3139] hover:bg-[#3A4149] rounded text-[#F0B90B] text-xs font-bold transition-colors">
                        VER TODO EL HISTORIAL
                    </button>
                </div>

                {/* Tab Content */}
                <div className="w-full max-h-[400px] overflow-y-auto custom-scrollbar pb-6 pr-2">
                    {positionsTab === 'ACTIVAS' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Card 1 */}
                            <div className="bg-[#1E2329] border border-[#2B3139] hover:border-[#F0B90B]/50 transition-colors rounded-xl p-4 relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#02C076]" />
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4 pl-2">
                                    <div className="font-bold text-white">BTCUSDT Perp</div>
                                    <div className="bg-[#2B3139] text-[#F0B90B] text-[10px] font-bold px-2 py-0.5 rounded">Cruzado 14X</div>
                                </div>
                                {/* Grid Data */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pl-2 mb-5">
                                    <div>
                                        <div className="text-[#848E9C] text-[10px] mb-0.5">Pérdidas y ganancias (USDT)</div>
                                        <div className="text-[#02C076] font-bold text-lg">+3,484.81</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Cantidad (USDT)</div>
                                        <div className="text-white font-medium text-sm">18,200.0</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Entrada (USDT)</div>
                                        <div className="text-white text-sm">2.627</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Margen (USDT)</div>
                                        <div className="text-white text-sm">1,300.0</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Proporción de margen</div>
                                        <div className="text-[#F0B90B] text-sm font-medium">0.86%</div>
                                    </div>
                                    <div className="relative group/tooltip">
                                        <div className="text-[#848E9C] text-xs mb-0.5 truncate cursor-help">Precio de marca (U...</div>
                                        <div className="text-white text-sm">2.124</div>
                                        <div className="absolute bottom-full left-0 mb-1 bg-[#2B3139] text-white text-xs px-2 py-1 rounded hidden group-hover/tooltip:block z-10 whitespace-nowrap border border-[#3A4149]">
                                            Precio de marca (USDT)
                                        </div>
                                    </div>
                                    <div className="col-span-2 grid grid-cols-2 gap-4">
                                        <div className="relative group/tooltip">
                                            <div className="text-[#848E9C] text-xs mb-0.5 truncate cursor-help">Precio de liquidación...</div>
                                            <div className="text-[#F6465D] text-sm font-medium">2.815</div>
                                            <div className="absolute bottom-full left-0 mb-1 bg-[#2B3139] text-white text-xs px-2 py-1 rounded hidden group-hover/tooltip:block z-10 whitespace-nowrap border border-[#3A4149]">
                                                Precio de liquidación (USDT)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Actions */}
                                <div className="flex items-center gap-2 pl-2">
                                    <button className="flex-1 py-1.5 bg-[#2B3139] hover:bg-[#3A4149] rounded text-white text-xs font-medium transition-colors">Leverage</button>
                                    <button className="flex-1 py-1.5 bg-[#2B3139] hover:bg-[#3A4149] rounded text-white text-xs font-medium transition-colors">TP/SL</button>
                                    <button className="flex-1 py-1.5 bg-[#F6465D]/10 hover:bg-[#F6465D]/20 border border-transparent hover:border-[#F6465D]/50 rounded text-[#F6465D] text-xs font-medium transition-colors">Close</button>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-[#1E2329] border border-[#2B3139] hover:border-[#F0B90B]/50 transition-colors rounded-xl p-4 relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F6465D]" />
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4 pl-2">
                                    <div className="font-bold text-white">BTCUSDT Perp</div>
                                    <div className="bg-[#2B3139] text-[#F0B90B] text-[10px] font-bold px-2 py-0.5 rounded">Aislado 5X</div>
                                </div>
                                {/* Grid Data */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pl-2 mb-5">
                                    <div>
                                        <div className="text-[#848E9C] text-[10px] mb-0.5">Pérdidas y ganancias (USDT)</div>
                                        <div className="text-[#F6465D] font-bold text-lg">-124.50</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Cantidad (USDT)</div>
                                        <div className="text-white font-medium text-sm">0.25</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Entrada (USDT)</div>
                                        <div className="text-white text-sm">44,230</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Margen (USDT)</div>
                                        <div className="text-white text-sm">2,211.5</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Proporción de margen</div>
                                        <div className="text-[#F0B90B] text-sm font-medium">12.4%</div>
                                    </div>
                                    <div className="relative group/tooltip">
                                        <div className="text-[#848E9C] text-xs mb-0.5 truncate cursor-help">Precio de marca (U...</div>
                                        <div className="text-white text-sm">43,890</div>
                                        <div className="absolute bottom-full left-0 mb-1 bg-[#2B3139] text-white text-xs px-2 py-1 rounded hidden group-hover/tooltip:block z-10 whitespace-nowrap border border-[#3A4149]">
                                            Precio de marca (USDT)
                                        </div>
                                    </div>
                                    <div className="col-span-2 grid grid-cols-2 gap-4">
                                        <div className="relative group/tooltip">
                                            <div className="text-[#848E9C] text-xs mb-0.5 truncate cursor-help">Precio de liquidación...</div>
                                            <div className="text-[#F6465D] text-sm font-medium">41,200</div>
                                            <div className="absolute bottom-full left-0 mb-1 bg-[#2B3139] text-white text-xs px-2 py-1 rounded hidden group-hover/tooltip:block z-10 whitespace-nowrap border border-[#3A4149]">
                                                Precio de liquidación (USDT)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Actions */}
                                <div className="flex items-center gap-2 pl-2">
                                    <button className="flex-1 py-1.5 bg-[#2B3139] hover:bg-[#3A4149] rounded text-white text-xs font-medium transition-colors">Leverage</button>
                                    <button className="flex-1 py-1.5 bg-[#2B3139] hover:bg-[#3A4149] rounded text-white text-xs font-medium transition-colors">TP/SL</button>
                                    <button className="flex-1 py-1.5 bg-[#F6465D]/10 hover:bg-[#F6465D]/20 border border-transparent hover:border-[#F6465D]/50 rounded text-[#F6465D] text-xs font-medium transition-colors">Close</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {positionsTab === 'EJECUCION' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Running Card */}
                            <div className="bg-[#1E2329] border border-[#2B3139] hover:border-[#F0B90B]/50 transition-colors rounded-xl p-4 relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#02C076]" />
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4 pl-2">
                                    <div className="font-bold text-white">ETHUSDT Perp</div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#F0B90B]/20 border border-[#F0B90B]/50 text-[#F0B90B] text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">EJECUTANDO</div>
                                        <div className="bg-[#2B3139] text-[#F0B90B] text-[10px] font-bold px-2 py-0.5 rounded">Cruzado 10X</div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="pl-2 mb-4">
                                    <div className="flex justify-between text-[10px] text-[#848E9C] mb-1">
                                        <span>Órdenes completadas</span>
                                        <span>3 / 12</span>
                                    </div>
                                    <div className="w-full bg-[#2B3139] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[#02C076] h-full w-1/4"></div>
                                    </div>
                                </div>

                                {/* Grid Data */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pl-2 mb-5">
                                    <div>
                                        <div className="text-[#848E9C] text-[10px] mb-0.5">Pérdidas y ganancias (USDT)</div>
                                        <div className="text-[#02C076] font-bold text-lg">+56.30</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Cantidad (USDT)</div>
                                        <div className="text-white font-medium text-sm">1.5</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Entrada (USDT)</div>
                                        <div className="text-white text-sm">2,850</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Margen (USDT)</div>
                                        <div className="text-white text-sm">427.5</div>
                                    </div>
                                    <div>
                                        <div className="text-[#848E9C] text-xs mb-0.5">Proporción de margen</div>
                                        <div className="text-[#F0B90B] text-sm font-medium">2.1%</div>
                                    </div>
                                    <div className="relative group/tooltip">
                                        <div className="text-[#848E9C] text-xs mb-0.5 truncate cursor-help">Precio de marca (U...</div>
                                        <div className="text-white text-sm">2,890</div>
                                        <div className="absolute bottom-full left-0 mb-1 bg-[#2B3139] text-white text-xs px-2 py-1 rounded hidden group-hover/tooltip:block z-10 whitespace-nowrap border border-[#3A4149]">
                                            Precio de marca (USDT)
                                        </div>
                                    </div>
                                    <div className="col-span-2 grid grid-cols-2 gap-4">
                                        <div className="relative group/tooltip">
                                            <div className="text-[#848E9C] text-xs mb-0.5 truncate cursor-help">Precio de liquidación...</div>
                                            <div className="text-[#F6465D] text-sm font-medium">2,520</div>
                                            <div className="absolute bottom-full left-0 mb-1 bg-[#2B3139] text-white text-xs px-2 py-1 rounded hidden group-hover/tooltip:block z-10 whitespace-nowrap border border-[#3A4149]">
                                                Precio de liquidación (USDT)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Actions */}
                                <div className="flex items-center gap-2 pl-2">
                                    <button className="flex-1 py-1.5 bg-[#2B3139] hover:bg-[#3A4149] rounded text-white text-xs font-medium transition-colors">Leverage</button>
                                    <button className="flex-1 py-1.5 bg-[#2B3139] hover:bg-[#3A4149] rounded text-white text-xs font-medium transition-colors">TP/SL</button>
                                    <button className="flex-1 py-1.5 bg-[#F6465D]/10 hover:bg-[#F6465D]/20 border border-transparent hover:border-[#F6465D]/50 rounded text-[#F6465D] text-xs font-medium transition-colors">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {positionsTab === 'HISTORIAL' && (
                        <div className="flex flex-col gap-2">
                            {simulationResult && simulationResult.metrics && (
                                <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-4 mb-4">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-[#F0B90B]" />
                                        Resultados de Simulación (Métricas Finales)
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div>
                                            <div className="text-[#848E9C] text-xs mb-1">ROI</div>
                                            <div className="text-white font-bold">{simulationResult.metrics.roi_pct.toFixed(2)}%</div>
                                        </div>
                                        <div>
                                            <div className="text-[#848E9C] text-xs mb-1">Trades Ganadores</div>
                                            <div className="text-[#02C076] font-bold">{simulationResult.metrics.profitable_trades}</div>
                                        </div>
                                        <div>
                                            <div className="text-[#848E9C] text-xs mb-1">Trades Perdedores</div>
                                            <div className="text-[#F6465D] font-bold">{simulationResult.metrics.losing_trades}</div>
                                        </div>
                                        <div>
                                            <div className="text-[#848E9C] text-xs mb-1">Profit Factor</div>
                                            <div className="text-white font-bold">{simulationResult.metrics.profit_factor?.toFixed(2) || '0.00'}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {simulationResult && simulationResult.trades && simulationResult.trades.length > 0 ? (
                                simulationResult.trades.map((trade: any, idx: number) => (
                                    <div key={idx} className="bg-[#1E2329] border border-[#2B3139] hover:bg-[#2B3139]/50 transition-colors rounded-lg p-3 flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-1 h-10 ${trade.pnl && trade.pnl >= 0 ? 'bg-[#02C076]' : 'bg-[#F6465D]'} rounded-full`} />
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-white text-sm">{simulationResult.pair}</span>
                                                    <span className="bg-[#2B3139] text-[#848E9C] text-[10px] px-1.5 py-0.5 rounded uppercase">Simulado</span>
                                                </div>
                                                <div className="text-[#848E9C] text-xs flex items-center gap-2">
                                                    <span><Clock className="w-3 h-3 inline mr-1" /> {new Date(trade.timestamp).toLocaleString()}</span>
                                                    <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                                                    <span className="uppercase">{trade.side === 'buy' ? 'Compra' : 'Venta'} {trade.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-bold ${trade.pnl && trade.pnl >= 0 ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                                {trade.pnl ? (trade.pnl > 0 ? `+${trade.pnl.toFixed(2)} USDT` : `${trade.pnl.toFixed(2)} USDT`) : 'Abierta'}
                                            </div>
                                            <div className="text-[#848E9C] text-xs">A: {trade.price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {/* History List Item 1 */}
                                    <div className="bg-[#1E2329] border border-[#2B3139] hover:bg-[#2B3139]/50 transition-colors rounded-lg p-3 flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1 h-10 bg-[#02C076] rounded-full" />
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-white text-sm">BTCUSDT Perp</span>
                                                    <span className="bg-[#2B3139] text-[#848E9C] text-[10px] px-1.5 py-0.5 rounded">Cerrada</span>
                                                </div>
                                                <div className="text-[#848E9C] text-xs flex items-center gap-2">
                                                    <span><Clock className="w-3 h-3 inline mr-1" /> Hoy, 14:23</span>
                                                    <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                                                    <span>Duración: 2d 4h</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#02C076] font-bold">+184.20 USDT</div>
                                            <div className="text-[#02C076] text-xs">+12.4%</div>
                                        </div>
                                    </div>

                                    {/* History List Item 2 */}
                                    <div className="bg-[#1E2329] border border-[#2B3139] hover:bg-[#2B3139]/50 transition-colors rounded-lg p-3 flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1 h-10 bg-[#F6465D] rounded-full" />
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-white text-sm">SOLUSDT Perp</span>
                                                    <span className="bg-[#2B3139] text-[#848E9C] text-[10px] px-1.5 py-0.5 rounded">Cerrada</span>
                                                </div>
                                                <div className="text-[#848E9C] text-xs flex items-center gap-2">
                                                    <span><Clock className="w-3 h-3 inline mr-1" /> Ayer, 09:15</span>
                                                    <span className="w-1 h-1 rounded-full bg-[#3A4149]"></span>
                                                    <span>Duración: 14h</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#F6465D] font-bold">-45.80 USDT</div>
                                            <div className="text-[#F6465D] text-xs">-3.2%</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Global style overrides specifically for inputs placeholder inside this component if needed */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #2B3139;
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #3A4149;
                }
            `}</style>

        </div>
    );
};

export default SimuladorComponent;
