import React, { useState } from 'react';

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "¿Es seguro conectar mi cuenta de Binance?",
            answer: "Sí, utilizamos claves API con permisos de solo lectura para validación. Sus fondos nunca salen de su cuenta."
        },
        {
            question: "¿Necesito saber programar?",
            answer: "No, BotForge está diseñado con una interfaz visual intuitiva para que cualquiera pueda crear estrategias."
        },
        {
            question: "¿Puedo probar antes de pagar?",
            answer: "Ofrecemos un periodo de prueba gratuito en el plan Explorador para que conozca la plataforma."
        },
        {
            question: "¿Qué ocurre si cancelo mi suscripción?",
            answer: "Podrá seguir accediendo hasta el final del ciclo de facturación actual. Sus estrategias se guardarán por 30 días."
        }
    ];

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-primary">
            <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Preguntas Frecuentes
                </h2>
                <p className="text-white/60 text-lg">
                    Todo lo que necesitas saber sobre BotForge.
                </p>
            </div>

            <div className="max-w-3xl mx-auto divide-y divide-white/10">
                {faqs.map((faq, index) => (
                    <div key={index} className="py-6 first:pt-0 last:pb-0">
                        <button
                            className="w-full flex items-center text-left focus:outline-none group"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span
                                className="flex-shrink-0 mr-4 transition-transform duration-300 ease-in-out"
                                style={{
                                    color: '#F0B90B',
                                    transform: activeIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
                                }}
                            >
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 5V19M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <span className="text-xl font-medium text-white group-hover:text-white/80 transition-colors">
                                {faq.question}
                            </span>
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-96 opacity-100 mt-4 ml-11' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="text-white/70 text-lg leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
