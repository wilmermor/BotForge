import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Send, Mail, Phone, ExternalLink, HelpCircle, FileText, ArrowLeft, Copy, Check } from 'lucide-react';
import { baseConocimientoArticulos } from '../data/documentationData';

const SoporteComponent = () => {
    const navigate = useNavigate();
    const [expandedCard, setExpandedCard] = useState<'ticket' | 'phone' | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                        {/* Card 1: Tickets/Email */}
                        <div className={`bg-[#1E2329] p-5 rounded-xl border transition-all duration-300 ${expandedCard === 'ticket' ? 'border-[#F0B90B] ring-1 ring-[#F0B90B]' : 'border-[#2B3139] hover:border-[#F0B90B] cursor-pointer'}`}
                            onClick={() => expandedCard !== 'ticket' && setExpandedCard('ticket')}>

                            {expandedCard !== 'ticket' ? (
                                <>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="p-3 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B]">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold">Tickets / Email</div>
                                            <div className="text-[#848E9C] text-xs">Respuesta en {'<'} 24h</div>
                                        </div>
                                    </div>
                                    <button className="w-full py-2.5 bg-[#2B3139] text-white rounded-lg text-sm font-bold border border-[#3A4149] hover:bg-[#3A4149] transition-all">
                                        Abrir Ticket
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B]">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <div className="text-white font-bold">Enviar Ticket</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}
                                                className="p-1 hover:bg-[#2B3139] rounded-full text-[#848E9C] hover:text-[#F0B90B] transition-colors"
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-[#848E9C] mb-1.5">Asunto</label>
                                        <input
                                            type="text"
                                            placeholder="Motivo de su consulta"
                                            className="w-full bg-[#0B0E11] border border-[#2B3139] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-2 text-white text-sm focus:ring-1 focus:ring-[#F0B90B]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-[#848E9C] mb-1.5">Descripción</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Detalle su problemática aquí..."
                                            className="w-full bg-[#0B0E11] border border-[#2B3139] focus:border-[#F0B90B] focus:outline-none rounded-lg px-4 py-2 text-white text-sm resize-none focus:ring-1 focus:ring-[#F0B90B]"
                                        ></textarea>
                                    </div>

                                    <div className="flex gap-2 pt-1">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}
                                            className="flex-1 py-2 bg-[#2B3139] text-white rounded-lg text-sm font-bold border border-[#3A4149] hover:bg-[#3A4149] transition-all"
                                        >
                                            Atrás
                                        </button>
                                        <button className="flex-[2] py-2 bg-[#F0B90B] text-black rounded-lg text-sm font-bold hover:bg-[#FCD535] transition-all">
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card 2: Línea Directa */}
                        <div className={`bg-[#1E2329] p-5 rounded-xl border transition-all duration-300 ${expandedCard === 'phone' ? 'border-[#F0B90B] ring-1 ring-[#F0B90B]' : 'border-[#2B3139] hover:border-[#F0B90B] cursor-pointer'}`}
                            onClick={() => expandedCard !== 'phone' && setExpandedCard('phone')}>

                            {expandedCard !== 'phone' ? (
                                <>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="p-3 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B]">
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
                                </>
                            ) : (
                                <div className="space-y-4 animate-fade-in relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B]">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <div className="text-white font-bold">Línea Directa</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}
                                                className="p-1 hover:bg-[#2B3139] rounded-full text-[#848E9C] hover:text-[#F0B90B] transition-colors"
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <span className="text-xs text-[#848E9C]">Número de teléfono</span>
                                        <div className="flex items-center justify-between p-3 bg-[#0B0E11] rounded-lg border border-[#2B3139]">
                                            <span className="text-white font-mono font-bold">+1 (555) 000-0000</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleCopy('+1 (555) 000-0000'); }}
                                                className="p-1.5 text-[#848E9C] hover:text-[#F0B90B] transition-colors"
                                            >
                                                {copied ? <Check className="h-4 w-4 text-[#02C076]" /> : <Copy className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-[#F0B90B]/5 rounded-lg border border-[#F0B90B]/20">
                                        <p className="text-[10px] text-[#848E9C]">Atención prioritaria para usuarios Pro.</p>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}
                                        className="w-full mt-2 flex items-center justify-center gap-2 py-2 bg-[#2B3139] text-white rounded-lg text-sm font-bold border border-[#3A4149] hover:bg-[#3A4149] transition-all"
                                    >
                                        <ArrowLeft className="h-3 w-3" /> Volver atrás
                                    </button>
                                </div>
                            )}
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
                            {baseConocimientoArticulos.map((faq, i) => {
                                const Icon = faq.icon || FileText;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => navigate(`/documentation#${faq.id}`)}
                                        className="w-full p-4 flex items-center justify-between hover:bg-[#2B3139] rounded-lg group transition-all text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Icon className="h-5 w-5 text-[#848E9C] group-hover:text-[#F0B90B]" />
                                            <span className="text-white text-sm font-medium">{faq.titulo}</span>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-[#848E9C] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                )
                            })}
                        </div>

                        <div className="p-4 bg-[#2B3139]/30 text-center">
                            <button
                                onClick={() => navigate('/documentation')}
                                className="text-[#F0B90B] text-sm font-bold hover:underline"
                            >
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
                            <span className="text-[#02C076] text-xs font-bold uppercase tracking-wider bg-[#02C076]/10 px-2 py-0.5 rounded">Operativo</span>
                        </div>
                        <p className="text-[#848E9C] text-xs mt-3 leading-relaxed">Todos los servicios están funcionando correctamente.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoporteComponent;
