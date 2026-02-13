import React from 'react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-32 px-6 flex justify-center items-center bg-black/50">
            {/* Contenedor General para manejar el posicionamiento relativo */}
            <div className="relative w-full max-w-5xl">

                {/* Primer Container: Fondo #191A1F, bordes redondeados, centrado y con ancho limitado */}
                <div className="bg-[#191A1F] rounded-[48px] p-8 md:p-16 relative shadow-2xl border border-white/5 min-h-[500px] flex items-center">

                    <div className="grid md:grid-cols-12 gap-12 w-full items-center">

                        {/* Segundo Contenedor: Color #F0B90B, sobrepasa verticalmente el primer container */}
                        <div className="col-span-12 md:col-span-4 relative md:static">
                            <div className="md:absolute md:-top-16 md:-bottom-16 md:left-12 w-full md:w-80 bg-[#F0B90B] rounded-[40px] shadow-2xl flex flex-col justify-center p-10 z-10">
                                <div className="flex justify-center w-full -mt-4 mb-2">
                                    <img
                                        src="/contact/botsito.svg"
                                        alt="Bot Mascot"
                                        className="w-40 h-40 object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <h2 className="text-4xl font-black text-[#191A1F] leading-tight mb-6 text-center md:text-left">
                                    ¿NECESITAS AYUDA?
                                </h2>
                                <p className="text-[#191A1F]/80 font-bold text-sm mb-8 leading-relaxed">
                                    En Botforge, estamos listos para llevar tu estrategia de trading al siguiente nivel. Si tienes preguntas sobre la validación de tus bots, integración de datos o necesitas soporte especializado, escríbenos.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-[#191A1F]">
                                        <div className="bg-[#191A1F]/10 p-3 rounded-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9 7 9-7" /><path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" /></svg>
                                        </div>
                                        <span className="font-black text-sm break-all">soporte@botforge.com</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[#191A1F]">
                                        <div className="bg-[#191A1F]/10 p-3 rounded-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        </div>
                                        <span className="font-black text-sm">+34 900 123 456</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenedor Derecho: Formulario */}
                        <div className="col-span-12 md:col-span-8 md:pl-24">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-black uppercase tracking-widest ml-1">Nombre</label>
                                        <input
                                            type="text"
                                            placeholder="Tu nombre"
                                            className="w-full bg-[#25262B] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 transition duration-300 placeholder:text-white/10 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-black uppercase tracking-widest ml-1">Apellido</label>
                                        <input
                                            type="text"
                                            placeholder="Tu apellido"
                                            className="w-full bg-[#25262B] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 transition duration-300 placeholder:text-white/10 font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-black uppercase tracking-widest ml-1">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        className="w-full bg-[#25262B] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 transition duration-300 placeholder:text-white/10 font-bold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-black uppercase tracking-widest ml-1">Mensaje</label>
                                    <textarea
                                        rows={4}
                                        placeholder="¿En qué podemos ayudarte?"
                                        className="w-full bg-[#25262B] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 transition duration-300 placeholder:text-white/10 font-bold resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-[#F0B90B] text-[#191A1F] font-black text-lg py-5 px-10 rounded-2xl w-full md:w-auto shadow-[0_10px_20px_-5px_rgba(240,185,11,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(240,185,11,0.5)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer uppercase tracking-tighter"
                                >
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

