
import { useNavigate } from 'react-router-dom';
import { Smartphone, Building2, Bitcoin } from 'lucide-react';
import CheckoutProgressBar from '../components/CheckoutProgressBar';

const PaymentMethodPage = () => {
    const navigate = useNavigate();

    return (

        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Método de pago</h1>
                <p className="text-[#848E9C]">Selecciona cómo quieres pagar tu suscripción.</p>
                <CheckoutProgressBar step={2} />
            </div>

            <div className="space-y-4">
                {/* Pago Móvil */}
                <div
                    onClick={() => navigate('/checkout/payment/mobile')}
                    className="group bg-[#1E2329] p-6 rounded-xl border border-[#2B3139] cursor-pointer hover:border-[#F0B90B] transition-all duration-200 relative"
                >
                    <div className="absolute right-6 top-6">
                        <div className="h-5 w-5 rounded-full border-2 border-[#474D57] group-hover:border-[#F0B90B]"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="p-3 bg-[#2B3139] rounded-lg mr-4 group-hover:bg-[#F0B90B]/10 transition-colors">
                            <Smartphone className="h-8 w-8 text-white group-hover:text-[#F0B90B]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-white group-hover:text-[#F0B90B] transition-colors">Pago Móvil</h3>
                                <span className="bg-[#F0B90B] text-black text-[10px] font-bold px-2 py-0.5 rounded">RÁPIDO</span>
                            </div>
                            <p className="text-sm text-[#848E9C] mt-1">Paga desde tu banca en línea con tu teléfono. Inmediato y seguro.</p>
                        </div>
                    </div>
                </div>

                {/* Transferencia Bancaria */}
                <div
                    onClick={() => navigate('/checkout/payment/transfer')}
                    className="group bg-[#1E2329] p-6 rounded-xl border border-[#2B3139] cursor-pointer hover:border-[#F0B90B] transition-all duration-200 relative"
                >
                    <div className="absolute right-6 top-6">
                        <div className="h-5 w-5 rounded-full border-2 border-[#474D57] group-hover:border-[#F0B90B]"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="p-3 bg-[#2B3139] rounded-lg mr-4 group-hover:bg-[#F0B90B]/10 transition-colors">
                            <Building2 className="h-8 w-8 text-white group-hover:text-[#F0B90B]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-[#F0B90B] transition-colors">Transferencia Bancaria</h3>
                            <p className="text-sm text-[#848E9C] mt-1">Transferencia desde cualquier banco nacional. Procesamos en horario bancario.</p>
                        </div>
                    </div>
                </div>

                {/* Binance Pay */}
                <div
                    onClick={() => navigate('/checkout/payment/crypto')}
                    className="group bg-[#1E2329] p-6 rounded-xl border border-[#2B3139] cursor-pointer hover:border-[#F0B90B] transition-all duration-200 relative"
                >
                    <div className="absolute right-6 top-6">
                        <div className="h-5 w-5 rounded-full border-2 border-[#474D57] group-hover:border-[#F0B90B]"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="p-3 bg-[#2B3139] rounded-lg mr-4 group-hover:bg-[#F0B90B]/10 transition-colors">
                            <Bitcoin className="h-8 w-8 text-[#F0B90B]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-white group-hover:text-[#F0B90B] transition-colors">Binance Pay (USDT)</h3>
                                <span className="bg-[#2B3139] text-[#F0B90B] text-[10px] font-bold px-2 py-0.5 rounded border border-[#F0B90B]/20">CRYPTO</span>
                            </div>
                            <p className="text-sm text-[#848E9C] mt-1">Paga con criptomonedas vía Binance. Rápido y sin fronteras. Red BSC.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <button
                    onClick={() => navigate('/checkout/plan')}
                    className="text-[#848E9C] hover:text-white font-medium text-sm transition-colors"
                >
                    Volver
                </button>
                <div className="flex items-center gap-2">
                    <button
                        disabled
                        className="px-8 py-3 bg-[#2B3139] text-[#848E9C] rounded-lg font-bold cursor-not-allowed"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodPage;
