
import { Link } from 'react-router-dom';

const LoginPage = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle authentication
        // For now, we'll navigate to dashboard (or wherever)
        // Check if user has active sub? if not go to plans? (simulated for now)
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
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 bg-[#1E2329] py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-[#2B3139] placeholder:text-[#474D57] focus:ring-2 focus:ring-inset focus:ring-[#F0B90B] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#F0B90B] px-3 py-2.5 text-sm font-semibold leading-6 text-black shadow-sm circle hover:bg-[#FCD535] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0B90B] transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

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
