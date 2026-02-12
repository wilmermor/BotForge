import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 w-full z-50 h-20 bg-primary border-b border-white/10">
            <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-6 md:px-12">
                {/* Logo */}
                <div className="text-accent font-extrabold tracking-widest text-xl">
                    BOTFORGE
                </div>

                {/* Navigation (Desktop) */}
                <div className="hidden md:flex gap-10 text-sm font-medium">
                    <a href="#inicio" className="text-white/70 hover:text-accent transition-colors duration-300">Inicio</a>
                    <a href="#planes" className="text-white/70 hover:text-accent transition-colors duration-300">Planes</a>
                    <a href="#faq" className="text-white/70 hover:text-accent transition-colors duration-300">FAQ</a>
                    <a href="#contact" className="text-white/70 hover:text-accent transition-colors duration-300">Contactanos</a>
                </div>

                {/* CTA */}
                <button className="bg-accent text-black font-semibold hover:brightness-110 transition px-6 py-2 rounded-lg cursor-pointer">
                    Empieza ya
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
