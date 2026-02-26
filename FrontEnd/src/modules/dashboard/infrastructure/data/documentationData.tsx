import React from 'react';
import { FileText, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DocumentationArticle {
    id: string;
    titulo: string;
    resumen: string;
    contenidoCompleto: React.ReactNode;
    icon?: LucideIcon;
}

// Removed soporteArticulos as requested.

export const baseConocimientoArticulos: DocumentationArticle[] = [
    {
        id: 'simulador-trading',
        titulo: 'Cómo funciona el simulador de trading',
        resumen: 'Guía para usar entorno de pruebas sin riesgo.',
        icon: FileText,
        contenidoCompleto: (
            <div className="space-y-4">
                <p className="text-[#848E9C] leading-relaxed">El simulador de trading es una de las características clave de BotForge. Te permite probar tus estrategias, configuraciones de bots y entender el mercado sin poner en riesgo capital real.</p>
                <h3 className="text-white font-bold text-lg mt-6 mb-2 border-b border-[#2B3139] pb-2">Características del Simulador:</h3>
                <ul className="list-disc pl-5 space-y-2 text-[#848E9C]">
                    <li><strong className="text-white">Datos reales:</strong> Utiliza el order book real de Binance y otros exchanges soportados.</li>
                    <li><strong className="text-white">Capital virtual:</strong> Inicias con una cuenta fondeada con $10,000 USDT virtuales (recargables).</li>
                    <li><strong className="text-white">Comisiones simuladas:</strong> Se aplican tasas de comisión estándar para que tu simulación sea realista.</li>
                </ul>
                <p className="text-[#848E9C] mt-6 leading-relaxed">Para iniciar una simulación, dirígete a la pestaña "Simulador" en el menú principal, selecciona tu par (ej. BTC/USDT), configura los parámetros y haz clic en "Iniciar Bot Simulado".</p>
            </div>
        )
    },
    {
        id: 'conectar-api-binance',
        titulo: 'Pasos para conectar tu API de Binance',
        resumen: 'Conecta tu exchange de manera segura.',
        icon: HelpCircle,
        contenidoCompleto: (
            <div className="space-y-4">
                <p className="text-[#848E9C] leading-relaxed">Para que nuestros bots puedan operar automática e ininterrumpidamente, debemos establecer una conexión segura entre BotForge y tu cuenta de Binance utilizando una clave API y una clave Secreta.</p>
                <h3 className="text-white font-bold text-lg mt-6 mb-2 border-b border-[#2B3139] pb-2">Requisitos Previos:</h3>
                <p className="text-[#848E9C] leading-relaxed">Necesitas tener tu cuenta de Binance verificada (KYC nivel intermedio) y con la autenticación de 2 factores (2FA) activada.</p>
                <h3 className="text-white font-bold text-lg mt-6 mb-2 border-b border-[#2B3139] pb-2">Pasos:</h3>
                <ol className="list-decimal pl-5 space-y-3 text-[#848E9C]">
                    <li>Inicia sesión en Binance y ve al Panel de Control.</li>
                    <li>En el menú lateral, selecciona <strong className="text-white">Gestión de API</strong>.</li>
                    <li>Haz clic en "Crear API", entrégale un nombre (ej. "BotForge") y pasa la verificación de seguridad SMS/Email.</li>
                    <li><strong className="text-[#F0B90B]">MUY IMPORTANTE:</strong> Edita las restricciones de la API. Debes habilitar "Habilitar Lectura" y "Habilitar Spot & Margin Trading". <strong className="text-white border-b border-red-500">NO habilites los Retiros</strong> bajo ninguna circunstancia.</li>
                    <li>Copia la <code className="bg-[#1E2329] px-2 py-1 rounded text-[#F0B90B] font-mono text-xs mx-1">API Key</code> y la <code className="bg-[#1E2329] px-2 py-1 rounded text-[#F0B90B] font-mono text-xs mx-1">Secret Key</code>.</li>
                    <li>Vuelve a BotForge, navega a Configuración &gt; Exchanges y pega las claves. Presiona "Conectar".</li>
                </ol>
            </div>
        )
    },
    {
        id: 'diferencias-planes',
        titulo: 'Diferencias entre Plan Free y Plan Pro',
        resumen: 'Comparativa de beneficios y límites basados en marketing.',
        icon: FileText,
        contenidoCompleto: (
            <div className="space-y-4">
                <p className="text-[#848E9C] leading-relaxed">BotForge ofrece dos modalidades de suscripción diseñadas para ajustarse a tu nivel de experiencia y volumen de operaciones reales y simuladas.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Plan Free - SILVER */}
                    <div className="p-6 bg-[#1E2329] rounded-xl border border-[#2B3139]">
                        <h4 className="text-white font-bold text-xl mb-1 text-center font-black">PLAN FREE</h4>
                        <p className="text-[#F0B90B] text-xs text-center mb-4 italic">"El Primer Paso del Trader Inteligente"</p>
                        <p className="text-[#848E9C] text-sm mb-4 leading-relaxed">Domina el mercado sin arriesgar un solo centavo. Ideal para validar estrategias sin costo.</p>
                        <div className="text-center mb-6">
                            <span className="text-2xl font-bold text-white">$0</span>
                            <span className="text-[#848E9C] text-xs">/siempre</span>
                        </div>
                        <ul className="text-sm space-y-3 text-[#848E9C]">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#02C076]"></div>Acceso a 1 Estrategia Pro</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#02C076]"></div>Backtesting Esencial</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#02C076]"></div>Cero Riesgo: Aprende de tus errores</li>
                        </ul>
                    </div>
                    {/* Plan Pro - GOLD */}
                    <div className="p-6 bg-[#0B0E11] rounded-xl border border-[#F0B90B] relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F0B90B] to-transparent opacity-50"></div>
                        <h4 className="text-[#F0B90B] font-bold text-xl mb-1 text-center font-black">PLAN PRO</h4>
                        <p className="text-white/60 text-xs text-center mb-4 italic">"Potencia Ilimitada para Traders de Élite"</p>
                        <p className="text-[#848E9C] text-sm mb-4 leading-relaxed">Escala tu rentabilidad con simulaciones de alta precisión para traders profesionales.</p>
                        <div className="text-center mb-6">
                            <span className="text-2xl font-bold text-white">$19.99</span>
                            <span className="text-[#848E9C] text-xs">/mes</span>
                        </div>
                        <ul className="text-sm space-y-3 text-[#848E9C]">
                            <li className="flex items-center gap-2 text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B] shadow-[0_0_8px_rgba(240,185,11,0.8)]"></div>Backtesting Ilimitado</li>
                            <li className="flex items-center gap-2 text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B] shadow-[0_0_8px_rgba(240,185,11,0.8)]"></div>Simulaciones en Paralelo</li>
                            <li className="flex items-center gap-2 text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B] shadow-[0_0_8px_rgba(240,185,11,0.8)]"></div>Métricas Minuto a Minuto</li>
                            <li className="flex items-center gap-2 text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B] shadow-[0_0_8px_rgba(240,185,11,0.8)]"></div>Análisis de drawdown y rentabilidad</li>
                            <li className="flex items-center gap-2 text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B] shadow-[0_0_8px_rgba(240,185,11,0.8)]"></div>Biblioteca completa de estrategias</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'configurar-stop-loss',
        titulo: 'Cómo configurar el Stop Loss de mi Bot',
        resumen: 'Evita pérdidas máximas gestionando el límite de riesgo.',
        icon: HelpCircle,
        contenidoCompleto: (
            <div className="space-y-4">
                <p className="text-[#848E9C] leading-relaxed">El Stop Loss (Límite de Pérdida) es el mecanismo automático por el cual BotForge vende tu posición a precio de mercado si el valor del activo se mueve en tu contra más allá de un límite prestablecido. Es una herramienta indispensable en el manejo del riesgo operativo.</p>
                <h3 className="text-white font-bold text-lg mt-6 mb-2 border-b border-[#2B3139] pb-2">Tipos de Stop Loss en BotForge:</h3>
                <ul className="list-disc pl-5 space-y-4 text-[#848E9C]">
                    <li>
                        <strong className="text-white block">Stop Loss Fijo:</strong>
                        Se activa cuando el precio cae de un porcentaje definido respecto a tu precio de entrada (Buy Price). Por ejemplo, si configuras un 5% de SL y compras a $100, se venderá automáticamente si llega a $95.
                    </li>
                    <li>
                        <strong className="text-[#F0B90B] block">Trailing Stop Loss (Dinámico):</strong>
                        Mecanismo avanzado que sigue el precio máximo que alcance el activo desde tu entrada. Permite proteger ganancias. Si el activo sube un 10%, y el trailing SL dinámico está configurado al 2%, el nivel del Stop Loss sube a la par del precio. Si el precio retrocede ese 2% desde el pico, cierra la posición garantizando ganancias.
                    </li>
                </ul>
                <div className="mt-6 p-4 bg-[#848E9C]/10 rounded border-l-4 border-white text-sm">
                    Para configurarlo, al momento de crear o editar un bot, ve a la pestaña "Gestión de Riesgo". Ingresa el porcentaje (ej. 5 o 2.5) y no olvides hacer clic en "Guardar Bot".
                </div>
            </div>
        )
    },
    {
        id: 'metodos-retiro-depositos',
        titulo: 'Métodos de retiro y depósitos',
        resumen: 'Opciones de pago disponibles en la facturación.',
        icon: FileText,
        contenidoCompleto: (
            <div className="space-y-4">
                <p className="text-[#848E9C] leading-relaxed">Nota: BotForge se dedica al software as a service. No fungimos como exchange ni custodiamos tu capital de trading. El saldo de tu cuenta sirve exclusivamente para abonar servicios dentro de nuestra plataforma (por ejemplo, la facturación mensual del plan, cuotas por API extra o servicios premium manuales).</p>
                <h3 className="text-white font-bold text-lg mt-6 mb-2 border-b border-[#2B3139] pb-2">Facturación con Criptomonedas:</h3>
                <p className="text-[#848E9C] leading-relaxed">Aceptamos diversos criptoactivos (USDT, USDC, BTC, BUSD) mediante integraciones directas o envíos web 3 (Binance Pay API o envíos manuales a nuestras wallets por red TRC20, BSC). La acreditación a través de Pay API es automática e instantánea. A través de redes públicas, depende del tiempo de bloque (aproximadamente 3 a 10 minutos).</p>
                <h3 className="text-white font-bold text-lg mt-6 mb-2 border-b border-[#2B3139] pb-2">Facturación con Moneda Fiduciaria Local:</h3>
                <p className="text-[#848E9C] leading-relaxed">Si radicas en los territorios con soporte físico comercial de BotForge, ofrecemos también opciones P2P/Locales para facilitar tu onboarding:</p>
                <ul className="list-disc pl-5 space-y-2 text-[#848E9C]">
                    <li><strong className="text-white">Pago Móvil:</strong> Rápido y preferido por su comodidad. Requiere tu número de referencia adjuntado dentro del "Checkout" en BotForge antes de aprobarse. Tiempo de aprobación: ~1 a 4 horas laborables.</li>
                    <li><strong className="text-white">Transferencia Bancaria Nacional:</strong> Si trasladas fondos entre bancos distintos, podría demorar hasta el siguiente día hábil antes de verse reflejado en tu panel.</li>
                </ul>
            </div>
        )
    },
];
