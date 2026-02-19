
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Info, UploadCloud, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useCurrencyConversion } from '../../../shared/infrastructure/hooks/useCurrencyConversion';

const BankTransferPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'reference' | 'receipt'>('reference');
    const { amountInBs, rate, loading } = useCurrencyConversion(29.99);


    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('/checkout/payment')} className="p-2 hover:bg-[#2B3139] rounded-full text-[#848E9C] hover:text-[#F0B90B] transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        Transferencia Bancaria
                    </h1>
                    <p className="text-[#848E9C]">Realiza la transferencia y confirma los datos</p>
                </div>
            </div>

            {/* Step 1: Realiza la transferencia */}
            <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2B3139] text-[#F0B90B] text-xs font-bold">1</span>
                    Datos bancarios
                </h3>

                <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6">
                    <div className="mb-6">
                        <span className="text-sm text-[#848E9C]">Monto a transferir</span>
                        <div className="flex items-end gap-3 mt-1">
                            {loading ? (
                                <div className="flex items-center gap-2 text-[#F0B90B]">
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span className="text-lg">Calculando...</span>
                                </div>
                            ) : (
                                <h2 className="text-3xl font-bold text-white">{amountInBs} Bs.</h2>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-sm text-[#848E9C]">Banco</span>
                                <div className="p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139] flex justify-between items-center">
                                    <span className="text-white">Banco Mercantil</span>
                                    <Copy className="h-4 w-4 text-[#848E9C] cursor-pointer hover:text-[#F0B90B]" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm text-[#848E9C]">Titular</span>
                                <div className="p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139] flex justify-between items-center">
                                    <span className="text-white">Backtesting Pro, C.A.</span>
                                    <Copy className="h-4 w-4 text-[#848E9C] cursor-pointer hover:text-[#F0B90B]" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <span className="text-sm text-[#848E9C]">Número de cuenta</span>
                            <div className="p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139] flex justify-between items-center">
                                <span className="text-white font-mono tracking-wider">0105-0123-45-1234567890</span>
                                <Copy className="h-4 w-4 text-[#848E9C] cursor-pointer hover:text-[#F0B90B]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-sm text-[#848E9C]">RIF</span>
                                <div className="p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139] flex justify-between items-center">
                                    <span className="text-white font-mono">J-12345678-9</span>
                                    <Copy className="h-4 w-4 text-[#848E9C] cursor-pointer hover:text-[#F0B90B]" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm text-[#848E9C]">Tipo de Cuenta</span>
                                <div className="p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139] flex justify-between items-center">
                                    <span className="text-white">Corriente</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-start gap-3 p-4 bg-[#2B3139]/50 rounded-lg border-l-4 border-[#F0B90B]">
                        <Info className="h-5 w-5 text-[#F0B90B] flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-[#848E9C]">
                            <p>Las transferencias pueden tardar hasta 24h hábiles en reflejarse. Enviaremos confirmación por email.</p>
                            {!loading && rate && (
                                <p className="mt-1 text-xs">Tasa BCV: {rate.toLocaleString('es-VE')} Bs/USD</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Step 2: Confirmación */}
            <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2B3139] text-[#F0B90B] text-xs font-bold">2</span>
                    Confirma tu transferencia
                </h3>

                <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-[#2B3139]">
                        <button
                            onClick={() => setActiveTab('reference')}
                            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'reference' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B] bg-[#2B3139]/50' : 'text-[#848E9C] hover:text-white'}`}
                        >
                            Ingresar Referencia
                        </button>
                        <button
                            onClick={() => setActiveTab('receipt')}
                            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'receipt' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B] bg-[#2B3139]/50' : 'text-[#848E9C] hover:text-white'}`}
                        >
                            Subir Voucher
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'reference' ? (
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/checkout/success'); }}>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Número de referencia</label>
                                    <input type="text" placeholder="Ej. 1234567890" className="block w-full rounded-lg border border-[#3A4149] bg-[#2B3139] p-3 text-white focus:ring-1 focus:ring-[#F0B90B] outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Banco origen</label>
                                    <select className="block w-full rounded-lg border border-[#3A4149] bg-[#2B3139] p-3 text-white focus:ring-1 focus:ring-[#F0B90B] outline-none">
                                        <option>Selecciona un banco</option>
                                        <option>Mercantil</option>
                                        <option>Banesco</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-3 bg-[#F0B90B] text-black font-bold rounded-lg hover:bg-[#FCD535] transition-colors">Confirmar Transferencia</button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#3A4149] rounded-lg p-10 hover:border-[#F0B90B] transition-colors bg-[#2B3139]/20 cursor-pointer">
                                <div className="h-16 w-16 bg-[#2B3139] rounded-full flex items-center justify-center mb-4">
                                    <UploadCloud className="h-8 w-8 text-[#F0B90B]" />
                                </div>
                                <p className="text-white font-medium mb-1">Arrastra tu voucher aquí</p>
                                <p className="text-[#848E9C] text-sm">JPG, PNG, PDF (Máx. 5MB)</p>
                                <button className="mt-6 px-6 py-2 bg-[#2B3139] text-white rounded-lg text-sm font-medium hover:bg-[#383F49] transition-colors">Seleccionar archivo</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BankTransferPage;
