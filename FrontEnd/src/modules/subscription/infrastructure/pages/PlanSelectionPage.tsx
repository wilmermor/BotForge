
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import CheckoutProgressBar from '../components/CheckoutProgressBar';

const PlanSelectionPage = () => {
    const navigate = useNavigate();

    const handleSelectPlan = (plan: 'free' | 'pro') => {
        if (plan === 'pro') {
            navigate('/checkout/payment');
        } else {
            // Logic for free plan (maybe direct dashboard access?)
            navigate('/dashboard');
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Selecciona tu plan</h1>
                <p className="text-[#848E9C]">Elige el plan que mejor se adapte a tus necesidades de trading.</p>
                <CheckoutProgressBar step={2} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Free Plan */}
                <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6 flex flex-col hover:border-[#474D57] transition-all">
                    <h3 className="text-lg font-semibold text-white">Free</h3>
                    <div className="mt-4 flex items-baseline text-white">
                        <span className="text-4xl font-bold tracking-tight">$0</span>
                        <span className="ml-1 text-xl font-semibold text-[#848E9C]">/forever</span>
                    </div>
                    <p className="mt-6 text-[#848E9C]">Perfecto para empezar a aprender.</p>
                    <ul role="list" className="mt-6 space-y-3 border-t border-[#2B3139] pt-6 flex-1">
                        {['Backtesting básico (10/día)', '1 Exchange', 'Datos históricos limitados'].map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                                <Check className="h-6 w-5 flex-none text-[#848E9C]" aria-hidden="true" />
                                <span className="text-sm leading-6 text-[#EAECEF]">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => handleSelectPlan('free')}
                        className="mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 bg-[#2B3139] text-white hover:bg-[#383F49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3139]"
                    >
                        Comenzar Gratis
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-[#1E2329] rounded-xl border border-[#F0B90B] p-6 flex flex-col relative shadow-[0_0_20px_rgba(240,185,11,0.1)]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F0B90B] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Recomendado
                    </div>
                    <h3 className="text-lg font-semibold text-white">Pro</h3>
                    <div className="mt-4 flex items-baseline text-white">
                        <span className="text-4xl font-bold tracking-tight">$29.99</span>
                        <span className="ml-1 text-xl font-semibold text-[#848E9C]">/mes</span>
                    </div>
                    <p className="mt-6 text-[#848E9C]">Para traders que van en serio.</p>
                    <ul role="list" className="mt-6 space-y-3 border-t border-[#2B3139] pt-6 flex-1">
                        {['Backtesting ilimitado', 'Múltiples Exchanges', 'Reportes Avanzados', 'Soporte Prioritario', 'Datos en tiempo real'].map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                                <Check className="h-6 w-5 flex-none text-[#F0B90B]" aria-hidden="true" />
                                <span className="text-sm leading-6 text-[#EAECEF]">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => handleSelectPlan('pro')}
                        className="mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 bg-[#F0B90B] text-black hover:bg-[#FCD535] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0B90B]"
                    >
                        Seleccionar Pro
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanSelectionPage;
