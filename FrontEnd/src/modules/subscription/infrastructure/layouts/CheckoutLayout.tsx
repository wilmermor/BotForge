
import { Outlet } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '../../../marketing/infrastructure/components/Navbar';

const CheckoutLayout = () => {

    return (
        <div className="min-h-screen bg-[#0B0E11] text-white font-sans antialiased">
            {/* Reused Navbar with checkout variant */}
            <Navbar variant="checkout" />

            <main className="mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        <Outlet />
                    </div>

                    {/* Persistent Order Summary */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6 shadow-lg">
                                <h3 className="text-lg font-medium text-white mb-1">Tu plan seleccionado</h3>
                                <p className="text-sm text-[#848E9C] mb-6">Resumen de tu suscripción</p>

                                <div className="mb-6 pb-6 border-b border-[#2B3139]">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h4 className="text-xl font-bold text-white">Plan Pro</h4>
                                        <span className="text-[#F0B90B] text-xs font-semibold px-2 py-1 bg-[#F0B90B]/10 rounded-full">Mensual</span>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-3xl font-bold text-white">$29.99</span>
                                        <span className="text-[#848E9C] ml-1">/mes</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        'Backtesting ilimitado',
                                        'Múltiples exchanges',
                                        'Reportes avanzados',
                                        'Soporte prioritario'
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-[#F0B90B] flex-shrink-0 mr-3" />
                                            <span className="text-sm text-[#EAECEF]">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full text-[#F0B90B] text-sm font-medium hover:text-[#FCD535] transition-colors">
                                    Cambiar plan
                                </button>
                            </div>

                            <div className="mt-6 flex items-center justify-center space-x-2 text-[#848E9C]">
                                <span className="text-xs">¿Problemas? Contacta a soporte</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckoutLayout;