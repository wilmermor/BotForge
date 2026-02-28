import React, { useState, useEffect } from 'react';
import { User, Camera, RefreshCw, Save, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PerfilSectionProps {
    avatar: string | null;
    setAvatar: (val: string | null) => void;
    isUploading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const PerfilSection: React.FC<PerfilSectionProps> = ({
    avatar,
    setAvatar,
    isUploading,
    fileInputRef,
    handleAvatarChange,
    showToast
}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('España');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const response = await fetch("http://localhost:8000/api/v1/users/me", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.full_name) setFullName(data.full_name);
                    if (data.email) setEmail(data.email);
                    if (data.country) setCountry(data.country);
                    if (data.avatar) setAvatar(data.avatar);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8000/api/v1/users/me", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ full_name: fullName, email, country, avatar: avatar })
            });

            if (response.ok) {
                showToast('Perfil actualizado correctamente', 'success');
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = errorData.detail || 'Error al actualizar perfil';
                showToast(errorMsg, 'error');
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            showToast('Error de conexión', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
        >
            {/* Foto de Perfil */}
            <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-8 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6">Foto de Perfil</h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="h-[150px] w-[150px] rounded-full overflow-hidden border-4 border-[#2B3139] bg-[#0B0E11] flex items-center justify-center relative shadow-xl">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User className="h-16 w-16 text-[#2B3139]" />
                            )}
                            {isUploading && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <RefreshCw className="h-8 w-8 text-[#F0B90B] animate-spin" />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 bg-[#F0B90B] p-2.5 rounded-full text-black hover:scale-110 transition-transform shadow-lg border-2 border-[#191A1F]"
                        >
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <h4 className="text-white font-bold">Tu Avatar</h4>
                        <p className="text-[#848E9C] text-xs max-w-[250px]">
                            Se recomienda una imagen cuadrada de al menos 150x150px. PNG o JPG.
                        </p>
                        <div className="flex gap-2 justify-center md:justify-start">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-[#2B3139] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3A4149] transition-colors"
                            >
                                Subir Foto
                            </button>
                            {avatar && (
                                <button
                                    onClick={() => setAvatar(null)}
                                    className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Perfil Section */}
            <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[#2B3139] flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Información Personal</h3>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-[#F0B90B] text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-bold text-[#848E9C] uppercase tracking-wider">Nombre Completo</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Tu nombre completo"
                                className="w-full bg-[#2B3139] border border-[#3A4149] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-2.5 text-white text-sm"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-bold text-[#848E9C] uppercase tracking-wider">Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                className="w-full bg-[#2B3139] border border-[#3A4149] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-2.5 text-white text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-bold text-[#848E9C] uppercase tracking-wider">País / Región</label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-[#2B3139] border border-[#3A4149] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-2.5 text-white text-sm appearance-none"
                            >
                                <option value="Venezuela">Venezuela</option>
                                <option value="España">España</option>
                                <option value="México">México</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Chile">Chile</option>
                                <option value="Perú">Perú</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
