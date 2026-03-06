import { X, Activity, Info, AlertTriangle, CheckCircle2, TrendingDown, Gift } from 'lucide-react';
import type { NotificationItem, NotificationType } from '../NotificacionesComponent';

interface NotificationDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    notification: NotificationItem | null;
}

export const NotificationDetailModal = ({ isOpen, onClose, notification }: NotificationDetailModalProps) => {
    if (!isOpen || !notification) return null;

    const getTypeConfig = (type: NotificationType) => {
        switch (type) {
            case 'success': return { bg: 'bg-[#02C076]', text: 'text-[#02C076]', label: 'Éxito', Icon: CheckCircle2 };
            case 'error': return { bg: 'bg-[#F6465D]', text: 'text-[#F6465D]', label: 'Error', Icon: X };
            case 'urgent': return { bg: 'bg-[#F6465D]', text: 'text-[#F6465D]', label: 'Error', Icon: TrendingDown };
            case 'alert': return { bg: 'bg-[#F0B90B]', text: 'text-[#F0B90B]', label: 'Alerta', Icon: AlertTriangle };
            case 'info': return { bg: 'bg-[#848E9C]', text: 'text-[#848E9C]', label: 'Info', Icon: Info };
            case 'promo': return { bg: 'bg-[#F0B90B]', text: 'text-[#F0B90B]', label: 'Promoción', Icon: Gift };
            default: return { bg: 'bg-[#848E9C]', text: 'text-[#848E9C]', label: 'Info', Icon: Info };
        }
    };

    const config = getTypeConfig(notification.type);
    const TypeIcon = config.Icon;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[600px] bg-[#1E2329] border border-[#2B3139] rounded-2xl shadow-[0_20px_30px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header Profile */}
                <div className="p-6 pb-4 border-b border-[#2B3139] shrink-0">
                    <div className="flex justify-between items-start mb-4">
                        <span className={`${config.bg} text-white font-bold text-xs px-2 py-0.5 rounded uppercase tracking-wide`}>
                            {config.label}
                        </span>
                        <button
                            onClick={onClose}
                            className="text-[#848E9C] hover:text-[#F0B90B] transition-colors p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className={`w-12 h-12 rounded-full bg-[#2B3139] flex items-center justify-center shrink-0`}>
                            <TypeIcon className={`w-6 h-6 ${config.text}`} />
                        </div>
                        <div>
                            <h2 className="text-[22px] font-bold text-white leading-tight mb-1">
                                {notification.title}
                            </h2>
                            <p className="text-[#848E9C] text-sm">
                                {new Date(notification.createdAt).toLocaleString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scrollable Body Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">

                    {/* Universal Message if Info/System */}
                    {(!notification.details) && (
                        <div className="bg-[#2B3139]/50 rounded-xl p-4 mb-6 relative">
                            <p className="text-white text-[15px] leading-relaxed relative z-10">
                                {notification.message}
                            </p>
                        </div>
                    )}

                    {/* Bot Executive Summary */}
                    {notification.category === 'Bots' && notification.details && (
                        <>
                            <div className="bg-[#2B3139] rounded-xl p-4 mb-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[#848E9C] text-xs mb-1">Estado:</p>
                                            <p className="text-[#02C076] font-medium">{notification.details.statusDisplay}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#848E9C] text-xs mb-1">Bot asociado:</p>
                                            <p className="text-white font-medium">Grid Pro - ETH/USDT</p>
                                        </div>
                                        <div>
                                            <p className="text-[#848E9C] text-xs mb-1">Duración:</p>
                                            <p className="text-white font-medium">{notification.details.duration}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[#848E9C] text-xs mb-1">Total operaciones:</p>
                                            <p className="text-white font-medium">{notification.details.trades} trades</p>
                                        </div>
                                        <div>
                                            <p className="text-[#848E9C] text-xs mb-1">Profit total:</p>
                                            <p className="text-[#02C076] font-bold">{notification.details.profitStr}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#848E9C] text-xs mb-1">Win rate:</p>
                                            <p className="text-white font-medium">{notification.details.winRate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-white text-lg font-bold mb-3">Rendimiento del Bot</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 text-center">
                                    <p className="text-[#848E9C] text-xs mb-1">Compras</p>
                                    <p className="text-white font-bold">{notification.details.buyCount}</p>
                                </div>
                                <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 text-center">
                                    <p className="text-[#848E9C] text-xs mb-1">Ventas</p>
                                    <p className="text-white font-bold">{notification.details.sellCount}</p>
                                </div>
                                <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 text-center">
                                    <p className="text-[#848E9C] text-xs mb-1">Mayor ganancia</p>
                                    <p className="text-[#02C076] font-bold">{notification.details.maxWin}</p>
                                </div>
                                <div className="bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 text-center">
                                    <p className="text-[#848E9C] text-xs mb-1">Mayor pérdida</p>
                                    <p className="text-[#F6465D] font-bold">{notification.details.maxLoss}</p>
                                </div>
                            </div>

                            {/* Conceptual Equity Chart */}
                            <div className="w-full h-20 bg-[#2B3139] rounded-lg flex items-center justify-center border border-[#3E454D] mb-6 overflow-hidden relative">
                                <Activity className="w-6 h-6 text-[#848E9C]/30 absolute" />
                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-50">
                                    <path d="M0,80 Q10,70 20,60 T40,50 T60,20 T80,30 T100,10 L100,100 L0,100 Z" fill="#02C076" fillOpacity="0.1" />
                                    <polyline points="0,80 20,60 40,50 60,20 80,30 100,10" fill="none" stroke="#02C076" strokeWidth="2" />
                                </svg>
                            </div>
                        </>
                    )}

                    {/* Position Detailed Summary */}
                    {notification.category === 'Posiciones' && notification.details && (
                        <>
                            <h3 className="text-white text-lg font-bold mb-3">Detalles de la Posición</h3>
                            <div className="bg-[#2B3139] rounded-xl p-4 mb-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2">
                                    <div>
                                        <p className="text-[#848E9C] text-xs mb-1">Par:</p>
                                        <p className="text-white font-bold">{notification.details.pair}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#848E9C] text-xs mb-1">Tipo:</p>
                                        <p className={`${notification.details.direction === 'Long' ? 'text-[#02C076]' : 'text-[#F6465D]'} font-bold`}>{notification.details.direction}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#848E9C] text-xs mb-1">Leverage:</p>
                                        <p className="text-white font-medium">{notification.details.leverage}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#848E9C] text-xs mb-1">Estado:</p>
                                        <p className="text-[#F6465D] font-medium">{notification.details.statusDisplay}</p>
                                    </div>

                                    <div>
                                        <p className="text-[#848E9C] text-xs mb-1">Entrada:</p>
                                        <p className="text-white font-medium">{notification.details.entry}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#848E9C] text-xs mb-1">Liquidación:</p>
                                        <p className="text-white font-medium">{notification.details.exit}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#848E9C] text-xs mb-1">Cantidad:</p>
                                        <p className="text-white font-medium">{notification.details.qty}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#848E9C] text-xs mb-1">P&L:</p>
                                        <p className="text-[#F6465D] font-bold">{notification.details.pnl}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Meta data removed */}
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-[#2B3139] bg-[#1E2329] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#3E454D] bg-[#2B3139] text-[#F0B90B] focus:ring-[#F0B90B] focus:ring-offset-[#1E2329]" />
                        <span className="text-sm text-[#848E9C] group-hover:text-white transition-colors">No volver a mostrar esta alerta</span>
                    </label>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <button
                            onClick={onClose}
                            className="flex-1 sm:flex-none px-4 py-2 bg-[#2B3139] text-white hover:bg-[#3E454D] rounded-lg font-medium transition-colors text-sm"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
