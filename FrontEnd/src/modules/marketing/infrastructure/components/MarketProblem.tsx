import React, { useEffect, useState, useRef } from 'react';


//Este es un componente que muestra un carrusel de problemas
const MarketProblem: React.FC = () => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [start, setStart] = useState(false);

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

    useEffect(() => {
        addAnimation();
    }, []);

    function addAnimation() {
        if (scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            setStart(true);
        }
    }

    return (
        <section id="problemas" className="py-24 bg-primary overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                Problemas a solucionar
            </h2>

            <div className="relative z-20 max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <div
                    ref={scrollerRef}
                    className={`flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap ${start ? "animate-scroll" : ""}`}
                    style={{
                        "--animation-duration": "30s",
                        "--animation-direction": "reverse"
                    } as React.CSSProperties}
                >
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="bg-accent p-10 rounded-3xl text-white text-center hover:scale-105 transition duration-300 flex flex-col items-center justify-center aspect-square w-[350px] md:w-[400px] shrink-0"
                        >
                            <div className="bg-white/20 p-4 rounded-full mb-6">
                                <span className="text-5xl">{problem.icon}</span>
                            </div>
                            <p className="font-montserrat font-bold text-xl md:text-2xl leading-tight">
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketProblem;
