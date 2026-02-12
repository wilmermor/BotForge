import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/10 py-10 bg-primary text-center md:text-left">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Logo */}
                <div className="text-accent font-extrabold tracking-widest text-xl">
                    BOTFORGE
                </div>

                {/* Links */}
                <div className="flex gap-6 text-sm text-white/70">
                    <a href="#" className="hover:text-accent transition">Términos</a>
                    <a href="#" className="hover:text-accent transition">Privacidad</a>
                    <a href="#" className="hover:text-accent transition">Cookies</a>
                </div>

                {/* Copyright */}
                <div className="text-white/50 text-sm">
                    © 2025 BotForge. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
