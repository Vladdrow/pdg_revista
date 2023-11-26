import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, children, redirectTo = "/", redirectFunc }) {
    // Si redirectFunc está definido, usa esa lógica
    if (redirectFunc) {
        const redirectPath = redirectFunc();
        if (redirectPath) {
            return <Navigate to={redirectPath} />;
        }
    }

    // Si no está permitido, redirigir a la ruta predeterminada
    if (!isAllowed) {
        return <Navigate to={redirectTo} />;
    }

    // Si está permitido, mostrar el contenido
    return children ? children : <Outlet />;
}

export default ProtectedRoute;
