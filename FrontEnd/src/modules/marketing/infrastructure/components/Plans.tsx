import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const Plans: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const plans = [
        {
            id: 'free',
            name: "Plan Free",
            tagline: "El Primer Paso del Trader Inteligente",
            description: "Domina el mercado sin arriesgar un solo centavo. ¿Tienes una estrategia en mente pero no sabes si funcionará? Deja de adivinar y empieza a validar.",
            features: [
                "Acceso a 1 Estrategia Pro: Prueba el poder de nuestros algoritmos.",
                "Backtesting Esencial: Valida tus hipótesis con datos reales.",
                "Cero Riesgo: Aprende de tus errores antes de que te cuesten dinero."
            ],
            cta: "Empieza gratis ahora",
            icon: <Leaf size={140} strokeWidth={1} />,
            color: "border-white text-white",
            glowColor: "rgba(255, 255, 255, 0.2)",
            metalStyle: "linear-gradient(135deg, #cfd3d6 0%, #e5e7eb 25%, #ffffff 45%, #9ca3af 65%, #d1d5db 100%)",
            indicatorColor: "bg-gray-400"
        },
        {
            id: 'pro',
            name: "Plan Pro",
            tagline: "Potencia Ilimitada para Traders de Élite",
            description: "Escala tu rentabilidad con simulaciones de alta precisión. Para el trader que sabe que el tiempo es dinero y que la precisión lo es todo.",
            features: [
                "Backtesting Ilimitado: Sin restricciones de pruebas.",
                "Simulaciones en Paralelo: Prueba múltiples escenarios al mismo tiempo.",
                "Métricas Minuto a Minuto: Análisis detallado de drawdown y rentabilidad.",
                "Acceso Total: Biblioteca completa de estrategias avanzadas."
            ],
            cta: "Hazte Pro y optimiza tus ganancias",
            icon: <Zap size={140} strokeWidth={1} />,
            color: "border-accent text-accent",
            glowColor: "rgba(234, 179, 8, 0.3)",
            metalStyle: "linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
            indicatorColor: "bg-accent"
        }
    ];

    const nextPlan = () => setActiveIndex((prev) => (prev + 1) % plans.length);
    const prevPlan = () => setActiveIndex((prev) => (prev - 1 + plans.length) % plans.length);

    const currentPlan = plans[activeIndex];

    return (
        <section id="planes" className="py-20 max-w-7xl mx-auto px-6 md:px-12 bg-primary overflow-hidden">

            {/* Título de la sección */}
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
                    Planes de <span className="text-accent">Suscripción</span>
                </h2>
                <div className="h-1 w-20 bg-accent mx-auto"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-[550px] mb-1">

                {/* --- BLOQUE IZQUIERDO: TEXTO DINÁMICO (RESTURADO) --- */}
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPlan.id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <div className="space-y-2">
                                <h3 className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight ${currentPlan.color.split(' ')[1]}`}>
                                    {currentPlan.name}: <br />
                                    <span className="text-2xl md:text-3xl text-white block mt-2 font-semibold normal-case tracking-normal">
                                        {currentPlan.tagline}
                                    </span>
                                </h3>

                                <p className="text-gray-400 text-base leading-relaxed max-w-lg">
                                    {currentPlan.description}
                                </p>
                            </div>

                            <ul className="grid grid-cols-1 gap-4">
                                {currentPlan.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 + 0.3 }}
                                        className="flex items-start text-white/90 text-base gap-3"
                                    >
                                        <span className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${currentPlan.indicatorColor}`} />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <a
                                href="/login"
                                className={`inline-block mt-1 px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 border-2 text-white bg-white/5 hover:bg-white/10 ${currentPlan.color.split(' ')[0]}`}
                            >
                                {currentPlan.cta}
                            </a>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- BLOQUE DERECHO: CARD METÁLICA --- */}
                <div className="flex-1 relative flex items-center justify-center w-full">

                    {/* Efecto Glow */}
                    <AnimatePresence>
                        <motion.div
                            key={`glow-${activeIndex}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full"
                            style={{
                                backgroundColor: currentPlan.glowColor,
                                filter: 'blur(100px)',
                            }}
                        />
                    </AnimatePresence>

                    {/* Navegación - Prev */}
                    <button onClick={prevPlan} className="absolute left-0 md:-left-8 z-30 p-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all text-white group">
                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>

                    {/* Card Animada */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPlan.id}
                            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                            style={{
                                background: currentPlan.metalStyle,
                                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.3), 0 20px 50px rgba(0,0,0,0.5)'
                            }}
                            className="relative z-20 w-72 h-[420px] md:w-80 md:h-[480px] rounded-[3.5rem] flex flex-col items-center justify-center border border-white/20"
                        >
                            {/* Reflejo de luz diagonal superficial */}
                            <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none" />

                            {/* ICONO CON EFECTO GRABADO PROFUNDO */}
                            <div className="relative mb-8 text-black/70">
                                <div className="relative z-10 mix-blend-multiply opacity-80">
                                    {currentPlan.icon}
                                </div>
                                {/* Sombra clara inferior (Relieve) */}
                                <div className="absolute inset-0 translate-y-[2.5px] translate-x-[1.5px] text-white/60 blur-[1px] pointer-events-none">
                                    {currentPlan.icon}
                                </div>
                                {/* Sombra interna superior (Hundimiento) */}
                                <div className="absolute inset-0 -translate-y-[1.5px] text-black/50 blur-[2px] pointer-events-none">
                                    {currentPlan.icon}
                                </div>
                            </div>

                            {/* NOMBRE GRABADO EN LA PLACA */}
                            <div className="text-center">
                                <h4 className="text-4xl font-black uppercase tracking-widest text-black/70 mix-blend-multiply relative">
                                    {currentPlan.id === 'free' ? 'SILVER' : 'GOLD'}
                                    {/* Capa de luz para el grabado del texto */}
                                    <span className="absolute inset-0 translate-y-[1.5px] translate-x-[1px] text-white/50 blur-[0.5px] -z-10">
                                        {currentPlan.id === 'free' ? 'SILVER' : 'GOLD'}
                                    </span>
                                </h4>
                                <div className="h-[2px] w-12 bg-black/20 mx-auto mt-4 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.5)]"></div>
                            </div>

                            {/* Remaches de las esquinas */}
                            {[
                                "top-10 left-10", "top-10 right-10",
                                "bottom-10 left-10", "bottom-10 right-10"
                            ].map((pos, i) => (
                                <div key={i} className={`absolute ${pos} w-2.5 h-2.5 rounded-full bg-gradient-to-br from-black/20 to-white/50 shadow-inner border border-black/10`} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navegación - Next */}
                    <button onClick={nextPlan} className="absolute right-0 md:-right-8 z-30 p-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all text-white group">
                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Indicadores inferiores */}
            <div className="flex justify-center gap-4">
                {plans.map((plan, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-2.5 transition-all duration-500 rounded-full ${i === activeIndex ? `w-16 ${plan.indicatorColor}` : 'w-4 bg-white/10'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Plans;