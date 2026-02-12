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
        <section id="faq" className="py-24 border-t border-white/10 max-w-7xl mx-auto px-6 md:px-12 bg-primary">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
                Preguntas Frecuentes
            </h2>
            <p className="text-center text-accent font-bold mb-16 tracking-widest">FAQ</p>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                        <div
                            className="p-5 font-semibold cursor-pointer flex justify-between items-center text-white hover:bg-white/5 transition"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span>{faq.question}</span>
                            <span className={`text-accent transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-5 text-white/70 border-t border-white/10 bg-white/5">
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
