import React from 'react';

const Solutions: React.FC = () => {
    const solutions = [
        {
            title: "Fácil y Visual",
            description: "No requiere código. Enlace una visualización de operaciones simple.",
            icon: "🧩"
        },
        {
            title: "Mitigación de Riesgos",
            description: "Enseñanza de bot trading seg. y 100% libre de capital real.",
            icon: "🛡️"
        },
        {
            title: "Validación Superior",
            description: "Dedícate a la validación visual y backtesting de alta fidelidad.",
            icon: "⚙️"
        }
    ];

    return (
        <section id="soluciones" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary">
            <div className="grid md:grid-cols-3 gap-10">
                {solutions.map((sol, index) => (
                    <div key={index} className="bg-accent text-primary p-8 rounded-3xl flex flex-col items-center text-center hover:scale-105 transition duration-300">
                        <div className="text-4xl mb-4">
                            {/* Icon Placeholder - Text based for now */}
                            {sol.icon}
                        </div>
                        <h3 className="font-bold text-xl mb-4">{sol.title}</h3>
                        <p className="opacity-90 leading-snug font-medium">
                            {sol.description}
                        </p>
                        {/* Placeholder for image inside card if needed, based on reference */}
                        <div className="mt-6 w-full h-32 bg-black/10 rounded-xl flex items-center justify-center">
                            <span className="text-primary/50 text-sm">[Imagen]</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Solutions;
