import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface ToastProps {
    show: boolean;
    msg: string;
    type: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ show, msg, type }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${type === 'success' ? 'bg-[#1E2329] border-[#02C076] text-white' : 'bg-[#1E2329] border-red-500 text-white'
                        }`}
                >
                    <div className={`p-1 rounded-full ${type === 'success' ? 'bg-[#02C076]/20 text-[#02C076]' : 'bg-red-500/20 text-red-500'}`}>
                        {type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    </div>
                    <span className="font-bold text-sm">{msg}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
