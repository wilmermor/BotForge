import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, FileText } from 'lucide-react';
import { baseConocimientoArticulos } from '../data/documentationData';

const DocumentationPage = () => {
    const navigate = useNavigate();
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace('#', '');
            const element = document.getElementById(targetId);

            if (element) {
                setTimeout(() => {
                    const headerOffset = 100; // Offset given the fixed header height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    const allArticles = [...baseConocimientoArticulos];

    return (
        <div className="min-h-screen bg-[#0B0E11] text-white font-sans selection:bg-[#F0B90B]/30 pb-20">
            {/* Header Fijo */}
            <div className="sticky top-0 z-50 bg-[#0B0E11]/90 backdrop-blur-md border-b border-[#2B3139] shadow-md">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard?view=soporte')}
                        className="flex items-center gap-2 text-[#848E9C] hover:text-[#F0B90B] transition-colors group"
                    >
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium text-sm">Volver a Soporte</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-[#F0B90B]" />
                        <span className="text-white font-bold opacity-70 uppercase tracking-wider text-xs hidden sm:block">Centro de Ayuda</span>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <main className="max-w-4xl mx-auto px-6 pt-12 animate-fade-in">
                {/* Título Principal */}
                <header className="mb-14 border-b border-[#2B3139] pb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Documentación de Soporte
                    </h1>
                    <div className="flex items-center gap-2 text-[#848E9C] text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Última actualización: 26 de Febrero, 2026</span>
                    </div>
                </header>

                {/* Lista de Artículos (Expandidos) */}
                <div className="space-y-16">
                    {allArticles.map((articulo, index) => {
                        const Icon = articulo.icon || FileText;

                        return (
                            <article
                                key={articulo.id}
                                id={articulo.id}
                                className="group relative"
                            >
                                {/* Marcador visual lateral (Opcional, se ve bien en docs planas) */}
                                <div className="absolute -left-6 top-1.5 bottom-0 w-1 bg-[#2B3139] rounded-full group-hover:bg-[#F0B90B]/50 transition-colors hidden md:block"></div>

                                {/* Título del artículo */}
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-[#F0B90B] flex items-center gap-3">
                                        <Icon className="h-7 w-7 text-white/20" />
                                        {articulo.titulo}
                                    </h2>
                                </div>

                                {/* Contenido expandido */}
                                <div className="text-base text-[#848E9C] rounded-lg bg-[#1E2329]/20 p-6 md:p-8 border border-[#2B3139]/50 shadow-sm leading-relaxed">
                                    {articulo.contenidoCompleto}
                                </div>

                                {/* Separador visual entre artículos mas sutil */}
                                {index < allArticles.length - 1 && (
                                    <div className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-[#2B3139] to-transparent"></div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </main>

            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default DocumentationPage;
