import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            icon: "🌱",
            color: "border-white text-white",
            glowColor: "rgba(255, 255, 255, 0.4)"
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
            icon: "⚡",
            color: "border-accent text-accent",
            glowColor: "rgba(234, 179, 8, 0.5)"
        }
    ];

    const nextPlan = () => setActiveIndex((prev) => (prev + 1) % plans.length);
    const prevPlan = () => setActiveIndex((prev) => (prev - 1 + plans.length) % plans.length);

    const currentPlan = plans[activeIndex];

    return (
        <section id="planes" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary overflow-hidden">

            {/* Título de la sección */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
                    Planes de <span className="text-accent">Suscripción</span>
                </h2>
                <div className="h-1 w-20 bg-accent mx-auto"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-[600px]">

                {/* --- BLOQUE IZQUIERDO: TEXTO DINÁMICO --- */}
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
                            <div className="space-y-4">
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
                                        <span className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${currentPlan.color.split(' ')[0].replace('border', 'bg')}`} />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <a
                                href="/login"
                                className={`inline-block mt-4 px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 border-2 text-white bg-white/5 hover:bg-white/10 ${currentPlan.color.split(' ')[0]}`}
                            >
                                {currentPlan.cta}
                            </a>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- BLOQUE DERECHO: CARD Y GLOW --- */}
                <div className="flex-1 relative flex items-center justify-center py-10 w-full">

                    {/* Círculo Glow (Figma style) */}
                    <AnimatePresence>
                        <motion.div
                            key={`glow-${activeIndex}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full"
                            style={{
                                backgroundColor: currentPlan.glowColor,
                                filter: 'blur(100px)',
                            }}
                        />
                    </AnimatePresence>

                    {/* Navegación - Prev */}
                    <button onClick={prevPlan} className="absolute left-0 md:-left-8 z-30 p-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all text-white group">
                        <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    {/* Card Animada */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPlan.id}
                            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                            className={`relative z-20 w-72 h-96 md:w-80 md:h-[450px] border-4 rounded-[3rem] flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl ${currentPlan.color.split(' ')[0]}`}
                        >
                            <motion.div
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                className="text-9xl mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] grayscale-[0.2]"
                            >
                                {currentPlan.icon}
                            </motion.div>
                            <p className={`font-black text-3xl uppercase tracking-[0.2em] text-center px-4 ${currentPlan.color.split(' ')[1]}`}>
                                {currentPlan.name}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navegación - Next */}
                    <button onClick={nextPlan} className="absolute right-0 md:-right-8 z-30 p-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all text-white group">
                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            {/* Indicadores inferiores */}
            <div className="flex justify-center gap-4 mt-16">
                {plans.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-2.5 transition-all duration-500 rounded-full ${i === activeIndex ? 'w-16 bg-accent' : 'w-4 bg-white/10'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Plans;