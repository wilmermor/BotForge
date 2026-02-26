import { useState } from 'react';
import {
    Calendar,
    Search,
    RefreshCw,
    Maximize,
    Clock,
    BookOpen,
    CheckCircle2,
    ChevronDown,
    Info,
    RotateCcw
} from 'lucide-react';

import TradingViewWidget from './TradingViewWidget';

const SimuladorComponent = () => {
    const [activeTab, setActiveTab] = useState<'COMPRA' | 'VENTA'>('COMPRA');
    const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'Stop'>('Market');
    const [amount, setAmount] = useState('');

    const currentPrice = 44230.50;
    const isBuy = activeTab === 'COMPRA';
    const accentColor = isBuy ? 'bg-[#02C076]' : 'bg-[#F6465D]';
    const numAmount = parseFloat(amount) || 0;
    const totalAmount = numAmount * currentPrice;

    return (
        <div className="w-full h-full flex flex-col p-6 space-y-6">

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            Simulador de Trading
                        </h1>
                        <div className="bg-[#2B3139] px-3 py-1 rounded-full border border-[#3A4149] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#02C076] animate-pulse"></span>
                            <span className="text-xs font-medium text-[#848E9C]">MODO SIMULACIÓN | Fondos virtuales: $10,000</span>
                        </div>
                    </div>
                    <p className="text-[#848E9C] text-sm mt-1">
                        Prueba estrategias en tiempo real con datos de mercado
                    </p>
                </div>

                <div className="flex items-center gap-4 hidden md:flex">
                    <button className="flex items-center gap-2 text-[#848E9C] hover:text-[#FFFFFF] transition-colors text-sm font-medium">
                        <RotateCcw className="w-4 h-4" />
                        Resetear
                    </button>
                </div>
            </header>

            {/* Main Grid: 70 / 30 */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

                {/* LEFT COLUMN: Candlestick Chart (70%) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    {/* Top Selectors (Above Chart) */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            {/* Pair Selector */}
                            <button className="bg-[#1E2329] border border-[#2B3139] hover:border-[#3A4149] px-4 py-2 rounded-lg flex items-center gap-2 text-white font-medium transition-colors">
                                BTC/USDT <ChevronDown className="w-4 h-4 text-[#848E9C]" />
                            </button>

                            {/* Interval Tabs */}
                            <div className="hidden sm:flex items-center bg-[#1E2329] p-1 rounded-lg border border-[#2B3139]">
                                {['1m', '5m', '15m', '1h', '4h', '1d'].map((interval) => (
                                    <button
                                        key={interval}
                                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${interval === '1h'
                                            ? 'bg-[#2B3139] text-[#F0B90B] border-b-2 border-[#F0B90B] pb-[2px]'
                                            : 'text-[#848E9C] hover:text-white hover:bg-[#2B3139]/50'
                                            }`}
                                    >
                                        {interval}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Range Mode */}
                        <button className="hidden sm:flex items-center gap-2 text-[#848E9C] hover:text-white transition-colors text-sm font-medium">
                            <Calendar className="w-4 h-4" />
                            Últimas 100 velas <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Chart Container */}
                    <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] flex flex-col relative h-[450px] overflow-hidden">
                        <TradingViewWidget />
                    </div>

                    {/* Technical Indicators */}
                    <div className="flex items-center gap-4 w-full">
                        <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex-1 flex items-center justify-between">
                            <span className="text-[#848E9C] text-sm font-medium">RSI (14)</span>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">58.2</span>
                                <div className="w-16 h-1.5 bg-[#2B3139] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#F0B90B] w-[58%]" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex-1 flex items-center justify-between">
                            <span className="text-[#848E9C] text-sm font-medium">MACD (12,26)</span>
                            <span className="text-[#02C076] font-bold">Positivo</span>
                        </div>
                        <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 flex-1 flex items-center justify-between">
                            <span className="text-[#848E9C] text-sm font-medium">Volumen</span>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">2.4K</span>
                                <div className="flex items-end gap-[1px] h-4">
                                    <div className="w-1 h-2 bg-[#F6465D]" />
                                    <div className="w-1 h-3 bg-[#02C076]" />
                                    <div className="w-1 h-1 bg-[#F6465D]" />
                                    <div className="w-1 h-4 bg-[#02C076]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Buy/Sell Panel (30%) */}
                <div className="lg:col-span-3 flex flex-col h-full bg-[#1E2329] rounded-xl border border-[#2B3139] overflow-hidden">

                    {/* Live Price Header */}
                    <div className="p-5 border-b border-[#2B3139] bg-[#1E2329]">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[#848E9C] text-sm font-medium">Precio en tiempo real</span>
                            <span className="text-[#848E9C] text-xs">Saldo USDT: <span className="text-white font-medium">10,000.00</span></span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-white tracking-tight">$44,230.50</span>
                            <span className="text-[#02C076] font-semibold">+2.3%</span>
                        </div>
                    </div>

                    {/* Order Controls Container */}
                    <div className="flex-1 p-5 flex flex-col">

                        {/* BUY / SELL Tabs */}
                        <div className="flex p-1 bg-[#2B3139] rounded-lg mb-6">
                            <button
                                onClick={() => setActiveTab('COMPRA')}
                                className={`flex-1 py-3 text-sm font-bold rounded-md transition-all ${activeTab === 'COMPRA'
                                    ? 'bg-[#F0B90B] text-black shadow-md'
                                    : 'text-white hover:bg-[#3A4149]'
                                    }`}
                            >
                                COMPRA
                            </button>
                            <button
                                onClick={() => setActiveTab('VENTA')}
                                className={`flex-1 py-3 text-sm font-bold rounded-md transition-all ${activeTab === 'VENTA'
                                    ? 'bg-[#F6465D] text-white shadow-md'
                                    : 'text-white hover:bg-[#3A4149]'
                                    }`}
                            >
                                VENTA
                            </button>
                        </div>

                        {/* Order Type Badges */}
                        <div className="flex gap-2 mb-6">
                            {['Market', 'Limit', 'Stop'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setOrderType(type as any)}
                                    className={`px-3 py-1 text-xs font-semibold rounded ${orderType === type
                                        ? 'bg-[#F0B90B]/20 text-[#F0B90B] border border-[#F0B90B]/50'
                                        : 'bg-[#2B3139] text-[#848E9C] hover:text-white border border-transparent'
                                        } transition-colors`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm text-[#FFFFFF]">Cantidad</label>
                                    <span className="text-xs text-[#848E9C]">Disponible: 0.25 BTC</span>
                                </div>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-[#2B3139] border border-[#3A4149] group-hover:border-[#848E9C] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-3 text-white transition-colors"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] font-semibold">BTC</span>
                                </div>
                            </div>

                            {/* Percentage Buttons */}
                            <div className="grid grid-cols-4 gap-2">
                                {['25%', '50%', '75%', '100%'].map(pct => (
                                    <button
                                        key={pct}
                                        onClick={() => setAmount(pct === '100%' ? '0.25' : (0.25 * parseInt(pct) / 100).toString())}
                                        className="bg-[#1E2329] border border-[#2B3139] hover:bg-[#F0B90B]/10 hover:border-[#F0B90B]/50 hover:text-[#F0B90B] text-[#848E9C] text-xs font-medium py-1.5 rounded transition-colors"
                                    >
                                        {pct}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Real-time Calculation Card */}
                        <div className="bg-[#1E2329] border border-[#2B3139] shadow-inner p-4 rounded-lg mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[#848E9C] text-sm">Total a {isBuy ? 'pagar' : 'recibir'}:</span>
                                <span className="text-xl font-bold text-white">${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#848E9C] flex items-center gap-1">
                                    Comisión estimada <Info className="w-3 h-3" />
                                </span>
                                <span className="text-[#848E9C]">${(totalAmount * 0.0005).toFixed(2)} (0.05%)</span>
                            </div>
                        </div>

                        {/* Additional Market Data */}
                        <div className="grid grid-cols-2 gap-4 mb-6 pt-2 border-t border-[#2B3139]">
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Máx hoy</div>
                                <div className="text-white text-sm font-medium">$44,520</div>
                            </div>
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Mín hoy</div>
                                <div className="text-white text-sm font-medium">$43,980</div>
                            </div>
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Volumen 24h</div>
                                <div className="text-white text-sm font-medium">15.2K BTC</div>
                            </div>
                            <div>
                                <div className="text-[#848E9C] text-xs mb-1">Spread</div>
                                <div className="text-white text-sm font-medium">$2.50</div>
                            </div>
                        </div>

                        {/* Main Action Button */}
                        <div className="mt-auto">
                            <button
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${accentColor} ${activeTab === 'COMPRA' && 'text-white'}`}
                            >
                                {isBuy ? 'COMPRAR BTC' : 'VENDER BTC'}
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            {/* BOTTOM ROW: Positions Cards (100% Width) */}
            <div className="mt-4">
                <h3 className="text-lg font-bold text-white mb-4 px-1">Tus Posiciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Open Positions Card */}
                    <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-5 hover:border-[#3A4149] transition-colors group">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="flex items-center gap-2 text-white font-semibold">
                                <BookOpen className="w-5 h-5 text-[#848E9C]" />
                                Abiertas <span className="text-[#848E9C] font-normal">(4)</span>
                            </h4>
                        </div>
                        <div className="space-y-3">
                            {/* Pos 1 */}
                            <div className="flex justify-between items-center p-3 bg-[#0B0E11]/50 rounded-lg group-hover:bg-[#2B3139]/50 transition-colors cursor-pointer">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-white font-bold text-sm">BTC/USDT</span>
                                        <span className="bg-[#02C076]/20 text-[#02C076] text-[10px] font-bold px-1.5 py-0.5 rounded">LONG</span>
                                    </div>
                                    <div className="text-[#848E9C] text-xs">0.15 BTC</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[#02C076] font-bold text-sm">+$234.50</div>
                                </div>
                            </div>
                            {/* Pos 2 */}
                            <div className="flex justify-between items-center p-3 bg-[#0B0E11]/50 rounded-lg group-hover:bg-[#2B3139]/50 transition-colors cursor-pointer">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-white font-bold text-sm">ETH/USDT</span>
                                        <span className="bg-[#F6465D]/20 text-[#F6465D] text-[10px] font-bold px-1.5 py-0.5 rounded">SHORT</span>
                                    </div>
                                    <div className="text-[#848E9C] text-xs">1.2 ETH</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[#F6465D] font-bold text-sm">-$45.20</div>
                                </div>
                            </div>
                            <div className="text-center pt-2">
                                <button className="text-[#F0B90B] text-xs font-semibold hover:underline">Ver todas (4) ...</button>
                            </div>
                        </div>
                    </div>

                    {/* Closed Positions Card */}
                    <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-5 hover:border-[#3A4149] transition-colors group">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="flex items-center gap-2 text-white font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-[#848E9C]" />
                                Cerradas <span className="text-[#848E9C] font-normal">(12)</span>
                            </h4>
                            <span className="bg-[#02C076]/20 text-[#02C076] text-xs font-bold px-2 py-1 rounded-full">Win Rate 68%</span>
                        </div>
                        <div className="space-y-3">
                            {/* Op 1 */}
                            <div className="flex justify-between items-center p-3 bg-[#0B0E11]/50 rounded-lg group-hover:bg-[#2B3139]/50 transition-colors cursor-pointer">
                                <div>
                                    <div className="text-white font-bold text-sm mb-1">SOL/USDT</div>
                                    <div className="text-[#848E9C] text-xs">$98.50 → $112.30</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[#02C076] font-bold text-sm">+$207.00</div>
                                </div>
                            </div>
                            {/* Op 2 */}
                            <div className="flex justify-between items-center p-3 bg-[#0B0E11]/50 rounded-lg group-hover:bg-[#2B3139]/50 transition-colors cursor-pointer">
                                <div>
                                    <div className="text-white font-bold text-sm mb-1">ADA/USDT</div>
                                    <div className="text-[#848E9C] text-xs">$0.45 → $0.42</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[#F6465D] font-bold text-sm">-$30.00</div>
                                </div>
                            </div>
                            <div className="text-center pt-2">
                                <button className="text-[#F0B90B] text-xs font-semibold hover:underline">Historial completo...</button>
                            </div>
                        </div>
                    </div>

                    {/* Pending Orders Card */}
                    <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-5 hover:border-[#3A4149] transition-colors group">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="flex items-center gap-2 text-white font-semibold">
                                <Clock className="w-5 h-5 text-[#848E9C]" />
                                En Curso <span className="text-[#848E9C] font-normal">(2)</span>
                            </h4>
                            <button className="text-[#F6465D] text-xs font-semibold hover:underline">Cancelar todo</button>
                        </div>
                        <div className="space-y-3">
                            {/* Ord 1 */}
                            <div className="flex justify-between items-center p-3 bg-[#0B0E11]/50 rounded-lg group-hover:bg-[#2B3139]/50 transition-colors cursor-pointer">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-white font-bold text-sm">BNB/USDT</span>
                                        <span className="bg-[#F0B90B]/20 text-[#F0B90B] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#F0B90B]/30">LIMIT BUY</span>
                                    </div>
                                    <div className="text-[#848E9C] text-xs">0.5 BNB @ $315.00</div>
                                </div>
                                <div className="text-right flex items-center justify-end">
                                    <Clock className="w-4 h-4 text-[#848E9C] opacity-50" />
                                </div>
                            </div>
                            {/* Ord 2 */}
                            <div className="flex justify-between items-center p-3 bg-[#0B0E11]/50 rounded-lg group-hover:bg-[#2B3139]/50 transition-colors cursor-pointer">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-white font-bold text-sm">BTC/USDT</span>
                                        <span className="bg-[#F6465D]/20 text-[#F6465D] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#F6465D]/30">STOP LOSS</span>
                                    </div>
                                    <div className="text-[#848E9C] text-xs">0.1 BTC @ $43,500</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[#848E9C] text-xs border border-[#3A4149] px-2 py-0.5 rounded">Activo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default SimuladorComponent;
