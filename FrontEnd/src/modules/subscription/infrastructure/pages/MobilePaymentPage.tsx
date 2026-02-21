
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Info, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useCurrencyConversion } from '../../../shared/infrastructure/hooks/useCurrencyConversion';
import CheckoutProgressBar from '../components/CheckoutProgressBar';

const MobilePaymentPage = () => {
    const navigate = useNavigate();
    const [reference, setReference] = useState('');
    const [bank, setBank] = useState('');
    const { amountInBs, rate, loading } = useCurrencyConversion(29.99);


    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        // Toast notification would go here
    };

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/checkout/pending');
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('/checkout/payment')} className="p-2 hover:bg-[#2B3139] rounded-full text-[#848E9C] hover:text-[#F0B90B] transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        Pago Móvil
                    </h1>
                    <p className="text-[#848E9C]">Completa los siguientes pasos para activar tu suscripción</p>
                </div>
            </div>

            <div className="mb-8">
                <CheckoutProgressBar step={2} />
            </div>

            {/* Step 1: Realiza el pago */}
            <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2B3139] text-[#F0B90B] text-xs font-bold">1</span>
                    Realiza el pago
                </h3>

                <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6">
                    <div className="mb-6">
                        <span className="text-sm text-[#848E9C]">Monto a pagar</span>
                        <div className="flex items-end gap-3 mt-1">
                            {loading ? (
                                <div className="flex items-center gap-2 text-[#F0B90B]">
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span className="text-lg">Calculando...</span>
                                </div>
                            ) : (
                                <h2 className="text-3xl font-bold text-white">{amountInBs} Bs.</h2>
                            )}
                            <span className="mb-1.5 px-2 py-0.5 rounded bg-[#2B3139] text-[#F0B90B] text-xs font-bold">Monto exacto</span>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <span className="text-sm text-[#848E9C]">Teléfono</span>
                            <div className="flex items-center justify-between p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139]">
                                <span className="text-white font-mono">0412-1234567</span>
                                <button onClick={() => handleCopy('0412-1234567')} className="text-[#848E9C] hover:text-[#F0B90B]">
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <span className="text-sm text-[#848E9C]">Banco destino</span>
                            <div className="flex items-center justify-between p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139]">
                                <span className="text-white font-medium">Banco de Venezuela</span>
                                <button onClick={() => handleCopy('Banco de Venezuela')} className="text-[#848E9C] hover:text-[#F0B90B]">
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <span className="text-sm text-[#848E9C]">Cédula/RIF</span>
                            <div className="flex items-center justify-between p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139]">
                                <span className="text-white font-mono">V-12345678-9</span>
                                <button onClick={() => handleCopy('V-12345678-9')} className="text-[#848E9C] hover:text-[#F0B90B]">
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-start gap-3 p-4 bg-[#2B3139]/50 rounded-lg border-l-4 border-[#F0B90B]">
                        <Info className="h-5 w-5 text-[#F0B90B] flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-[#848E9C]">
                            <p>El pago debe ser exactamente por este monto para activar tu plan automáticamente.</p>
                            {!loading && rate && (
                                <p className="mt-1 text-xs">Tasa BCV: {rate.toLocaleString('es-VE')} Bs/USD</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Step 2: Confirma */}
            <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2B3139] text-[#F0B90B] text-xs font-bold">2</span>
                    Confirma tu pago
                </h3>

                <form onSubmit={handleConfirm} className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6 space-y-6">
                    <div>
                        <label htmlFor="reference" className="block text-sm font-medium text-white mb-2">
                            Número de referencia de tu pago
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="reference"
                                required
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                className="block w-full rounded-lg border border-[#3A4149] bg-[#2B3139] p-3 text-white placeholder-[#848E9C] focus:border-[#F0B90B] focus:ring-1 focus:ring-[#F0B90B] outline-none"
                                placeholder="Ej. 1234567890"
                            />
                            {reference.length > 4 && (
                                <div className="absolute right-3 top-3.5 text-[#02C076]">
                                    <Check className="h-5 w-5" />
                                </div>
                            )}
                        </div>
                        <p className="mt-1 text-xs text-[#848E9C]">Lo encuentras en el voucher de tu banco.</p>
                    </div>

                    <div>
                        <label htmlFor="bank" className="block text-sm font-medium text-white mb-2">
                            Banco desde donde pagaste
                        </label>
                        <select
                            id="bank"
                            required
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                            className="block w-full rounded-lg border border-[#3A4149] bg-[#2B3139] p-3 text-white focus:border-[#F0B90B] focus:ring-1 focus:ring-[#F0B90B] outline-none"
                        >
                            <option value="">Selecciona tu banco</option>
                            <option value="venezuela">Banco de Venezuela</option>
                            <option value="banesco">Banesco</option>
                            <option value="mercantil">Mercantil</option>
                            <option value="provincial">Provincial</option>
                        </select>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-black bg-[#F0B90B] hover:bg-[#FCD535] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0B90B] transition-colors"
                        >
                            Confirmar Pago
                        </button>
                        <p className="mt-4 text-center text-xs text-[#848E9C]">
                            Al confirmar, tu suscripción quedará pendiente de validación manual (aprox. 15 min).
                        </p>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default MobilePaymentPage;
