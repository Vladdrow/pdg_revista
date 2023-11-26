import React, { createContext, useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../config";
import UserAuthenticated from "../models/UserAuthenticated";
import { session } from "../api/auth.api";
import { useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(config.stripePublicKey);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const contentPath = config.contentPath;
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [stripe, setStripe] = useState(null);

    const login = (userData) => {
        // Crear una instancia de UserFrontend
        console.log("CONTEXT : ",userData.IsEditor);
        const userInstance = new UserAuthenticated({
            ID: userData.ID,
            CorreoElectronico: userData.CorreoElectronico,
            Nombre: userData.Nombre,
            ApellidoPaterno: userData.ApellidoPaterno,
            ApellidoMaterno: userData.ApellidoMaterno,
            IsEditor: userData.IsEditor,
            IsPremium: userData.IsPremium,
            Estado: userData.Estado,
            FechaRegistro: userData.FechaRegistro,
            FechaUltimoAcceso: userData.FechaUltimoAcceso,
            RutaImagen: userData.RutaImagen,
            // ...otros atributos relevantes de userData
        });

        // Establecer el usuario en el estado
        console.log("Establecer antes", userData);
        setUser(userInstance);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("jwtToken");
            if (token) {
                try {
                    const profile = await session(token); // Asegúrate de que 'session' maneje el token
                    /* console.log("USER EXT: ", profile.userDataDB); */
                    login(profile.userDataDB);
                } catch (error) {
                    console.error(error);
                    // Manejar token inválido, expirado, etc.
                }
            }
            setIsLoading(false);
        };
        verifyUser();
    }, []);

    useEffect(() => {
        stripePromise.then((stripeInstance) => {
            setStripe(stripeInstance);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading, stripe }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};
