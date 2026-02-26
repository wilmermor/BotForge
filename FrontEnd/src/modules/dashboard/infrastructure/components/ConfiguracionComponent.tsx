import React, { useState, useRef } from 'react';
import { User, Shield, CreditCard } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// Sub-componentes
import { PerfilSection } from './configuracion/PerfilSection';
import { SeguridadSection } from './configuracion/SeguridadSection';
import { SuscripcionSection } from './configuracion/SuscripcionSection';
import { TwoFactorSetupModal } from './configuracion/modals/TwoFactorSetupModal';
import { Deactivate2FAModal } from './configuracion/modals/Deactivate2FAModal';
import { PlanChangeModal } from './configuracion/modals/PlanChangeModal';
import { Toast } from './configuracion/Toast';

type SettingsTab = 'perfil' | 'seguridad' | 'suscripcion';

interface ConfiguracionComponentProps {
    activeTab: SettingsTab;
    setActiveTab: (tab: SettingsTab) => void;
}

interface Plan {
    id: string;
    name: string;
    price: string;
    features: string[];
}

const ConfiguracionComponent = ({ activeTab, setActiveTab }: ConfiguracionComponentProps) => {
    // --- Profile State ---
    const [avatar, setAvatar] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    // --- Security State ---
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [faStep, set2FAStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [deactivatePassword, setDeactivatePassword] = useState('');

    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
    const [showPass, setShowPass] = useState({ current: false, next: false, confirm: false });

    // --- Subscription State ---
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<null | Plan>(null);
    const [confirmTerms, setConfirmTerms] = useState(false);

    // --- Feedback State ---
    const [toast, setToast] = useState<{ show: boolean, msg: string, type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
    };

    const plans: Plan[] = [
        { id: 'starter', name: 'Plan Free', price: '0', features: ['Acceso a 1 Estrategia Pro', 'Backtesting Esencial', 'Cero Riesgo'] },
        { id: 'pro', name: 'Plan Pro', price: '19.99', features: ['Backtesting Ilimitado', 'Simulaciones en Paralelo', 'Métricas Minuto a Minuto', 'Acceso Total'] },
    ];
    const currentPlanId = 'pro';

    const passRequirements = [
        { label: 'Mínimo 8 caracteres', met: passwords.next.length >= 8 },
        { label: 'Una mayúscula', met: /[A-Z]/.test(passwords.next) },
        { label: 'Un número', met: /[0-9]/.test(passwords.next) },
        { label: 'Coinciden', met: passwords.next !== '' && passwords.next === passwords.confirm }
    ];
    const isPassValid = passRequirements.every(req => req.met);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const trigger2FA = () => {
        if (!is2FAEnabled) {
            setShow2FAModal(true);
            set2FAStep(1);
        } else {
            setShowDeactivateModal(true);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-8 animate-fade-in pb-10 relative">
            <div className="max-w-4xl">
                <h2 className="text-2xl font-bold text-white mb-2">Configuración del Sistema</h2>
                <p className="text-[#848E9C] text-sm">Gestiona tu perfil, seguridad y métodos de pago.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-2">
                    {[
                        { id: 'perfil', name: 'Perfil', icon: User },
                        { id: 'seguridad', name: 'Seguridad', icon: Shield },
                        { id: 'suscripcion', name: 'Suscripción', icon: CreditCard },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as SettingsTab)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left ${activeTab === tab.id
                                ? 'bg-[#2B3139] text-[#F0B90B] shadow-[0_4px_10px_rgba(0,0,0,0.2)]'
                                : 'text-[#848E9C] hover:bg-[#1E2329] hover:text-white'
                                }`}
                        >
                            <tab.icon className="h-5 w-5" />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Main Content Areas */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {activeTab === 'perfil' && (
                            <PerfilSection
                                key="perfil"
                                avatar={avatar}
                                setAvatar={setAvatar}
                                isUploading={isUploading}
                                fileInputRef={fileInputRef}
                                handleAvatarChange={handleAvatarChange}
                                showToast={showToast}
                            />
                        )}

                        {activeTab === 'seguridad' && (
                            <SeguridadSection
                                key="seguridad"
                                is2FAEnabled={is2FAEnabled}
                                trigger2FA={trigger2FA}
                                passwords={passwords}
                                setPasswords={setPasswords}
                                showPass={showPass}
                                setShowPass={setShowPass}
                                passRequirements={passRequirements}
                                isPassValid={isPassValid}
                                showToast={showToast}
                            />
                        )}

                        {activeTab === 'suscripcion' && (
                            <SuscripcionSection
                                key="suscripcion"
                                plans={plans}
                                currentPlanId={currentPlanId}
                                setSelectedPlan={setSelectedPlan}
                                setShowPlanModal={setShowPlanModal}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modals */}
            <TwoFactorSetupModal
                show={show2FAModal}
                onClose={() => setShow2FAModal(false)}
                faStep={faStep}
                set2FAStep={set2FAStep}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                setIs2FAEnabled={setIs2FAEnabled}
            />

            <Deactivate2FAModal
                show={showDeactivateModal}
                onClose={() => setShowDeactivateModal(false)}
                deactivatePassword={deactivatePassword}
                setDeactivatePassword={setDeactivatePassword}
                onConfirm={() => {
                    setIs2FAEnabled(false);
                    setShowDeactivateModal(false);
                    setDeactivatePassword('');
                    showToast('2FA desactivado correctamente');
                }}
            />

            <PlanChangeModal
                show={showPlanModal}
                selectedPlan={selectedPlan}
                confirmTerms={confirmTerms}
                setConfirmTerms={setConfirmTerms}
                onClose={() => setShowPlanModal(false)}
                onConfirm={() => {
                    setShowPlanModal(false);
                    showToast(`Suscripción cambiada a ${selectedPlan?.name}`);
                }}
            />

            <Toast show={toast.show} msg={toast.msg} type={toast.type} />
        </div>
    );
};

export default ConfiguracionComponent;
