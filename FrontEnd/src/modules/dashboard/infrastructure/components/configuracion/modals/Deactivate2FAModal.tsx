import React from 'react';
import { motion } from 'framer-motion';

interface Deactivate2FAModalProps {
    show: boolean;
    onClose: () => void;
    deactivatePassword: string;
    setDeactivatePassword: (pass: string) => void;
    onConfirm: () => void;
}

export const Deactivate2FAModal: React.FC<Deactivate2FAModalProps> = ({
    show,
    onClose,
    deactivatePassword,
    setDeactivatePassword,
    onConfirm
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1E2329] border border-[#2B3139] rounded-2xl w-full max-w-sm relative z-10 p-8 shadow-2xl"
            >
                <h4 className="text-white font-bold text-xl mb-2">Desactivar 2FA</h4>
                <p className="text-[#848E9C] text-sm mb-6 leading-relaxed">Por seguridad, ingresa tu contraseña actual para confirmar la desactivación del 2FA.</p>

                <div className="space-y-4">
                    <input
                        type="password"
                        placeholder="Contraseña Actual"
                        className="w-full bg-[#0B0E11] border border-[#2B3139] focus:border-red-500 rounded-xl px-4 py-3 text-white text-sm outline-none"
                        value={deactivatePassword}
                        onChange={e => setDeactivatePassword(e.target.value)}
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 text-[#848E9C] font-bold py-3 hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:brightness-110 shadow-lg shadow-red-500/10"
                        >
                            Desactivar
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
