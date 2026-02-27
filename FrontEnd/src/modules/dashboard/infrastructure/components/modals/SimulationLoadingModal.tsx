import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export type SimulationStatus = 'idle' | 'simulating' | 'completed' | 'error';

interface SimulationLoadingModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: SimulationStatus;
    message?: string;
}

export const SimulationLoadingModal: React.FC<SimulationLoadingModalProps> = ({
    isOpen,
    onClose,
    status,
    message
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: any;
        if (isOpen && status === 'simulating') {
            setProgress(0);

            // Animación asintótica: avanza rápido al principio y se frena 
            // al acercarse al final, hasta que el status cambie a 'completed'
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev < 30) return prev + 2;      // Rápido hasta 30%
                    if (prev < 60) return prev + 0.5;    // Normal hasta 60%
                    if (prev < 90) return prev + 0.1;    // Lento hasta 90%
                    if (prev < 98) return prev + 0.02;   // Muy lento al final
                    return prev;
                });
            }, 100);
        } else if (status === 'completed') {
            setProgress(100);
        }

        return () => clearInterval(interval);
    }, [isOpen, status]);

    if (!isOpen) return null;

    const getStatusConfig = () => {
        switch (status) {
            case 'completed':
                return {
                    bg: 'bg-[#02C076]',
                    text: 'text-[#02C076]',
                    label: 'SIMULACIÓN COMPLETADA',
                    Icon: CheckCircle2,
                    title: '¡Simulación Exitosa!',
                    description: 'La estrategia ha sido procesada correctamente con los datos históricos.'
                };
            case 'error':
                return {
                    bg: 'bg-[#F6465D]',
                    text: 'text-[#F6465D]',
                    label: 'ERROR EN SIMULACIÓN',
                    Icon: AlertTriangle,
                    title: 'Hubo un problema',
                    description: message || 'No se pudo completar la simulación. Por favor, revisa los parámetros e intenta de nuevo.'
                };
            default:
                return {
                    bg: 'bg-[#F0B90B]',
                    text: 'text-[#F0B90B]',
                    label: 'SIMULANDO...',
                    Icon: TrendingUp,
                    title: 'Procesando Estrategia',
                    description: 'Estamos analizando los datos del mercado y ejecutando tu configuración...'
                };
        }
    };

    const config = getStatusConfig();
    const StatusIcon = config.Icon;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={status !== 'simulating' ? onClose : undefined}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[500px] bg-[#1E2329] border border-[#2B3139] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">

                {/* Header Section */}
                <div className="p-6 pb-4 border-b border-[#2B3139] flex justify-between items-start">
                    <span className={`${config.bg} text-black font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider`}>
                        {config.label}
                    </span>
                    {status !== 'simulating' && (
                        <button
                            onClick={onClose}
                            className="text-[#848E9C] hover:text-[#F0B90B] transition-colors p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="p-8 flex flex-col items-center text-center">
                    {/* Animation / Icon Container */}
                    <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                        {status === 'simulating' ? (
                            <div className="w-full h-full relative">
                                {/* Pulse Effect */}
                                <div className="absolute inset-0 bg-[#F0B90B]/10 rounded-full animate-ping" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg viewBox="0 0 100 100" className="w-24 h-24">
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#F0B90B" stopOpacity="0" />
                                                <stop offset="50%" stopColor="#F0B90B" stopOpacity="1" />
                                                <stop offset="100%" stopColor="#F0B90B" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {/* Animated Path */}
                                        <path
                                            d="M 10 70 Q 25 30 40 60 T 70 40 T 90 20"
                                            fill="none"
                                            stroke="#2B3139"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M 10 70 Q 25 30 40 60 T 70 40 T 90 20"
                                            fill="none"
                                            stroke="#F0B90B"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeDasharray="200"
                                            strokeDashoffset="200"
                                            className="animate-chart-line"
                                        />
                                        {/* Moving Dot */}
                                        <circle r="3" fill="#F0B90B" className="animate-chart-dot">
                                            <animateMotion
                                                path="M 10 70 Q 25 30 40 60 T 70 40 T 90 20"
                                                dur="2s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className={`w-24 h-24 rounded-full ${status === 'completed' ? 'bg-[#02C076]/10' : 'bg-[#F6465D]/10'} flex items-center justify-center animate-in zoom-in-50 duration-300`}>
                                <StatusIcon className={`w-12 h-12 ${config.text}`} />
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        {config.title}
                    </h2>
                    <p className="text-[#848E9C] text-sm leading-relaxed max-w-[280px]">
                        {config.description}
                    </p>

                    {/* Progress Bar (Only when simulating) */}
                    {status === 'simulating' && (
                        <div className="w-full mt-8 bg-[#2B3139] h-1 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#F0B90B] transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Footer / Action */}
                <div className="p-6 pt-0 border-t border-transparent flex justify-center">
                    {status !== 'simulating' ? (
                        <button
                            onClick={onClose}
                            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${status === 'completed' ? 'bg-[#02C076] hover:bg-[#02C076]/90' : 'bg-[#2B3139] hover:bg-[#3A4149]'}`}
                        >
                            {status === 'completed' ? 'Ver Resultados' : 'Cerrar'}
                        </button>
                    ) : (
                        <div className="text-[#848E9C] text-[10px] font-medium tracking-[0.2em] uppercase">
                            No cierre esta ventana
                        </div>
                    )}
                </div>

                <style>{`
                    .animate-chart-line {
                        animation: chartFill 2s infinite alternate ease-in-out;
                    }
                    @keyframes chartFill {
                        from { stroke-dashoffset: 200; }
                        to { stroke-dashoffset: 0; }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.3s ease-out;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
};
