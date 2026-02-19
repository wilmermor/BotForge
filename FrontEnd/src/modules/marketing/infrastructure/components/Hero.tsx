import React from 'react';
import { Link } from 'react-router-dom';
import TechBar from './TechBar';

interface HeroProps {
    title?: string;
    subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({
    title = "Diseña y comprueba tus Bots de trading",
}) => {
    return (
        // Contenedor global
        <section className="relative w-full bg-[#191A1F] ">

            {/* 1. CONTENEDOR DEL CONTENIDO (LIMITADO A 1400PX) */}
            <div
                className="w-full px-4 sm:px-6 border-none ring-0 outline-none rounded-b-[3rem] md:px-8 lg:px-12 xl:px-16 mx-auto bg-no-repeat bg-center min-h-[90vh]"
                style={{
                    maxWidth: '1400px',
                    backgroundImage: "url('/Frames/botforge.svg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="flex flex-col py-12">
                    {/* Fila 1 - Título */}
                    <div className="flex-1 flex items-center justify-center min-h-[40vh]">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-7 drop-shadow-lg">
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* Fila 2 - Columnas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-24 items-stretch mb-20">
                        <div className="col-span-1 flex items-center">
                            <div className="space-y-4 max-w-md mx-auto text-left">
                                <h3 className="text-xl text-white font-bold drop-shadow-md">
                                    Valida sus estrategias sin arriesgar el capital
                                </h3>
                                <p className="text-white/90 font-medium leading-relaxed drop-shadow-md">
                                    Convierte la especulación en ciencia aplicada, eliminando la incertidumbre antes de operar en el mercado real
                                </p>
                            </div>
                        </div>

                        <div className="col-span-1 hidden md:block"></div>

                        <div className="col-span-1 flex items-center">
                            <div className="space-y-5 max-w-md mx-auto text-center">
                                <p className="text-white font-semibold text-lg leading-relaxed drop-shadow-md">
                                    Mitiga la barrera más significativa para la adopción del trading algorítmico
                                </p>
                                <div className="flex justify-center">
                                    <Link
                                        to="/login"
                                        className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        Empieza ya
                                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CONTENEDOR DEL TECHBAR (FUERA DEL LÍMITE DE 1400PX) */}
            <div className="w-full border-none ring-0 outline-none">
                <TechBar />
            </div>

        </section>
    );
};

export default Hero;