
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration data collection
        // Then navigate to plan selection
        navigate('/checkout/plan');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0E11] px-6 py-12">
            <form
                className="bg-[#0B0E11] p-8 rounded-lg max-w-md w-full border border-[#2B3139]"
                onSubmit={handleSubmit}
            >
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex flex-col items-center justify-center gap-2 mb-6">
                            <img
                                src="/ISOTIPO4.svg"
                                alt="BotForge Logo"
                                className="h-12 w-auto"
                                style={{ filter: 'brightness(0) invert(1)' }}
                            />
                            <div className="font-extrabold tracking-widest text-lg font-[Inter] text-white">
                                BOTFORGE
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-[#EAECEF]">Crear cuenta</h2>
                        <p className="mt-2 text-sm text-[#848E9C]">Ingresa tus datos para comenzar</p>
                    </div>

                    {/* Grid de campos */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Nombre */}
                        <div className="col-span-1">
                            <label htmlFor="first-name" className="block text-sm font-medium text-[#EAECEF]">Nombre</label>
                            <div className="mt-1.5">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    placeholder="Carlos"
                                    required
                                    className="block w-full bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] placeholder-[#5E6873] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Apellido */}
                        <div className="col-span-1">
                            <label htmlFor="last-name" className="block text-sm font-medium text-[#EAECEF]">Apellido</label>
                            <div className="mt-1.5">
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    placeholder="Rodríguez"
                                    required
                                    className="block w-full bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] placeholder-[#5E6873] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Fecha de nacimiento */}
                        <div className="col-span-2">
                            <label htmlFor="birthdate" className="block text-sm font-medium text-[#EAECEF]">Fecha de nacimiento</label>
                            <div className="mt-1.5">
                                <input
                                    id="birthdate"
                                    name="birthdate"
                                    type="date"
                                    required
                                    className="block w-full bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] placeholder-[#5E6873] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* Nacionalidad (select) */}
                        <div className="col-span-2">
                            <label htmlFor="nationality" className="block text-sm font-medium text-[#EAECEF]">Nacionalidad</label>
                            <div className="mt-1.5 relative">
                                <select
                                    id="nationality"
                                    name="nationality"
                                    required
                                    className="block w-full appearance-none bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                >
                                    <option value="" disabled className="bg-[#1E2329] text-[#5E6873]">Selecciona un país</option>
                                    <option className="bg-[#1E2329] text-[#EAECEF]">México</option>
                                    <option className="bg-[#1E2329] text-[#EAECEF]">Argentina</option>
                                    <option className="bg-[#1E2329] text-[#EAECEF]">Colombia</option>
                                    <option className="bg-[#1E2329] text-[#EAECEF]">Chile</option>
                                    <option className="bg-[#1E2329] text-[#EAECEF]">Venezuela</option>
                                    <option className="bg-[#1E2329] text-[#EAECEF]">España</option>
                                    <option className="bg-[#1E2329] text-[#EAECEF]">Estados Unidos</option>
                                    <option className="bg-[#1E2329] text-[#EAECEF]">Otro</option>
                                </select>
                                {/* Icono de flecha personalizado */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#848E9C]">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-[#EAECEF]">Dirección</label>
                            <div className="mt-1.5">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Ciudad, calle, número..."
                                    required
                                    className="block w-full bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] placeholder-[#5E6873] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Correo electrónico */}
                        <div className="col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-[#EAECEF]">Correo electrónico</label>
                            <div className="mt-1.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="carlos.rodriguez@ejemplo.com"
                                    required
                                    className="block w-full bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] placeholder-[#5E6873] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="col-span-2">
                            <label htmlFor="password" className="block text-sm font-medium text-[#EAECEF]">Contraseña</label>
                            <div className="mt-1.5">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    className="block w-full bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] placeholder-[#5E6873] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                />
                            </div>
                            <p className="mt-1.5 text-xs text-[#848E9C]">Mínimo 8 caracteres, con mayúsculas y números</p>
                        </div>
                    </div>

                    {/* Botón continuar */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-[#1E2329] font-semibold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#F0B90B] focus:ring-offset-2 focus:ring-offset-[#0B0E11] text-base"
                        >
                            Continuar
                        </button>
                    </div>

                    {/* Términos y condiciones */}
                    <p className="text-center text-xs text-[#848E9C]">
                        Al continuar, aceptas los
                        <a href="#" className="text-[#F0B90B] hover:underline mx-1">Términos de servicio</a> y
                        <a href="#" className="text-[#F0B90B] hover:underline mx-1">Política de privacidad</a>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
