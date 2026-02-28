import React from 'react';
import { X, ArrowRight, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlanChangeModalProps {
    show: boolean;
    onClose: () => void;
    currentPlan: any;
    selectedPlan: any;
    confirmTerms: boolean;
    setConfirmTerms: (val: boolean) => void;
    onConfirm: () => void;
}

export const PlanChangeModal: React.FC<PlanChangeModalProps> = ({
    show,
    onClose,
    currentPlan,
    selectedPlan,
    confirmTerms,
    setConfirmTerms,
    onConfirm
}) => {
    if (!show || !selectedPlan) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1E2329] border border-[#2B3139] rounded-2xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl"
            >
                <div className="p-6 border-b border-[#2B3139] flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Confirmar Cambio de Suscripción</h3>
                    <button onClick={onClose} className="text-[#848E9C] hover:text-white"><X className="h-5 w-5" /></button>
                </div>

                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex-1 text-center p-4 rounded-xl bg-[#0B0E11]/50 border border-[#2B3139]">
                            <div className="text-[#848E9C] text-[10px] font-bold uppercase mb-1">Plan Actual</div>
                            <div className="text-white font-bold">{currentPlan?.name || 'Plan Free'}</div>
                            <div className="text-[#848E9C] text-xs">${currentPlan?.price || '0'}/mes</div>
                        </div>
                        <div className="px-4 text-[#F0B90B]"><ArrowRight /></div>
                        <div className="flex-1 text-center p-4 rounded-xl bg-[#F0B90B]/5 border border-[#F0B90B]/30">
                            <div className="text-[#F0B90B] text-[10px] font-bold uppercase mb-1">Nuevo Plan</div>
                            <div className="text-white font-bold">{selectedPlan.name}</div>
                            <div className="text-[#F0B90B] text-xs font-bold">${selectedPlan.price}/mes</div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3 p-4 bg-[#2B3139]/30 rounded-xl">
                            <AlertCircle className="h-5 w-5 text-[#F0B90B] shrink-0" />
                            <p className="text-xs text-[#848E9C] leading-relaxed">
                                Al confirmar, el cambio se aplicará inmediatamente. Se realizará un cargo proporcional si el nuevo plan es de mayor valor, o se aplicará crédito a tu cuenta si es menor.
                            </p>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div
                                onClick={() => setConfirmTerms(!confirmTerms)}
                                className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${confirmTerms ? 'bg-[#F0B90B] border-[#F0B90B]' : 'bg-[#0B0E11] border-[#2B3139] group-hover:border-[#3A4149]'
                                    }`}
                            >
                                {confirmTerms && <Check className="h-4 w-4 text-black font-bold" />}
                            </div>
                            <span className="text-xs text-white">Entiendo los cambios en mi suscripción y facturación.</span>
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 text-[#848E9C] font-bold py-4 hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            disabled={!confirmTerms}
                            onClick={onConfirm}
                            className={`flex-1 py-4 rounded-xl font-bold transition-all ${confirmTerms ? 'bg-[#F0B90B] text-black shadow-lg hover:brightness-110' : 'bg-[#2B3139] text-[#848E9C] cursor-not-allowed border border-[#3A4149]'
                                }`}
                        >
                            Confirmar Cambio
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
