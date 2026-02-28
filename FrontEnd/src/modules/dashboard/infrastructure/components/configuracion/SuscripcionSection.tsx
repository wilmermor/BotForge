import React from 'react';
import { Zap, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Plan {
    id: string;
    name: string;
    price: string;
    features: string[];
}

interface SuscripcionSectionProps {
    plans: Plan[];
    currentPlanId: string;
    setSelectedPlan: (plan: Plan) => void;
    setShowPlanModal: (show: boolean) => void;
}

export const SuscripcionSection: React.FC<SuscripcionSectionProps> = ({
    plans,
    currentPlanId,
    setSelectedPlan,
    setShowPlanModal
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
        >
            {/* Current Plan Header */}
            <div className={`bg-gradient-to-br from-[#1E2329] to-[#0B0E11] rounded-2xl p-8 border ${currentPlanId === 'pro' ? 'border-[#F0B90B] shadow-[0_0_20px_rgba(240,185,11,0.15)]' : 'border-[#2B3139]'} relative overflow-hidden shadow-2xl`}>
                <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full filter blur-[100px] opacity-10 ${currentPlanId === 'pro' ? 'bg-[#F0B90B]' : 'bg-[#EAECEF]'}`}></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-5">
                        <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${currentPlanId === 'pro' ? 'bg-[#F0B90B] shadow-[0_0_20px_rgba(240,185,11,0.3)]' : 'bg-[#2B3139]'}`}>
                            <Zap className={`h-8 w-8 ${currentPlanId === 'pro' ? 'text-black' : 'text-white'} fill-current`} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-3xl font-black text-white italic tracking-tighter">PLAN {currentPlanId.toUpperCase()}</h3>
                                <span className={`${currentPlanId === 'pro' ? 'bg-[#F0B90B] text-black' : 'bg-[#2B3139] text-white'} font-bold text-[10px] px-2 py-0.5 rounded-full uppercase`}>Plan Actual</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-white text-lg font-bold">
                                    {currentPlanId === 'pro' ? '$19.99' : '$0'}
                                    <span className="text-[#848E9C] text-sm font-normal">/mes</span>
                                </span>
                                {currentPlanId === 'pro' && (
                                    <>
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#848E9C]"></span>
                                        <span className="text-[#848E9C] text-sm">Próximo pago: <span className="text-white font-medium">Auto-renovación</span></span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plan Comparison Grid */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6">Planes Disponibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    {plans.map(plan => {
                        const isCurrent = plan.id === currentPlanId;
                        return (
                            <div
                                key={plan.id}
                                className={`group bg-[#1E2329] rounded-2xl border transition-all p-6 flex flex-col ${isCurrent ? 'border-[#F0B90B]' : 'border-[#2B3139] hover:border-[#3A4149] hover:bg-[#20262d]'
                                    }`}
                            >
                                <div className="mb-6">
                                    <h4 className="text-white font-bold text-lg mb-1">{plan.name}</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-white">${plan.price}</span>
                                        <span className="text-[#848E9C] text-xs font-medium">/mes</span>
                                    </div>
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((f: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-[#848E9C]">
                                            <Check className={`h-4 w-4 shrink-0 ${isCurrent ? 'text-[#F0B90B]' : 'text-[#1E2329] group-hover:text-[#F0B90B]'}`} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    disabled={isCurrent}
                                    onClick={() => { setSelectedPlan(plan); setShowPlanModal(true); }}
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${isCurrent
                                        ? 'bg-[#2B3139] text-[#F0B90B] cursor-default border border-[#F0B90B]/30'
                                        : 'bg-[#0B0E11] text-white border border-[#2B3139] hover:border-[#F0B90B] hover:bg-[#F0B90B] hover:text-black group-hover:shadow-[0_4px_15px_rgba(240,185,11,0.2)]'
                                        }`}
                                >
                                    {isCurrent ? 'Plan Actual' : 'Cambiar a este plan'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};
