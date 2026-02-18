
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
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-[#0B0E11] text-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-10 w-10 bg-[#F0B90B] rounded-full flex items-center justify-center text-black font-bold">BF</div>
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
                    Create your account
                </h2>
                <div className="mt-2 flex justify-center space-x-2">
                    <div className="h-1 w-16 bg-[#F0B90B] rounded"></div>
                    <div className="h-1 w-16 bg-[#2B3139] rounded"></div>
                    <div className="h-1 w-16 bg-[#2B3139] rounded"></div>
                </div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[1200px]">
                <div className="bg-[#1E2329] px-6 py-12 shadow sm:rounded-lg sm:px-12 border border-[#2B3139]">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-[#848E9C]">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        required
                                        className="block w-full rounded-md border-0 bg-[#0B0E11] py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-[#2B3139] placeholder:text-[#474D57] focus:ring-2 focus:ring-inset focus:ring-[#F0B90B] sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#848E9C]">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        required
                                        className="block w-full rounded-md border-0 bg-[#0B0E11] py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-[#2B3139] placeholder:text-[#474D57] focus:ring-2 focus:ring-inset focus:ring-[#F0B90B] sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="birthdate" className="block text-sm font-medium leading-6 text-[#848E9C]">
                                    Date of Birth
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="birthdate"
                                        id="birthdate"
                                        required
                                        className="block w-full rounded-md border-0 bg-[#0B0E11] py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-[#2B3139] placeholder:text-[#474D57] focus:ring-2 focus:ring-inset focus:ring-[#F0B90B] sm:text-sm sm:leading-6 [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-[#848E9C]">
                                    Nationality
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="nationality"
                                        name="nationality"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 bg-[#0B0E11] py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-[#2B3139] focus:ring-2 focus:ring-inset focus:ring-[#F0B90B] sm:text-sm sm:leading-6"
                                    >
                                        <option>Venezuela</option>
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-[#848E9C]">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        required
                                        className="block w-full rounded-md border-0 bg-[#0B0E11] py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-[#2B3139] placeholder:text-[#474D57] focus:ring-2 focus:ring-inset focus:ring-[#F0B90B] sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-6 border-t border-[#2B3139] pt-6">
                            <button
                                type="submit"
                                className="rounded-md bg-[#F0B90B] px-8 py-2.5 text-sm font-semibold text-black shadow-sm circle hover:bg-[#FCD535] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0B90B] transition-all duration-200"
                            >
                                Continue to Plan Selection
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
