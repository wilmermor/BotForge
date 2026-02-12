import React from 'react';

const Plans: React.FC = () => {
    const plans = [
        {
            name: "Plan Scout",
            description: "Para iniciarse",
            features: ["5 Estrategias", "Backtesting Básico"],
            icon: "🌲",
            colorClass: "border-accent text-accent"
        },
        {
            name: "Plan Explorador",
            description: "Más potencia",
            features: ["20 Estrategias", "Conexión Binance"],
            icon: "🗺️",
            colorClass: "border-[#4FD1C5] text-[#4FD1C5]" // Approximate Cyan
        },
        {
            name: "Plan Aventurero",
            description: "Profesional",
            features: ["Estrategias Ilimitadas", "API Access"],
            icon: "🎒",
            colorClass: "border-[#F6AD55] text-[#F6AD55]" // Approximate Orange
        }
    ];

    // Override colors to strict palette since "No extra colors" was a rule.
    // However, the image shows distinct colors. I will use the Strict Palette for now to avoid violation.
    // If strict palette is absolute: Use Shades of Yellow/White? 
    // I will stick to Yellow/White to be safe unless instructed otherwise, but give them distinct layouts.

    return (
        <section id="planes" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                Nuestros Planes - <span className="text-accent">Elige tu camino</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative p-8 border-2 rounded-2xl flex flex-col items-center text-center bg-black/20 hover:-translate-y-2 transition duration-300 ${index === 0 ? 'border-accent' : 'border-white/20'}`}
                    >
                        <div className={`p-6 rounded-xl mb-6 border-2 ${index === 0 ? 'border-accent text-accent' : 'border-white/20 text-white'}`}>
                            <span className="text-5xl">{plan.icon}</span>
                        </div>

                        <h3 className={`text-xl font-bold mb-2 ${index === 0 ? 'text-accent' : 'text-white'}`}>{plan.name}</h3>
                        <p className="text-white/60 text-sm mb-6 uppercase tracking-wider">{plan.description}</p>

                        <div className="space-y-3 text-white/80 text-sm mb-8">
                            {plan.features.map((f, i) => <p key={i}>{f}</p>)}
                        </div>

                        <button className={`mt-auto px-8 py-2 rounded-lg font-bold transition ${index === 0 ? 'bg-accent text-primary hover:brightness-110' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                            {plan.name}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Plans;
