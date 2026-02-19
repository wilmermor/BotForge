import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
    title?: string;
    subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({
    title = "Diseña y comprueba tus Bots de trading",
}) => {
    return (
        // Contenedor global - ocupa toda la pantalla
        <section className="relative w-full min-h-screen">

            {/* Contenedor interno principal - centrado y con padding */}
            <div
                className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto bg-no-repeat bg-center"
                style={{
                    maxWidth: '1400px',
                    backgroundImage: "url('/Frames/botforge.svg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >


                {/* Estructura de tabla de 2 filas */}
                <div className="flex flex-col min-h-screen py-12">

                    {/* Fila 1 - Título en BLANCO */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-7 drop-shadow-lg">
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* Fila 2 - Tres columnas con MISMO ANCHO */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-25 items-stretch mb-15">

                        {/* Columna 1 - Con ancho controlado */}
                        <div className="col-span-1 flex items-center h-full">
                            <div className="bg-transparent rounded-lg p-6 
                                              flex flex-col items-center justify-center 
                                              h-full w-full max-w-md mx-auto text-left">
                                <div className="space-y-4">
                                    <h3 className="text-xl text-white font-bold drop-shadow-md">
                                        Valida sus estrategias sin arriesgar el capital
                                    </h3>
                                    <p className="text-white/90 font-medium leading-relaxed drop-shadow-md">
                                        Convierte la especulación en ciencia aplicada, eliminando la incertidumbre antes de operar en el mercado real
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Columna 2 - Vacía (mismo ancho) */}
                        <div className="col-span-1"></div>

                        {/* Columna 3 - MISMO ANCHO que columna 1 */}
                        <div className="col-span-1 flex items-center h-full">
                            <div className="bg-transparent rounded-lg p-6 
                                              flex flex-col items-center justify-center 
                                              h-full w-full max-w-md mx-auto text-center">
                                <div className="space-y-5">
                                    <p className="text-white font-semibold text-lg leading-relaxed drop-shadow-md">
                                        Mitiga la barrera más significativa
                                        para la adopción del trading algorítmico
                                    </p>
                                    <div className="flex justify-center">
                                        <Link
                                            to="/login"
                                            className="group inline-flex items-center gap-3 
                                                             bg-white/10 backdrop-blur-sm
                                                             text-white font-semibold
                                                             px-6 py-3 rounded-full
                                                             hover:bg-white/20 
                                                             hover:-translate-y-1
                                                             transition-all duration-300 ease-in-out
                                                             shadow-lg hover:shadow-xl"
                                        >
                                            Empieza ya
                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                →
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;