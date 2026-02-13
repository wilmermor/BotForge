import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <section id="acerca-de" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Image Side */}
                <div className="order-2 md:order-1 relative">
                    <div className="w-[400px] h-[500px] bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative">
                        {/* Imagen de Trading/Equipo */}
                        <img
                            src="/AboutUs/image.png"
                            alt="BotForge Trading Platform"
                            className="w-full h-full object-cover"
                        />

                        {/* 🔥 OVERLAY RADIAL - Centro transparente, bordes color primary */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle at center, transparent 30%, #0A1929 90%)'
                            }}
                        />

                        {/* Capa decorativa */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none"></div>
                    </div>
                </div>

                {/* Text Side */}
                <div className="order-1 md:order-2 text-right md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        ¿Quiénes somos?
                    </h2>
                    <p className="text-white/70 leading-loose text-lg">
                        Somos facilitadores de tecnología para traders. Nuestra plataforma **BotForge** permite la validación visual y backtesting de alta fidelidad, eliminando la incertidumbre antes de operar en el mercado real con capital propio.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;