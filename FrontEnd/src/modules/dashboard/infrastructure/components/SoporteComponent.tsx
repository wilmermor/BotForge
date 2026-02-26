import { MessageSquare, Send, Mail, Phone, ExternalLink, HelpCircle, FileText, Globe } from 'lucide-react';

const SoporteComponent = () => {
    return (
        <div className="w-full h-full flex flex-col gap-8 animate-fade-in pb-10">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#1E2329] to-[#0B0E11] rounded-2xl p-8 border border-[#2B3139] flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-3">¿Cómo podemos ayudarte hoy?</h2>
                    <p className="text-[#848E9C] text-lg max-w-xl">Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier duda o problema técnico.</p>
                </div>
                <div className="hidden lg:block relative">
                    <div className="h-32 w-32 bg-[#F0B90B] rounded-full filter blur-[60px] opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    <HelpCircle className="h-24 w-24 text-[#F0B90B] relative z-10 opacity-80" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Contact Channels */}
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-xl font-bold text-white">Canales de Atención</h3>

                    <div className="space-y-4">
                        <div className="bg-[#1E2329] p-5 rounded-xl border border-[#2B3139] hover:border-[#F0B90B] transition-colors group">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-[#F0B90B]/10 rounded-lg group-hover:bg-[#F0B90B] group-hover:text-black text-[#F0B90B] transition-colors">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">Chat en Vivo</div>
                                    <div className="text-[#02C076] text-xs font-bold">Conectado (Espera: 2 min)</div>
                                </div>
                            </div>
                            <button className="w-full py-2.5 bg-[#2B3139] text-white rounded-lg text-sm font-bold border border-[#3A4149] hover:bg-[#3A4149] transition-all">
                                Iniciar Chat
                            </button>
                        </div>

                        <div className="bg-[#1E2329] p-5 rounded-xl border border-[#2B3139] hover:border-[#F0B90B] transition-colors group">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-[#F0B90B]/10 rounded-lg group-hover:bg-[#F0B90B] group-hover:text-black text-[#F0B90B] transition-colors">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">Tickets / Email</div>
                                    <div className="text-[#848E9C] text-xs">Respuesta en {'<'} 24h</div>
                                </div>
                            </div>
                            <button className="w-full py-2.5 bg-[#2B3139] text-white rounded-lg text-sm font-bold border border-[#3A4149] hover:bg-[#3A4149] transition-all">
                                Enviar Ticket
                            </button>
                        </div>

                        <div className="bg-[#1E2329] p-5 rounded-xl border border-[#2B3139] hover:border-[#F0B90B] transition-colors group">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-[#F0B90B]/10 rounded-lg group-hover:bg-[#F0B90B] group-hover:text-black text-[#F0B90B] transition-colors">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">Línea Directa</div>
                                    <div className="text-[#848E9C] text-xs">Usuarios Plan Pro</div>
                                </div>
                            </div>
                            <button className="w-full py-2.5 bg-[#2B3139] text-white rounded-lg text-sm font-bold border border-[#3A4149] hover:bg-[#3A4149] transition-all">
                                Ver Número
                            </button>
                        </div>
                    </div>

                    <div className="p-6 bg-[#0B0E11] border border-[#2B3139] rounded-xl">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Globe className="h-4 w-4 text-[#F0B90B]" />
                            Redes Oficiales
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center gap-2 text-[#848E9C] hover:text-white transition-colors text-sm">
                                <ExternalLink className="h-3 w-3" /> Telegram
                            </button>
                            <button className="flex items-center gap-2 text-[#848E9C] hover:text-white transition-colors text-sm">
                                <ExternalLink className="h-3 w-3" /> Twitter (X)
                            </button>
                            <button className="flex items-center gap-2 text-[#848E9C] hover:text-white transition-colors text-sm">
                                <ExternalLink className="h-3 w-3" /> Discord
                            </button>
                            <button className="flex items-center gap-2 text-[#848E9C] hover:text-white transition-colors text-sm">
                                <ExternalLink className="h-3 w-3" /> YouTube
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Knowledge Base / FAQ */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-white">Base de Conocimientos</h3>

                    <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] overflow-hidden">
                        <div className="p-6 border-b border-[#2B3139] flex items-center justify-between gap-4">
                            <div className="relative flex-1">
                                <Send className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#848E9C]" />
                                <input
                                    type="text"
                                    placeholder="¿Cuál es tu duda? Ej: 'Cómo conectar exchange'..."
                                    className="w-full bg-[#0B0E11] border border-[#2B3139] focus:border-[#F0B90B] focus:outline-none rounded-lg pl-10 pr-4 py-2 text-white text-sm"
                                />
                            </div>
                        </div>

                        <div className="p-2">
                            {[
                                { title: "¿Cómo funciona el simulador de trading?", icon: FileText },
                                { title: "Pasos para conectar tu API de Binance", icon: HelpCircle },
                                { title: "Diferencias entre Plan Starter y Plan Pro", icon: FileText },
                                { title: "Cómo configurar el Stop Loss de mi Bot", icon: HelpCircle },
                                { title: "Métodos de retiro y depósitos", icon: FileText },
                            ].map((faq, i) => (
                                <button key={i} className="w-full p-4 flex items-center justify-between hover:bg-[#2B3139] rounded-lg group transition-all text-left">
                                    <div className="flex items-center gap-4">
                                        <faq.icon className="h-5 w-5 text-[#848E9C] group-hover:text-[#F0B90B]" />
                                        <span className="text-white text-sm font-medium">{faq.title}</span>
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-[#848E9C] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>

                        <div className="p-4 bg-[#2B3139]/30 text-center">
                            <button className="text-[#F0B90B] text-sm font-bold hover:underline">
                                Ver toda la documentación →
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats or Status */}
                    <div className="bg-[#1E2329] p-6 rounded-xl border border-[#2B3139]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-[#02C076] shadow-[0_0_10px_rgba(2,192,118,0.5)]"></div>
                                <span className="text-white font-medium">Estado del Sistema</span>
                            </div>
                            <span className="text-[#02C076] text-xs font-bold uppercase tracking-wider">Operativo</span>
                        </div>
                        <p className="text-[#848E9C] text-xs mt-3">Todos los servicios (API, Simulador, Autenticación) están funcionando correctamente.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoporteComponent;
