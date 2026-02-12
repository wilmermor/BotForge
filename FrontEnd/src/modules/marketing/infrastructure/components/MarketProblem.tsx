import React from 'react';

const MarketProblem: React.FC = () => {
    const problems = [
        {
            title: "Volatilidad extrema",
            description: "El mercado de criptomonedas es altamente volátil.",
            icon: "📊"
        },
        {
            title: "Dependencia del backtesting",
            description: "El backtesting histórico no garantiza resultados futuros.",
            icon: "📉"
        },
        {
            title: "Alto riesgo de fracaso",
            description: "La gran mayoría de los traders pierden dinero sin validación.",
            icon: "⚠️"
        }
    ];

    return (
        <section id="problemas" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                Problemas a solucionar
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
                {problems.map((problem, index) => (
                    <div key={index} className="bg-accent p-8 rounded-3xl text-primary text-center hover:scale-105 transition duration-300 flex flex-col items-center justify-center aspect-square">
                        <div className="bg-white/20 p-4 rounded-full mb-6">
                            <span className="text-4xl">{problem.icon}</span>
                        </div>
                        <p className="font-bold text-lg leading-tight">
                            {problem.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarketProblem;
