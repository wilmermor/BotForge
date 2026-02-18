
import { Outlet, useLocation } from 'react-router-dom';
import { CheckCircle, ShieldCheck } from 'lucide-react';

const CheckoutLayout = () => {
    const location = useLocation();

    // Mapping steps to routes
    const getStepStatus = (step: number) => {
        const path = location.pathname;
        if (step === 1) return 'completed'; // Registration is always done if we contain here (theoretically)

        if (step === 2) {
            if (path.includes('payment')) return 'active';
            if (path.includes('success')) return 'completed';
            return 'pending'; // In plan selection
        }

        if (step === 3) {
            if (path.includes('success')) return 'active'; // Or completed
            return 'pending';
        }
        return 'pending';
    };

    return (
        <div className="min-h-screen bg-[#0B0E11] text-white font-sans antialiased">
            {/* Navbar (Simplified for Checkout) */}
            <header className="bg-[#0B0E11] border-b border-[#1E2329]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 bg-[#F0B90B] rounded-full flex items-center justify-center text-black font-bold">BF</div>
                            </div>
                            <span className="ml-3 text-xl font-bold text-white">BotForge</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-[#848E9C]">
                            <ShieldCheck className="h-4 w-4 text-[#02C076]" />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 text-sm">
                        <div className={`flex items-center ${getStepStatus(1) === 'completed' ? 'text-[#F0B90B]' : 'text-white'}`}>
                            <span className={`flex items-center justify-center w-6 h-6 rounded-full ${getStepStatus(1) === 'completed' ? 'bg-[#F0B90B] text-black' : 'border-2 border-white'} font-bold mr-2 text-xs`}>
                                {getStepStatus(1) === 'completed' ? '✓' : '1'}
                            </span>
                            Registro
                        </div>
                        <div className={`w-8 h-[1px] ${getStepStatus(2) !== 'pending' ? 'bg-[#F0B90B]' : 'bg-[#2B3139]'}`}></div>
                        <div className={`flex items-center ${getStepStatus(2) === 'active' ? 'text-[#F0B90B] font-semibold' : getStepStatus(2) === 'completed' ? 'text-[#F0B90B]' : 'text-[#474D57]'}`}>
                            <span className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${getStepStatus(2) === 'active' || getStepStatus(2) === 'completed' ? 'border-[#F0B90B] text-[#F0B90B]' : 'border-[#474D57] text-[#474D57]'} font-bold mr-2 text-xs`}>
                                2
                            </span>
                            Pago
                        </div>
                        <div className={`w-8 h-[1px] ${getStepStatus(3) === 'active' ? 'bg-[#F0B90B]' : 'bg-[#2B3139]'}`}></div>
                        <div className={`flex items-center ${getStepStatus(3) === 'active' ? 'text-[#F0B90B] font-semibold' : 'text-[#474D57]'}`}>
                            <span className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${getStepStatus(3) === 'active' ? 'border-[#F0B90B] text-[#F0B90B]' : 'border-[#474D57] text-[#474D57]'} font-bold mr-2 text-xs`}>
                                3
                            </span>
                            Confirmación
                        </div>
                    </div>
                </div>

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
