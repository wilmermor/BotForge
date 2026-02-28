
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { SiBinance } from 'react-icons/si';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { auth } from '../../../../lib/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
    const navigate = useNavigate();
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
            const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                // Check if user has active sub? if not go to plans? (simulated for now)
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Error iniciando sesión");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Fallo de conexión con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuth = async (provider: string) => {
        setError(null);
        setIsLoading(true);

        try {
            let token: string;
            let email: string;
            let full_name: string;
            let avatar: string | null = null;

            if (provider === 'Google') {
                // Real Firebase Google Sign-In
                const googleProvider = new GoogleAuthProvider();
                const result = await signInWithPopup(auth, googleProvider);
                token = await result.user.getIdToken();
                email = result.user.email ?? '';
                full_name = result.user.displayName ?? '';
                avatar = result.user.photoURL;
            } else {
                // Binance: still mocked (no standard OAuth supported by Firebase)
                await new Promise(resolve => setTimeout(resolve, 800));
                token = `mock_binance_token_12345`;
                email = `usuario_test@binance.com`;
                full_name = `Usuario de Binance`;
                avatar = null;
            }

            const payload = {
                provider: provider.toLowerCase(),
                token,
                email,
                full_name,
                avatar,
            };

            const response = await fetch("http://127.0.0.1:8000/api/v1/auth/oauth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                // New OAuth users go to plan selection; existing users go to dashboard
                navigate(data.is_new_user ? '/checkout/plan' : '/dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || `Error al autenticar con ${provider}`);
            }
        } catch (err: unknown) {
            const code = (err && typeof err === 'object' && 'code' in err) ? (err as { code: string }).code : '';
            if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
                // silent — user closed popup voluntarily
            } else if (code === 'auth/configuration-not-found') {
                setError("El proveedor de Google no está habilitado en Firebase Console. Actívalo en Authentication → Sign-in method.");
            } else {
                console.error(`OAuth error con ${provider}:`, err);
                setError("Fallo de conexión con el servidor");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-[#0B0E11] text-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex flex-col items-center justify-center gap-2">
                    {/* Placeholder for Logo */}
                    <img
                        src="/ISOTIPO4.svg"
                        alt="BotForge Logo"
                        className="h-14 w-auto"
                        style={{ filter: 'brightness(0) invert(1)' }}
                    />
                    <div className="font-extrabold tracking-widest text-xl font-[Inter] transition-colors duration-500 text-white">
                        BOTFORGE
                    </div>
                </div>
                <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-white">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-[#848E9C]">
                    Welcome back to BotForge
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-[#F6465D] bg-[#F6465D]/10 border border-[#F6465D]/30 rounded-md">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#848E9C]">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 bg-[#1E2329] py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-[#2B3139] placeholder:text-[#474D57] focus:ring-2 focus:ring-inset focus:ring-[#F0B90B] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#848E9C]">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-[#F0B90B] hover:text-[#d9a50a]">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 bg-[#1E2329] py-2.5 px-3 pr-10 text-white shadow-sm ring-1 ring-inset ring-[#2B3139] placeholder:text-[#474D57] focus:ring-2 focus:ring-inset focus:ring-[#F0B90B] sm:text-sm sm:leading-6"
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
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-[#F0B90B] px-3 py-2.5 text-sm font-semibold leading-6 text-black shadow-sm circle hover:bg-[#FCD535] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0B90B] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-[#2B3139]" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-[#0B0E11] px-6 text-[#848E9C]">O continúa con</span>
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

                <p className="mt-10 text-center text-sm text-[#848E9C]">
                    No tienes cuenta?{' '}
                    <Link to="/register" className="font-semibold leading-6 text-[#F0B90B] hover:text-[#d9a50a]">
                        Regitrate aqui
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
