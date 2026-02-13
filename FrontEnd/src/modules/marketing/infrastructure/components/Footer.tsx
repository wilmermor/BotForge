import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-transparent text-white py-12 font-montserrat">
            <div className="w-full mx-auto px-6 md:px-12">

                {/* Top Section: Logo, Tagline and Contact Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                    {/* Logo and Tagline */}
                    <div className="flex items-center gap-4">
                        <img src="/ISOTIPO.svg" alt="BotForge Logo" className="w-14 h-14" />
                        <div className="text-sm md:text-base leading-tight text-white">
                            <p>Valide sus estrategias de trading en un entorno seguro</p>
                            <p>integrado con Binance</p>
                        </div>
                    </div>

                    {/* Location and Schedule */}
                    <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                        {/* Location */}
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F0B90B" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <span className="text-sm text-white">Nueva Esparta, Venezuela</span>
                        </div>

                        {/* Schedule */}
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F0B90B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                <circle cx="12" cy="12" r="10" stroke="#F0B90B" fill="transparent" />
                                <polyline points="12 6 12 12 16 14" stroke="#F0B90B" />
                            </svg>
                            <span className="text-sm text-white">Lun-Vie, 9am-5pm</span>
                        </div>
                    </div>
                </div>

                {/* Middle Section: 4 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Plataforma */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-lg text-white">Plataforma</h4>
                        <div className="flex flex-col gap-2 text-sm text-white">
                            <a href="#inicio" className="hover:text-[#F0B90B] transition-colors">Inicio</a>
                            <a href="#soluciones" className="hover:text-[#F0B90B] transition-colors">Soluciones</a>
                            <a href="#acerca-de" className="hover:text-[#F0B90B] transition-colors">Acerca de</a>
                            <a href="#problemas" className="hover:text-[#F0B90B] transition-colors">Problemas</a>
                            <a href="#planes" className="hover:text-[#F0B90B] transition-colors">Planes</a>
                            <a href="#faq" className="hover:text-[#F0B90B] transition-colors">FAQ</a>
                            <a href="#contactanos" className="hover:text-[#F0B90B] transition-colors">Contáctanos</a>
                        </div>
                    </div>

                    {/* Column 2: Legal */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-lg text-white">Legal</h4>
                        <div className="flex flex-col gap-2 text-sm text-white">
                            <a href="#terminos" className="hover:text-[#F0B90B] transition-colors">Términos de servicio</a>
                            <a href="#privacidad" className="hover:text-[#F0B90B] transition-colors">Política de privacidad</a>
                            <a href="#avisos" className="hover:text-[#F0B90B] transition-colors">Avisos legales</a>
                        </div>
                    </div>

                    {/* Column 3: Redes Sociales */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-lg text-white">Redes sociales</h4>
                        <div className="flex flex-col gap-4">
                            {/* First Row: 3 Icons */}
                            <div className="flex gap-4">
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#F0B90B">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.3-.49.82-.75 3.2-1.39 5.33-2.31 6.4-2.75 3.03-1.25 3.67-1.47 4.08-1.48.09 0 .28.02.41.12.11.08.14.2.16.29.02.09.02.13.01.21z" />
                                    </svg>
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#F0B90B">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                    </svg>
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#F0B90B">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </div>
                            {/* Second Row: 2 Icons */}
                            <div className="flex gap-4">
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#F0B90B">
                                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                                    </svg>
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#F0B90B">
                                        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7h-2.54v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Binance e Integraciones */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-lg text-white">Binance e Integraciones</h4>
                        <button className="bg-[#F0B90B] text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-[#d8a60a] transition-colors whitespace-nowrap">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.624 13.9202l-4.624 4.624-4.624-4.624 1.5036-1.5036 3.1204 3.1204 3.1204-3.1204 1.5036 1.5036zm0-3.8404l-4.624-4.624-4.624 4.624 1.5036 1.5036 3.1204-3.1204 3.1204 3.1204 1.5036-1.5036zM12 0l4.624 4.624-1.5036 1.5036L12 3.0072l-3.1204 3.1204-1.5036-1.5036L12 0zm12 12l-4.624 4.624-1.5036-1.5036L20.9928 12l-3.1204-3.1204 1.5036-1.5036L24 12zm-12 12l-4.624-4.624 1.5036-1.5036L12 20.9928l3.1204-3.1204 1.5036 1.5036L12 24zM0 12l4.624-4.624 1.5036 1.5036L3.0072 12l3.1204 3.1204-1.5036 1.5036L0 12zM12 8.16l3.84 3.84-3.84 3.84-3.84-3.84 3.84-3.84z" />
                            </svg>
                            <span className="text-xs">Compatibilidad con Binance API</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Section: Line and Copyright */}
                <div className="flex flex-col items-center mt-8">
                    <div className="w-[99%] h-[1px] bg-white mb-3"></div>
                    <div className="w-[99%] text-left">
                        <p className="text-sm md:text-base text-white">
                            © 2025 BotForge. Todos los derechos reservados
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
