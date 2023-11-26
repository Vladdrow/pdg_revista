import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

/* css */
import "./App.css";
/* components */
import ProtectedRoute from "./components/Security/ProtectedRoute";

/* Pages public */
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Home from "./pages/public/Home";
import Contact from "./pages/public/Contact";
import About from "./pages/public/About";
/* Pages editor */
import Dashboard from "./pages/editor/Dashboard";
/* Pages authenticated */
import LogisticsEntities from "./pages/authenticated/LogisticsEntities";
import LoadingOverlay from "./components/Utility/LoadingOverlay";

import { useAuth } from "./context/AuthContext";
import Subscription from "./pages/public/Subscription";

function App() {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        // Array con los nombres de las últimas rutas principales
        const mainRoutesNames = ["dashboard"];
        const pathSegments = location.pathname.split("/").filter(Boolean);

        // Construye la clase agregando un espacio después de los nombres de las rutas principales
        let pathClasses = pathSegments
            .map((segment, index, array) => {
                // Si el segmento es una ruta principal y no es el último segmento, agregamos un espacio
                if (mainRoutesNames.includes(segment) && index < array.length - 1) {
                    return `${segment} `;
                }
                return segment;
            })
            .join("_"); // Une los segmentos con guión bajo

        // Eliminar guiones bajos que siguen inmediatamente después de un espacio
        pathClasses = pathClasses.replace(/\s_/, " ").trim();

        setCurrentPath(`App ${pathClasses}`);
    }, [location.pathname]);

    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <LoadingOverlay />; // Mostrar algo mientras la app está cargando
    }
    return (
        <div className={`${currentPath}`}>
            <Routes>
                {/* Rutas para todos */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register isPage={true} />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas para usuarios autenticados */}
                <Route element={<ProtectedRoute isAllowed={isAuthenticated || (!!user && user.isEditor2)} redirectTo="/login" />}>
                    <Route path="/home" element={<LogisticsEntities />} />
                    <Route path="/subscription" element={<Subscription />} />

                    {/* Rutas protegidas para usuarios premium */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user.isPremium} redirectTo={user?.isPremium ? "/subscription" : "/login"} />}>
                        <Route path="/section/:sectionId" element={<LogisticsEntities />} />
                        <Route path="/show1" element={<div><h2>soy Premium</h2></div>} />
                    </Route>

                    {/* Rutas protegidas para editores */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user.isEditor2} redirectTo="/login" />}>
                        <Route path="/dashboard/*" element={<Dashboard />} />
                        <Route path="/editor-home" element={<div><h2>soy Editor</h2></div>} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
