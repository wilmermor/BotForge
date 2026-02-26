import React from 'react';
import { X, ArrowRight, Shield, Check, Copy, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface TwoFactorSetupModalProps {
    show: boolean;
    onClose: () => void;
    faStep: number;
    set2FAStep: (step: number) => void;
    verificationCode: string;
    setVerificationCode: (code: string) => void;
    setIs2FAEnabled: (enabled: boolean) => void;
}

export const TwoFactorSetupModal: React.FC<TwoFactorSetupModalProps> = ({
    show,
    onClose,
    faStep,
    set2FAStep,
    verificationCode,
    setVerificationCode,
    setIs2FAEnabled
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1E2329] border border-[#2B3139] rounded-2xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl"
            >
                <div className="p-6 border-b border-[#2B3139] flex justify-between items-center bg-[#2B3139]/30">
                    <h3 className="text-white font-bold">Activar 2FA</h3>
                    <button onClick={onClose} className="text-[#848E9C] hover:text-white"><X className="h-5 w-5" /></button>
                </div>

                <div className="p-8">
                    {faStep === 1 && (
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-white p-4 rounded-xl mb-6 shadow-xl">
                                <div className="w-40 h-40 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BotForge2FA')] bg-no-repeat bg-center bg-contain" />
                            </div>
                            <p className="text-sm text-[#848E9C] mb-8 leading-relaxed">Escanea este código QR con Google Authenticator o Authy para vincular tu cuenta.</p>
                            <button
                                onClick={() => set2FAStep(2)}
                                className="w-full bg-[#F0B90B] text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
                            >
                                Ya lo escaneé
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    )}

                    {faStep === 2 && (
                        <div className="flex flex-col items-center text-center">
                            <div className="h-16 w-16 bg-[#F0B90B]/10 rounded-2xl flex items-center justify-center mb-6">
                                <Shield className="h-8 w-8 text-[#F0B90B]" />
                            </div>
                            <h4 className="text-white font-bold mb-2">Verifica tu dispositivo</h4>
                            <p className="text-sm text-[#848E9C] mb-8">Ingresa el código de 6 dígitos que aparece en tu aplicación de autenticación.</p>

                            <div className="flex justify-center gap-3 mb-8">
                                <input
                                    maxLength={6}
                                    className="w-full bg-[#0B0E11] border border-[#2B3139] focus:border-[#F0B90B] rounded-xl text-center text-3xl font-black py-3 tracking-[0.5em] text-[#F0B90B] outline-none"
                                    value={verificationCode}
                                    onChange={e => setVerificationCode(e.target.value)}
                                    placeholder="000000"
                                />
                            </div>

                            <button
                                disabled={verificationCode.length < 6}
                                onClick={() => set2FAStep(3)}
                                className={`w-full py-4 rounded-xl font-bold transition-all ${verificationCode.length === 6 ? 'bg-[#F0B90B] text-black shadow-lg hover:brightness-110' : 'bg-[#2B3139] text-[#848E9C] cursor-not-allowed border border-[#3A4149]'
                                    }`}
                            >
                                Verificar y Activar
                            </button>
                        </div>
                    )}

                    {faStep === 3 && (
                        <div className="flex flex-col">
                            <div className="bg-[#02C076]/10 border border-[#02C076]/30 p-4 rounded-xl flex gap-3 mb-6">
                                <Check className="h-5 w-5 text-[#02C076] shrink-0" />
                                <div>
                                    <div className="text-[#02C076] text-sm font-bold">¡2FA Activado Correctamente!</div>
                                    <p className="text-[#02C076]/80 text-xs">Guarda estos códigos de respaldo en un lugar seguro.</p>
                                </div>
                            </div>

                            <div className="bg-[#0B0E11] border border-[#2B3139] rounded-xl p-4 mb-6">
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {['8F31-9K2L', 'P0W9-X7V2', 'L1M3-Q6B4', 'Z5D7-R0T9'].map(code => (
                                        <div key={code} className="bg-[#1E2329] p-2 rounded text-center font-mono text-xs text-white border border-[#2B3139]">{code}</div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-[#2B3139] text-[#848E9C] text-xs py-2 rounded flex items-center justify-center gap-2 hover:text-white transition-colors"><Copy className="h-3 w-3" /> Copiar</button>
                                    <button className="flex-1 bg-[#2B3139] text-[#848E9C] text-xs py-2 rounded flex items-center justify-center gap-2 hover:text-white transition-colors"><Download className="h-3 w-3" /> Descargar</button>
                                </div>
                            </div>

                            <button
                                onClick={() => { onClose(); setIs2FAEnabled(true); }}
                                className="w-full bg-[#0B0E11] border border-[#2B3139] text-white py-4 rounded-xl font-bold hover:bg-[#2B3139] transition-all"
                            >
                                Entendido, finalizar
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
