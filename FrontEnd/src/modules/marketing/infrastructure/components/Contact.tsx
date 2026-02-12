import React from 'react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary relative overflow-hidden">
            {/* Decorative Background Glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Visual Side (Mascot + Info) */}
                <div className="bg-accent text-primary p-10 rounded-3xl relative">
                    <div className="absolute -top-10 -right-10 text-9xl opacity-20 rotate-12">🤖</div>

                    <div className="mb-8">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-4xl">
                            🤖
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Contáctanos</h2>
                        <p className="font-medium opacity-80">Estamos aquí para ayudarte.</p>
                    </div>

                    <div className="space-y-4 font-semibold">
                        <div className="flex items-center gap-3">
                            <span>📞</span> <span>+34 900 123 456</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>📧</span> <span>soporte@botforge.com</span>
                        </div>
                        <div className="flex gap-4 mt-6 text-2xl">
                            {/* Social Icons Placeholder */}
                            <span>🐦</span><span>💼</span><span>📸</span>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <form className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition placeholder:text-white/30"
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition placeholder:text-white/30"
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition placeholder:text-white/30"
                    />
                    <textarea
                        rows={4}
                        placeholder="Tu mensaje..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition placeholder:text-white/30 resize-none"
                    ></textarea>

                    <button type="submit" className="bg-accent text-black font-bold hover:brightness-110 transition px-8 py-3 rounded-xl w-full cursor-pointer shadow-[0_4px_14px_0_rgba(240,185,11,0.39)]">
                        Enviar
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
