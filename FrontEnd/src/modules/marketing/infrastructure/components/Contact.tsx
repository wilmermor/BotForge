import React from 'react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-12 mb-10 px-6 flex justify-center items-center bg-primary">
            {/* Contenedor General */}
            <div className="relative w-full max-w-5xl">

                {/* Primer Container: Fondo #191A1F */}
                <div className="bg-[#191A1F] rounded-[40px] p-6 md:p-12 relative shadow-2xl border border-white/5 flex items-center">

                    <div className="grid md:grid-cols-12 gap-8 w-full items-center">

                        {/* Segundo Contenedor: Caja Amarilla */}
                        <div className="col-span-12 md:col-span-4 relative md:static">
                            <div className="md:absolute md:-top-8 md:-bottom-8 md:left-8 w-full md:w-72 bg-[#F0B90B] rounded-[32px] shadow-2xl flex flex-col justify-center p-8 z-10">
                                <div className="flex justify-center w-full -mt-2 mb-2">
                                    <img
                                        src="/contact/botsito.svg"
                                        alt="Bot Mascot"
                                        className="w-32 h-32 object-contain drop-shadow-xl"
                                    />
                                </div>
                                <h2 className="text-3xl font-black text-[#191A1F] leading-tight mb-4 text-center md:text-left">
                                    ¿NECESITAS AYUDA?
                                </h2>
                                <p className="text-[#191A1F]/80 font-bold text-xs mb-6 leading-relaxed">
                                    En Botforge, estamos listos para llevar tu estrategia de trading al siguiente nivel. Escríbenos si tienes dudas.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-[#191A1F]">
                                        <div className="bg-[#191A1F]/10 p-2 rounded-xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9 7 9-7" /><path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" /></svg>
                                        </div>
                                        <span className="font-black text-xs break-all">soporte@botforge.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#191A1F]">
                                        <div className="bg-[#191A1F]/10 p-2 rounded-xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        </div>
                                        <span className="font-black text-xs">+34 900 123 456</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenedor Derecho: Formulario */}
                        <div className="col-span-12 md:col-span-8 md:pl-20">
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-white/40 text-[10px] font-black uppercase tracking-widest ml-1">Nombre</label>
                                        <input
                                            type="text"
                                            placeholder="Tu nombre"
                                            className="w-full bg-[#25262B] border border-white/5 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 transition duration-300 placeholder:text-white/10 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-white/40 text-[10px] font-black uppercase tracking-widest ml-1">Apellido</label>
                                        <input
                                            type="text"
                                            placeholder="Tu apellido"
                                            className="w-full bg-[#25262B] border border-white/5 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 transition duration-300 placeholder:text-white/10 font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-white/40 text-[10px] font-black uppercase tracking-widest ml-1">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        className="w-full bg-[#25262B] border border-white/5 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 transition duration-300 placeholder:text-white/10 font-bold"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-white/40 text-[10px] font-black uppercase tracking-widest ml-1">Mensaje</label>
                                    <textarea
                                        rows={3}
                                        placeholder="¿En qué podemos ayudarte?"
                                        className="w-full bg-[#25262B] border border-white/5 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 transition duration-300 placeholder:text-white/10 font-bold resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-[#F0B90B] text-[#191A1F] font-black text-base py-4 px-8 rounded-xl w-full md:w-auto shadow-lg hover:shadow-[#F0B90B]/20 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer uppercase tracking-tighter mt-2"
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