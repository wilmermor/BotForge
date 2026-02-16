import React from 'react';

const Solutions: React.FC = () => {
    const solutions = [
        {
            title: "Fácil y Visual",
            description: "No requiere código. Enlace una visualización de operaciones simple.",
            image: "/Img-solutions/1.svg"
        },
        {
            title: "Mitigación de Riesgos",
            description: "Enseñanza de bot trading seg. y 100% libre de capital real.",
            image: "/Img-solutions/2.svg"
        },
        {
            title: "Validación Superior",
            description: "Dedícate a la validación visual y backtesting de alta fidelidad.",
            image: "/Img-solutions/3.svg"
        }
    ];

    return (
        <section id="soluciones" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary">
            <div className="grid md:grid-cols-3 gap-10">
                {solutions.map((sol, index) => (
                    <div
                        key={index}
                        className="relative bg-accent text-primary w-[320px] h-[460px] md:w-[340px] md:h-[480px] lg:w-[360px] lg:h-[450px] rounded-3xl flex flex-col items-center text-center hover:scale-105 transition-all duration-300 mx-auto group overflow-hidden"
                    >
                        {/* 🟡 BARRA AMARILLA INFERIOR - ANIMACIÓN IZQUIERDA A DERECHA */}
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-[#B57C00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left z-20" />

                        {/* FONDO DE IMAGEN - COVER */}
                        <div
                            className="absolute inset-0 w-full h-full z-0"
                            style={{
                                backgroundImage: `url(${sol.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />

                        {/* OVERLAY OSCURO */}
                        <div className="absolute inset-0 z-1 bg-black/10" />

                        {/* CONTENIDO */}
                        <div className="relative z-10 flex flex-col items-center w-full pt-12 px-8">
                            <h3 className="font-bold text-xl mb-4 text-black drop-shadow-lg">
                                {sol.title}
                            </h3>
                            <p className="opacity-95 leading-snug font-medium text-black/90 drop-shadow-md max-w-[90%]">
                                {sol.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Solutions;