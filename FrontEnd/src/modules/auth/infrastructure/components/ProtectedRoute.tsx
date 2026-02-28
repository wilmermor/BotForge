import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        // Redirigir al home (landing page) si no hay token
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
