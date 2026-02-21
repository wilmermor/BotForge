
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Smartphone, Building2, Bitcoin } from 'lucide-react';
import CheckoutProgressBar from '../components/CheckoutProgressBar';

const SuccessPage = () => {
    const navigate = useNavigate();

    // Mock data - in a real app this would come from state/context/url params
    const transaction = {
        method: 'mobile', // 'mobile', 'transfer', 'crypto'
        plan: 'Plan Pro - Mensual',
        amount: '$29.99 USD',
        date: '15 Feb 2026, 14:32',
        reference: '1234-5678-9012',
    };

    const getMethodIcon = () => {
        switch (transaction.method) {
            case 'mobile': return <Smartphone className="h-5 w-5 text-white" />;
            case 'transfer': return <Building2 className="h-5 w-5 text-white" />;
            case 'crypto': return <Bitcoin className="h-5 w-5 text-[#F0B90B]" />;
            default: return <CheckCircle className="h-5 w-5 text-white" />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">

            {/* Success Icon */}
            <div className="mb-6 relative">
                <div className="absolute inset-0 bg-[#02C076]/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative h-24 w-24 bg-[#1E2329] rounded-full border-4 border-[#02C076] flex items-center justify-center shadow-[0_0_30px_rgba(2,192,118,0.3)]">
                    <CheckCircle className="h-12 w-12 text-[#02C076]" />
                </div>
            </div>

            <CheckoutProgressBar step={3} />

            <h1 className="text-4xl font-bold text-white mb-2">¡Pago recibido con éxito!</h1>
            <p className="text-[#848E9C] text-lg mb-10 max-w-md mx-auto">
                Tu suscripción ha sido activada.<br />Bienvenido a Backtesting Pro
            </p>

            {/* Transaction Details */}
            <div className="w-full max-w-lg bg-[#1E2329] rounded-xl border border-[#2B3139] p-6 mb-8 text-left">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2 pb-4 border-b border-[#2B3139]">
                    Detalles de la transacción
                </h3>

                <div className="grid grid-cols-2 gap-y-6">
                    <div>
                        <span className="block text-xs text-[#848E9C] uppercase tracking-wider mb-1">Método</span>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-[#2B3139] rounded">
                                {getMethodIcon()}
                            </div>
                            <span className="text-white font-medium capitalize">{transaction.method}</span>
                        </div>
                    </div>

                    <div>
                        <span className="block text-xs text-[#848E9C] uppercase tracking-wider mb-1">Plan</span>
                        <span className="text-white font-medium block">{transaction.plan}</span>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#02C076]/10 text-[#02C076] text-[10px] font-bold rounded">ACTIVO</span>
                    </div>

                    <div>
                        <span className="block text-xs text-[#848E9C] uppercase tracking-wider mb-1">Monto</span>
                        <span className="text-white font-bold text-lg">{transaction.amount}</span>
                    </div>

                    <div>
                        <span className="block text-xs text-[#848E9C] uppercase tracking-wider mb-1">Fecha</span>
                        <span className="text-white">{transaction.date}</span>
                    </div>

                    <div className="col-span-2 p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139] flex justify-between items-center group cursor-pointer hover:border-[#F0B90B] transition-colors">
                        <div>
                            <span className="block text-xs text-[#848E9C] uppercase tracking-wider mb-0.5">Referencia</span>
                            <span className="text-white font-mono">{transaction.reference}</span>
                        </div>
                        <span className="text-xs text-[#F0B90B] opacity-0 group-hover:opacity-100 transition-opacity">Copiar</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-4 bg-[#F0B90B] text-black font-bold rounded-lg hover:bg-[#FCD535] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#F0B90B]/20 flex items-center justify-center gap-2"
                >
                    Ir a mi Dashboard <ArrowRight className="h-5 w-5" />
                </button>
                <button className="text-[#848E9C] text-sm hover:text-white transition-colors">
                    Ver detalles de la suscripción
                </button>
            </div>

        </div>
    );
};

export default SuccessPage;
