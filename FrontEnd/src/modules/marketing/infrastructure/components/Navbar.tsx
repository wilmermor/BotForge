import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 h-20 transition-all duration-500 ${isScrolled
            ? 'bg-primary/80 backdrop-blur-md border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
            }`}>
            <div className="max-w-full mx-auto h-full px-6 md:px-12">
                <div className="flex items-center justify-between h-full">
                    {/* Logo Container */}
                    <a href="#inicio" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img
                            src="/ISOTIPO4.svg"
                            alt="BotForge Logo"
                            className="h-14 w-auto"
                            style={{ filter: 'brightness(0) invert(1)' }}
                        />
                        <div className="font-extrabold tracking-widest text-xl font-[Inter] transition-colors duration-500 text-white">
                            BOTFORGE
                        </div>
                    </a>

                    {/* Navigation Container */}
                    <div className="flex items-center">
                        {/* Navigation (Desktop) */}
                        <div className="hidden md:flex gap-10 text-sm font-medium font-['Montserrat']">
                            <a href="#inicio" className="transition-colors duration-300 text-white/70 hover:text-accent">Inicio</a>
                            <a href="#soluciones" className="transition-colors duration-300 text-white/70 hover:text-accent">Soluciones</a>
                            <a href="#acerca-de" className="transition-colors duration-300 text-white/70 hover:text-accent">Acerca de</a>
                            <a href="#problemas" className="transition-colors duration-300 text-white/70 hover:text-accent">Problemas</a>
                            <a href="#planes" className="transition-colors duration-300 text-white/70 hover:text-accent">Planes</a>
                            <a href="#faq" className="transition-colors duration-300 text-white/70 hover:text-accent">FAQ</a>
                            <a href="#contact" className="transition-colors duration-300 text-white/70 hover:text-accent">Contactanos</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
