import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LogOut, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoutConfirmModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
    show,
    onClose,
    onConfirm
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-[#1E2329] border border-[#2B3139] rounded-2xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl"
                    >
                        <div className="p-6 border-b border-[#2B3139] flex justify-between items-center">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                <LogOut className="h-5 w-5 text-[#F6465D]" />
                                Confirmar Cierre de Sesión
                            </h3>
                            <button onClick={onClose} className="text-[#848E9C] hover:text-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-[#F6465D]/10 border border-[#F6465D]/20">
                                <div className="h-10 w-10 rounded-full bg-[#F6465D]/20 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="h-5 w-5 text-[#F6465D]" />
                                </div>
                                <p className="text-[#EAECEF] text-sm leading-relaxed">
                                    ¿Estás seguro que deseas cerrar tu sesión actual? Tendrás que volver a ingresar tus credenciales para acceder al simulador.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 rounded-xl font-bold text-[#848E9C] hover:text-white bg-[#2B3139] hover:bg-[#3A4149] transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 py-3 rounded-xl font-bold bg-[#F6465D] hover:bg-[#F6465D]/90 text-white shadow-lg transition-all"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
