import React from 'react';
// Importa tu imagen local aquí


const people = [
    {
        name: 'Wilmer Moreno',
        role: 'Backend - BD - Líder de grupo',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Daniel Hernández',
        role: 'Frontend - Design',
        imageUrl: '/AboutUs/imagedani.png'
    },
    {
        name: 'Lázaro Hernández',
        role: 'Frontend - Design',
        imageUrl: '/AboutUs/imagelaz.png', // Usamos la variable importada
    },
    {
        name: 'Jesús Rodríguez',
        role: 'Backend',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Alexander González',
        role: 'Backend - BD',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Alejandra Méndez',
        role: 'Design UI/UX - Levantamiento de información',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

const AboutUs: React.FC = () => {
    return (
        <section id="acerca-de" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary">
            {/* Título de la sección */}
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
                    Sobre <span className="text-accent">Nosotros</span>
                </h2>
                <div className="h-1 w-20 bg-accent mx-auto"></div>
            </div>

            <div className="mx-auto grid max-w-7xl gap-20 xl:grid-cols-3">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        ¿Quiénes somos?
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-400">
                        Somos facilitadores de tecnología para traders. Nuestra plataforma <span className="text-white font-medium">BotForge</span> permite la validación visual y backtesting de alta fidelidad, eliminando la incertidumbre antes de operar en el mercado real con capital propio.
                    </p>
                </div>

                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                {/* CONTENEDOR DE IMAGEN CORREGIDO */}
                                <div className="h-20 w-20 flex-none relative">
                                    <img
                                        alt={person.name}
                                        src={person.imageUrl}
                                        className="h-full w-full rounded-full object-cover object-center border-2 border-white/10 shadow-lg shadow-black/50"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base/7 font-bold tracking-tight text-white">
                                        {person.name}
                                    </h3>
                                    <p className="text-sm/6 font-semibold text-accent leading-5">
                                        {person.role}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default AboutUs;