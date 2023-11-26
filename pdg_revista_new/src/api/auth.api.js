import axios from "axios";
import config from "../../config";

const BASE_URL = config.baseURL;

/* const BASE_URL = `http://${myIp}:3010`; */
export const getVisitor = async () => await axios.get(`${BASE_URL}/login`);

// Función para registrar un nuevo usuario
export const register = async (userData) => await axios.post(`${BASE_URL}/register`, userData);

// Función para iniciar sesión
export const login = async (credentials) => await axios.post(`${BASE_URL}/login`, credentials);

/* export const session = async () => {
    try {
        // Suponiendo que BASE_URL ya está definido en otro lugar
        const response = await axios.get(`${BASE_URL}/session`, {
            withCredentials: true, // Para incluir cookies en la solicitud
        });
        // No es necesario verificar response.ok como en fetch, Axios lanza un error si el status no es 2xx
        return response.data; // response.data contiene los datos que necesitas
    } catch (error) {
        console.error("Error al obtener el perfil del usuario", error);
        throw error;
    }
}; */
export const session = async (token) => {
    try {
        /* const token = localStorage.getItem('jwtToken'); */
        console.log("TOKEN", token);
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${BASE_URL}/session`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el perfil del usuario", error);
        throw error;
    }
};

export const buySubscription = async ({ paymentDetails }) => {
    /* console.log("buySubscription", paymentDetails); */
    try {
        const response = await axios.post(`${BASE_URL}/buySubscription`, paymentDetails);
        return response.data;
    } catch (error) {
        console.error("Error buying subscription:", error);
        throw error;
    }
};
