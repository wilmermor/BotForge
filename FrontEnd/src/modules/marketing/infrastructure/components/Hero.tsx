import React, { useEffect, useRef } from 'react';
import { Banknote } from 'lucide-react';

const Hero: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const img = new Image();
        img.src = '/Frames/botforge.svg';

        img.onload = () => {
            const container = canvas.parentElement;
            if (!container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            canvas.width = width;
            canvas.height = height;

            context.clearRect(0, 0, width, height);

            // 🟢 MODO COVER - Zoom para llenar TODO el espacio SIN deformar
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const containerRatio = width / height;

            let renderWidth, renderHeight, x, y;

            if (imgRatio > containerRatio) {
                // Imagen más ancha que el contenedor - ajustar por ALTO
                renderHeight = height;
                renderWidth = height * imgRatio;
                x = (width - renderWidth) / 2;
                y = 0;
            } else {
                // Imagen más alta que el contenedor - ajustar por ANCHO
                renderWidth = width;
                renderHeight = width / imgRatio;
                x = 0;
                y = (height - renderHeight) / 2;
            }

            context.drawImage(img, x, y, renderWidth, renderHeight);
        };
    }, []);

    return (
        <section id="inicio" className="relative w-full h-screen bg-black">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: 'block' }}
                />

                <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
                        {/* 🍞 MIGAS DE PAN - Título ajustable */}
                        <div className="mt-16 md:mt-20 lg:mt-24 mb-auto lg:mr-30 lg:mt-20">
                            <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold text-white drop-shadow-lg leading-tight text-right">
                                Diseña y Comprueba tus Bots de<br />Trading
                            </h1>
                        </div>

                        {/* 📊 TABLA DE 3 COLUMNAS INVISIBLE */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 mb-16 md:mb-20 lg:mb-28">

                            {/* COLUMNA 1 - Propuesta principal */}
                            <div className="col-span-1">
                                <p className="text-xl md:text-2xl text-white/70 font-bold mb-4 drop-shadow-md">
                                    Valide sus estrategias sin arriesgar capital.
                                </p>
                                <p className="text-white/80 text-base md:text-lg leading-relaxed drop-shadow-md font-light">
                                    Convierta la especulación en ciencia aplicada, eliminando la incertidumbre antes de operar en el mercado real.
                                </p>
                                {/* 🪙 ICONO DE BILLETE BLANCO */}
                                <div className="mt-6 flex items-center gap-2 text-white/60">
                                    <Banknote className="w-20 h-20 text-white" />
                                </div>
                            </div>

                            {/* COLUMNA 2 - ESPACIO VACÍO (solo separación) */}
                            <div className="col-span-1 hidden lg:block"></div>

                            {/* COLUMNA 3 - Valor adicional + Botón - CON ESPACIADO PROFESIONAL */}
                            <div className="col-span-1 flex flex-col h-full">
                                <div className="flex-10"></div> {/* 🟢 EMPUJA TODO HACIA ABAJO */}
                                <div>
                                    <p className="text-white/70 text-base md:text-lg mb-6 drop-shadow-md font-light border-l-4 border-yellow-400 pl-4">
                                        Mitiga la barrera más significativa para la adopción del trading algorítmico.
                                    </p>
                                    <div className="pointer-events-auto">
                                        <a
                                            href="/iniciar-sesion"
                                            className="inline-flex items-center gap-3 bg-white/30 backdrop-blur-sm text-black font-light-bold hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out px-6 py-3 rounded-2xl text-lg group"
                                        >
                                            Empieza ya
                                            <span className="bg-accent backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-white">
                                                →
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex-1"></div> {/* 🟢 ESPACIO EQUILIBRADO */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;