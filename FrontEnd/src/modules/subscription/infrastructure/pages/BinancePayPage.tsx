
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Bitcoin, AlertTriangle, CheckCircle } from 'lucide-react';

const BinancePayPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('/checkout/payment')} className="p-2 hover:bg-[#2B3139] rounded-full text-[#848E9C] hover:text-[#F0B90B] transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        Binance Pay <Bitcoin className="text-[#F0B90B] h-8 w-8" />
                    </h1>
                    <p className="text-[#848E9C]">Paga con USDT vía Binance Pay. Red BSC.</p>
                </div>
            </div>

            {/* Step 1: Datos */}
            <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2B3139] text-[#F0B90B] text-xs font-bold">1</span>
                    Datos de pago
                </h3>

                <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* QR Code Placeholder */}
                        <div className="flex flex-col items-center p-6 bg-[#0B0E11] rounded-xl border border-[#2B3139]">
                            <div className="w-48 h-48 bg-white p-2 rounded-lg mb-4">
                                {/* Simulated QR */}
                                <div className="w-full h-full bg-black pattern-grid-lg grayscale"></div>
                            </div>
                            <span className="text-[#848E9C] text-sm">Escanea con app de Binance</span>
                            <div className="mt-2 text-xs text-[#F0B90B] bg-[#F0B90B]/10 px-2 py-1 rounded">QR válido por 30 min</div>
                        </div>

                        {/* Manual Data */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm text-[#848E9C]">Monto exacto</label>
                                <div className="text-3xl font-bold text-white">29.99 USDT</div>
                                <div className="text-xs text-[#848E9C]">≈ $29.99 USD</div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm text-[#848E9C]">ID de usuario / Email</label>
                                <div className="flex items-center justify-between p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139]">
                                    <span className="text-white font-mono">765 432 109</span>
                                    <Copy className="h-4 w-4 text-[#848E9C] cursor-pointer hover:text-[#F0B90B]" />
                                </div>
                            </div>

                            <div className="p-4 bg-[#F6465D]/10 border border-[#F6465D]/30 rounded-lg flex gap-3">
                                <AlertTriangle className="h-5 w-5 text-[#F6465D] flex-shrink-0" />
                                <div>
                                    <h4 className="text-[#F6465D] font-bold text-sm">Advertencia de Red</h4>
                                    <p className="text-[#F6465D]/80 text-xs mt-1">Usar SOLO red BSC (BEP-20). Otras redes resultarán en pérdida de fondos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 2: Confirm */}
            <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2B3139] text-[#F0B90B] text-xs font-bold">2</span>
                    Confirma tu pago
                </h3>

                <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6">
                    <form onSubmit={(e) => { e.preventDefault(); navigate('/checkout/success'); }}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-white mb-2">TXID (Transaction ID)</label>
                            <input type="text" placeholder="Ej. 0x1a2b3c4d5e6f..." className="block w-full rounded-lg border border-[#3A4149] bg-[#2B3139] p-3 text-white font-mono placeholder:font-sans focus:ring-1 focus:ring-[#F0B90B] outline-none" required />
                            <p className="mt-1 text-xs text-[#848E9C]">Lo encuentras en el historial de Binance.</p>
                        </div>

                        <div className="flex items-start gap-2 mb-6">
                            <input type="checkbox" id="network-confirm" className="mt-1 rounded border-[#3A4149] bg-[#2B3139] text-[#F0B90B]" required />
                            <label htmlFor="network-confirm" className="text-sm text-[#EAECEF]">
                                Confirmo que usé la red <span className="text-[#F0B90B] font-bold">BSC (BEP-20)</span> para el pago.
                            </label>
                        </div>

                        <button type="submit" className="w-full py-3 bg-[#F0B90B] text-black font-bold rounded-lg hover:bg-[#FCD535] transition-colors flex justify-center items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Verificar y Confirmar Pago
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BinancePayPage;
