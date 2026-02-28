import React from 'react';
import { Lock, AlertCircle, Eye, EyeOff, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Passwords {
    current: string;
    next: string;
    confirm: string;
}

interface ShowPass {
    current: boolean;
    next: boolean;
    confirm: boolean;
}

interface Requirement {
    label: string;
    met: boolean;
}

interface SeguridadSectionProps {
    is2FAEnabled: boolean;
    trigger2FA: () => void;
    passwords: Passwords;
    setPasswords: (p: Passwords) => void;
    showPass: ShowPass;
    setShowPass: (s: ShowPass) => void;
    passRequirements: Requirement[];
    isPassValid: boolean;
    showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const SeguridadSection: React.FC<SeguridadSectionProps> = ({
    is2FAEnabled,
    trigger2FA,
    passwords,
    setPasswords,
    showPass,
    setShowPass,
    passRequirements,
    isPassValid,
    showToast
}) => {
    const [isUpdating, setIsUpdating] = React.useState(false);

    const handlePasswordUpdate = async () => {
        if (!isPassValid || !passwords.current) return;
        setIsUpdating(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8000/api/v1/users/me/password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    current_password: passwords.current,
                    new_password: passwords.next
                })
            });

            if (response.ok) {
                showToast('Contraseña actualizada con éxito', 'success');
                setPasswords({ current: '', next: '', confirm: '' });
            } else {
                const errorData = await response.json().catch(() => ({}));
                showToast(errorData.detail || 'Error al actualizar la contraseña', 'error');
            }
        } catch (error) {
            console.error("Error updating password:", error);
            showToast('Error de conexión', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
        >
            {/* 2FA Card */}
            <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                        <div className="h-10 w-10 bg-[#F0B90B]/10 rounded-lg flex items-center justify-center shrink-0">
                            <Lock className="h-5 w-5 text-[#F0B90B]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-white">Autenticación de Dos Factores (2FA)</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${is2FAEnabled ? 'bg-[#02C076]/20 text-[#02C076] border border-[#02C076]/30' : 'bg-[#F6465D]/20 text-[#F6465D] border border-[#F6465D]/30'
                                    }`}>
                                    {is2FAEnabled ? 'Activado' : 'Desactivado'}
                                </span>
                            </div>
                            <p className="text-[#848E9C] text-sm mt-1">Añade una capa extra de seguridad a tu cuenta usando una App de autenticación.</p>
                        </div>
                    </div>
                    <div
                        onClick={trigger2FA}
                        className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ${is2FAEnabled ? 'bg-[#02C076]' : 'bg-[#2B3139]'}`}
                    >
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${is2FAEnabled ? 'translate-x-6' : ''}`} />
                    </div>
                </div>
                {!is2FAEnabled && (
                    <div className="bg-[#2B3139]/30 border border-[#2B3139] rounded-lg p-4 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-[#F0B90B]" />
                        <span className="text-sm text-[#848E9C]">Recomendamos activar 2FA para proteger tus fondos y configuraciones de trading.</span>
                    </div>
                )}
            </div>

            {/* Cambio de Contraseña */}
            <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[#2B3139]">
                    <h3 className="text-lg font-bold text-white">Cambiar Contraseña</h3>
                </div>
                <div className="p-6 space-y-6 max-w-2xl">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#848E9C] uppercase tracking-wider">Contraseña Actual</label>
                        <div className="relative">
                            <input
                                type={showPass.current ? 'text' : 'password'}
                                value={passwords.current}
                                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                className="w-full bg-[#2B3139] border border-[#3A4149] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-2.5 text-white text-sm"
                            />
                            <button
                                onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] hover:text-[#F0B90B]"
                            >
                                {showPass.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#848E9C] uppercase tracking-wider">Nueva Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPass.next ? 'text' : 'password'}
                                    value={passwords.next}
                                    onChange={e => setPasswords({ ...passwords, next: e.target.value })}
                                    className="w-full bg-[#2B3139] border border-[#3A4149] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-2.5 text-white text-sm"
                                />
                                <button
                                    onClick={() => setShowPass({ ...showPass, next: !showPass.next })}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] hover:text-[#F0B90B]"
                                >
                                    {showPass.next ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {/* Strength Indicator */}
                            <div className="flex gap-1 h-1 mt-2">
                                {[1, 2, 3, 4].map((i: number) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-full ${passwords.next.length === 0 ? 'bg-[#2B3139]' :
                                            (i <= (passRequirements.filter(r => r.met).length)) ?
                                                (passRequirements.filter(r => r.met).length < 3 ? 'bg-[#F6465D]' : (passRequirements.filter(r => r.met).length === 4 ? 'bg-[#02C076]' : 'bg-[#F0B90B]'))
                                                : 'bg-[#2B3139]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#848E9C] uppercase tracking-wider">Confirmar Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPass.confirm ? 'text' : 'password'}
                                    value={passwords.confirm}
                                    onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                    className="w-full bg-[#2B3139] border border-[#3A4149] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-2.5 text-white text-sm"
                                />
                                <button
                                    onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] hover:text-[#F0B90B]"
                                >
                                    {showPass.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Requirements List */}
                    <div className="grid grid-cols-2 gap-y-2 pt-2 border-t border-[#2B3139]">
                        {passRequirements.map((req: Requirement, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`h-4 w-4 rounded-full flex items-center justify-center ${req.met ? 'bg-[#02C076]/20 text-[#02C076]' : 'bg-[#2B3139] text-[#848E9C]'}`}>
                                    <Check className="h-3 w-3" />
                                </div>
                                <span className={`text-xs ${req.met ? 'text-white font-medium' : 'text-[#848E9C]'}`}>{req.label}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        disabled={!isPassValid || !passwords.current || isUpdating}
                        onClick={handlePasswordUpdate}
                        className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold transition-all ${isPassValid && passwords.current && !isUpdating
                            ? 'bg-[#F0B90B] text-black hover:brightness-110 shadow-lg'
                            : 'bg-[#2B3139] text-[#848E9C] cursor-not-allowed border border-[#3A4149]'
                            }`}
                    >
                        {isUpdating ? 'Actualizando...' : 'Actualizar Contraseña'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
