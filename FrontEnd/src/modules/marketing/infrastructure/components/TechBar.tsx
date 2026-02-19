import React from 'react';
import { FaReact, FaPython } from 'react-icons/fa';
import { SiTypescript, SiBinance } from 'react-icons/si';

const TechBar: React.FC = () => {
    const techs = [
        { name: 'React', icon: <FaReact className="text-xl" /> },
        { name: 'Typescript', icon: <SiTypescript className="text-xl" /> },
        { name: 'Python', icon: <FaPython className="text-xl" /> },
        { name: 'Binance', icon: <SiBinance className="text-xl" /> },
    ];

    return (
        <div className="w-full bg-primary border-none ring-0 outline-none">
            <div className="w-full border-none bg-[#191A1F] rounded-b-[3rem] py-4 shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                {/* - bg-[#191A1F]: Tu color negro específico.
                  - shadow-[...]: Sombra blanca sutil.
                  - rounded-b-[3rem]: Redondeado inferior.
                */}
                <div className="ring-0 outline-none">
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16">
                        {techs.map((tech) => (
                            <div
                                key={tech.name}
                                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                            >
                                <span className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                                    {tech.icon}
                                </span>
                                {/* - font-['Montserrat']: Aplica la familia tipográfica.
                                  - font-semibold: Aplica el peso 600.
                                */}
                                <span className="font-['Montserrat'] font-light text-xs md:text-xs tracking-widest uppercase ">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechBar;