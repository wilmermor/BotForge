import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { SiBinance } from 'react-icons/si';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const RegisterPage = () => {
    const navigate = useNavigate();

    // Form States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const payload = {
                email,
                password,
                full_name: `${firstName} ${lastName}`.trim(),
                country: country || undefined
            };

            const response = await fetch("http://localhost:8000/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                navigate('/checkout/plan');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Error al crear la cuenta");
            }
        } catch (err) {
            console.error("Register error:", err);
            setError("Fallo de conexión con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuth = async (provider: string) => {
        setError(null);
        setIsLoading(true);

        // Simular el tiempo de respuesta de la ventana de OAuth (Google/Binance)
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const payload = {
                provider: provider.toLowerCase(),
                token: `mock_${provider.toLowerCase()}_token_12345`,
                email: `usuario_test@${provider.toLowerCase()}.com`,
                full_name: `Usuario de ${provider}`
            };

            const response = await fetch("http://localhost:8000/api/v1/auth/oauth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                navigate('/checkout/plan');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || `Error al autenticar con ${provider}`);
            }
        } catch (err) {
            console.error(`OAuth error con ${provider}:`, err);
            setError("Fallo de conexión con el servidor");
        } finally {
            setIsLoading(false);
        }
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
                    {error && (
                        <div className="p-3 text-sm text-[#F6465D] bg-[#F6465D]/10 border border-[#F6465D]/30 rounded-md">
                            {error}
                        </div>
                    )}
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
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="block w-full appearance-none bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                >
                                    <option value="" disabled className="bg-[#1E2329] text-[#5E6873]">Selecciona un país</option>
                                    <option value="México" className="bg-[#1E2329] text-[#EAECEF]">México</option>
                                    <option value="Argentina" className="bg-[#1E2329] text-[#EAECEF]">Argentina</option>
                                    <option value="Colombia" className="bg-[#1E2329] text-[#EAECEF]">Colombia</option>
                                    <option value="Chile" className="bg-[#1E2329] text-[#EAECEF]">Chile</option>
                                    <option value="Venezuela" className="bg-[#1E2329] text-[#EAECEF]">Venezuela</option>
                                    <option value="España" className="bg-[#1E2329] text-[#EAECEF]">España</option>
                                    <option value="Estados Unidos" className="bg-[#1E2329] text-[#EAECEF]">Estados Unidos</option>
                                    <option value="Otro" className="bg-[#1E2329] text-[#EAECEF]">Otro</option>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 text-sm text-[#EAECEF] placeholder-[#5E6873] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="col-span-2">
                            <label htmlFor="password" className="block text-sm font-medium text-[#EAECEF]">Contraseña</label>
                            <div className="mt-1.5 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="block w-full bg-[#1E2329] border border-[#2B3139] rounded-md px-4 py-2.5 pr-10 text-sm text-[#EAECEF] placeholder-[#5E6873] focus:border-[#F0B90B] focus:outline-none focus:ring-1 focus:ring-[#F0B90B] transition-colors"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#848E9C] hover:text-[#F0B90B] transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <HiEyeOff className="h-5 w-5" />
                                    ) : (
                                        <HiEye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            <p className="mt-1.5 text-xs text-[#848E9C]">Mínimo 8 caracteres, con mayúsculas y números</p>
                        </div>
                    </div>

                    {/* Botón continuar */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-[#1E2329] font-semibold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#F0B90B] focus:ring-offset-2 focus:ring-offset-[#0B0E11] text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creando cuenta...' : 'Continuar'}
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-[#2B3139]" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-[#0B0E11] px-6 text-[#848E9C]">O regístrate con</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => handleOAuth('Google')}
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1E2329] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-[#2B3139] hover:bg-[#2B3139]/80 transition-colors focus-visible:ring-transparent"
                            >
                                <FcGoogle className="h-5 w-5" />
                                <span className="text-sm font-semibold leading-6">Google</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOAuth('Binance')}
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1E2329] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-[#2B3139] hover:bg-[#2B3139]/80 transition-colors focus-visible:ring-transparent"
                            >
                                <SiBinance className="h-5 w-5 text-[#F0B90B]" />
                                <span className="text-sm font-semibold leading-6">Binance</span>
                            </button>
                        </div>
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
