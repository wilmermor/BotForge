import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-[#191A1F] text-white py-8 font-montserrat border-t border-white/5">
            <div className="w-full mx-auto px-6 md:px-12">

                {/* Top Section: Logo y Datos Rápidos */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    {/* Logo and Tagline */}
                    <div className="flex items-center gap-3">
                        <img src="/ISOTIPO.svg" alt="BotForge Logo" className="w-10 h-10 md:w-12 md:h-12" />
                        <div className="text-xs md:text-sm leading-tight text-white/80">
                            <p className="font-bold text-white">BotForge</p>
                            <p>Estrategias seguras integradas con Binance</p>
                        </div>
                    </div>

                    {/* Location and Schedule */}
                    <div className="flex flex-wrap gap-4 md:gap-8">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F0B90B" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <span className="text-xs">Nueva Esparta, VE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0B90B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span className="text-xs">Lun-Vie, 9am-5pm</span>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

                    {/* Column 1: Plataforma */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-[#F0B90B]">Plataforma</h4>
                        <div className="flex flex-col gap-1.5 text-xs text-white/70">
                            <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
                            <a href="#soluciones" className="hover:text-white transition-colors">Soluciones</a>
                            <a href="#planes" className="hover:text-white transition-colors">Planes</a>
                            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                        </div>
                    </div>

                    {/* Column 2: Legal */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-[#F0B90B]">Legal</h4>
                        <div className="flex flex-col gap-1.5 text-xs text-white/70">
                            <a href="#terminos" className="hover:text-white transition-colors">Términos</a>
                            <a href="#privacidad" className="hover:text-white transition-colors">Privacidad</a>
                            <a href="#avisos" className="hover:text-white transition-colors">Avisos legales</a>
                        </div>
                    </div>

                    {/* Column 3: Redes Sociales Compactas */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-[#F0B90B]">Siguenos</h4>
                        <div className="flex gap-3">
                            <a href="#" className="hover:scale-110 transition-transform">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#F0B90B"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.3-.49.82-.75 3.2-1.39 5.33-2.31 6.4-2.75 3.03-1.25 3.67-1.47 4.08-1.48.09 0 .28.02.41.12.11.08.14.2.16.29.02.09.02.13.01.21z" /></svg>
                            </a>
                            <a href="#" className="hover:scale-110 transition-transform">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#F0B90B"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                            </a>
                            <a href="#" className="hover:scale-110 transition-transform">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#F0B90B"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 4: Binance */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-[#F0B90B]">Integración</h4>
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-md border border-white/10 w-fit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#F0B90B">
                                <path d="M16.624 13.9202l-4.624 4.624-4.624-4.624 1.5036-1.5036 3.1204 3.1204 3.1204-3.1204 1.5036 1.5036zm0-3.8404l-4.624-4.624-4.624 4.624 1.5036 1.5036 3.1204-3.1204 3.1204 3.1204 1.5036-1.5036zM12 0l4.624 4.624-1.5036 1.5036L12 3.0072l-3.1204 3.1204-1.5036-1.5036L12 0zm12 12l-4.624 4.624-1.5036-1.5036L20.9928 12l-3.1204-3.1204 1.5036-1.5036L24 12zm-12 12l-4.624-4.624 1.5036-1.5036L12 20.9928l3.1204-3.1204 1.5036 1.5036L12 24zM0 12l4.624-4.624 1.5036 1.5036L3.0072 12l3.1204 3.1204-1.5036 1.5036L0 12zM12 8.16l3.84 3.84-3.84 3.84-3.84-3.84 3.84-3.84z" />
                            </svg>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Binance API Ready</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="border-t border-white/10 pt-4">
                    <p className="text-[10px] md:text-xs text-white/40 text-center uppercase tracking-widest">
                        © 2026 BotForge. Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;