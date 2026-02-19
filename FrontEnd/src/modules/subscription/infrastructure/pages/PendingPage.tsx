
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, RefreshCw, Smartphone, Building2, Bitcoin } from 'lucide-react';

const PendingPage = () => {
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(false);

    // Mock data
    const transaction = {
        method: 'mobile', // 'mobile', 'transfer', 'crypto'
        plan: 'Plan Pro - Mensual',
        amount: '$29.99 USD',
        date: '18 Feb 2026, 21:05',
        reference: '1234-5678-9012',
    };

    const handleVerify = () => {
        setIsVerifying(true);
        // Simulate verification logic
        setTimeout(() => {
            setIsVerifying(false);
            // In a real app, you would check status and redirect if needed
        }, 2000);
    };

    const getMethodIcon = () => {
        switch (transaction.method) {
            case 'mobile': return <Smartphone className="h-5 w-5 text-white" />;
            case 'transfer': return <Building2 className="h-5 w-5 text-white" />;
            case 'crypto': return <Bitcoin className="h-5 w-5 text-[#F0B90B]" />;
            default: return <Clock className="h-5 w-5 text-white" />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">

            {/* Pending Icon */}
            <div className="mb-6 relative">
                <div className="absolute inset-0 bg-[#F0B90B]/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative h-24 w-24 bg-[#1E2329] rounded-full border-4 border-[#F0B90B] flex items-center justify-center shadow-[0_0_30px_rgba(240,185,11,0.3)]">
                    <Clock className={`h-12 w-12 text-[#F0B90B] ${isVerifying ? 'animate-spin' : ''}`} />
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">Esperando confirmación del pago</h1>
                {isVerifying && <RefreshCw className="h-8 w-8 text-[#F0B90B] animate-spin" />}
            </div>

            <p className="text-[#848E9C] text-lg mb-10 max-w-md mx-auto">
                Tu transacción está siendo procesada.<br />Esto puede tomar unos segundos.
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
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#F0B90B]/10 text-[#F0B90B] text-[10px] font-bold rounded uppercase">PENDIENTE</span>
                    </div>

                    <div>
                        <span className="block text-xs text-[#848E9C] uppercase tracking-wider mb-1">Monto</span>
                        <span className="text-white font-bold text-lg">{transaction.amount}</span>
                    </div>

                    <div>
                        <span className="block text-xs text-[#848E9C] uppercase tracking-wider mb-1">Fecha</span>
                        <span className="text-white">{transaction.date}</span>
                    </div>

                    <div
                        className="col-span-2 p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139] flex justify-between items-center group cursor-pointer hover:border-[#F0B90B] transition-colors"
                        onClick={() => navigator.clipboard.writeText(transaction.reference)}
                    >
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
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="w-full py-4 bg-[#F0B90B] text-black font-bold rounded-lg hover:bg-[#FCD535] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#F0B90B]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isVerifying ? 'Verificando...' : 'Verificar estado'}
                    {!isVerifying && <RefreshCw className="h-5 w-5" />}
                </button>
                <button
                    onClick={() => navigate('/checkout/payment')} // Or wherever the payment selection page is
                    className="text-[#848E9C] text-sm hover:text-white transition-colors"
                >
                    Volver a intentar
                </button>
            </div>

        </div>
    );
};

export default PendingPage;
