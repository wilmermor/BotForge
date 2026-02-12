import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="inicio" className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Left Column */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                        Valide sus estrategias de trading en un entorno seguro integrado con Binance
                    </h1>
                    <p className="mt-6 text-white/70 text-lg leading-relaxed">
                        Valide sus estrategias sin arriesgar capital.
                        Convierta la especulación en ciencia aplicada, eliminando la incertidumbre antes de operar en el mercado real.
                    </p>
                    <button className="mt-10 bg-accent text-black font-semibold hover:brightness-110 transition px-8 py-3 rounded-xl cursor-pointer">
                        Empieza ya
                    </button>
                </div>

                {/* Right Column (Placeholder) */}
                <div className="border-2 border-dashed border-accent rounded-xl p-20 text-center text-white/40">
                    [+ INSERTAR IMAGEN HERO]
                </div>
            </div>
        </section>
    );
};

export default Hero;
