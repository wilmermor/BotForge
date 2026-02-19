import React, { useEffect, useState, useRef } from 'react';
import { TriangleAlert } from 'lucide-react';

//Este es un componente que muestra un carrusel de problemas
const MarketProblem: React.FC = () => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [start, setStart] = useState(false);

    const problems = [
        {
            title: "Volatilidad extrema",
            description: "El mercado de criptomonedas es altamente volátil.",
            icon: "/Img-MarketoProblem/Icon-2.svg"
        },
        {
            title: "Dependencia del backtesting",
            description: "El backtesting histórico no garantiza resultados futuros.",
            icon: "/Img-MarketoProblem/Icon-1.svg"
        },
        {
            title: "Alto riesgo de fracaso",
            description: "La gran mayoría de los traders pierden dinero sin validación.",
            icon: TriangleAlert
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
        <section id="problemas" className="py-10 bg-primary overflow-hidden">
            <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
                    Problemas a <span className="text-accent">solucionar</span>
                </h2>
                <div className="h-1 w-20 bg-accent mx-auto"></div>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <div
                    ref={scrollerRef}
                    className={`flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap ${start ? "animate-scroll" : ""}`}
                    style={{
                        "--animation-duration": "30s",
                        "--animation-direction": "reverse"
                    } as React.CSSProperties}
                >
                    {problems.map((problem, index) => {
                        const Icon = problem.icon;
                        return (
                            <div
                                key={index}
                                className="bg-accent p-10 rounded-3xl text-white text-center hover:scale-105 transition duration-300 flex flex-col items-center justify-center aspect-square w-[350px] md:w-[400px] shrink-0"
                            >
                                <div className="mb-8">
                                    {typeof Icon === 'string' ? (
                                        <img
                                            src={Icon}
                                            alt={problem.title}
                                            className="w-48 h-48 object-contain brightness-0 invert"
                                        />
                                    ) : (
                                        <Icon
                                            size={128}
                                            className="text-white"
                                            strokeWidth={2}
                                            style={{ color: 'white' }}
                                        />
                                    )}
                                </div>
                                <p className="font-montserrat font-bold text-xl md:text-2xl leading-tight">
                                    {problem.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default MarketProblem;
