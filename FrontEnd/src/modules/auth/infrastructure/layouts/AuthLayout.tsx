import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-[#0B0E11] text-white font-sans antialiased">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
