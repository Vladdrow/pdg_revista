import {
    registerUserService,
    loginUser as loginUserService,
    confirmPaymentAndGenerateKey as confirmPay,
    getUserBySession,
    buySubscriptionService,
} from "../services/auth.service.js";
import User from "../models/User.js";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const register = async (req, res) => {
    try {
        const inputData = req.body;
        const result = Array.isArray(inputData)
            ? await registerMultipleUsers(inputData)
            : await registerSingleUser(inputData);

        // Enviar cookie con JWT
        res.cookie("jwt", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // En producción, asegúrate de usar HTTPS
            sameSite: "Strict", // Esta configuración ayuda a prevenir ataques CSRF
            maxAge: 60, // 1 minuto
        });
        console.log(result);
        console.log(result.token);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al procesar el registro");
    }
};

const registerSingleUser = async (userData) => {
    console.log("USERDATA: ", userData);
    const user = await registerUserService(userData);
    console.log("USER: ", user);
    if (!user) {
        throw new Error("Error al registrar el usuario");
    }
    return await attemptLoginAfterRegistration(user);
};

const registerMultipleUsers = async (usersData) => {
    return await Promise.all(
        usersData.map(async (userData) => {
            try {
                return await registerSingleUser(userData);
            } catch (error) {
                return { error: error.message };
            }
        })
    );
};

const attemptLoginAfterRegistration = async (user) => {
    console.log("USER IN CONTROLLER", user);
    const resultLogin = await loginUserService(user.email, user.confirmPassword);
    console.log("RESULT", resultLogin.success);
    if (!resultLogin.success) {
        throw new Error(resultLogin.message);
    }
    return resultLogin;
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("LOGIN", email, password);
    try {
        const result = await loginUserService(email, password);
        if (result.success) {
            res.send(result);
        } else {
            console.log(result.message);
            res.status(401).send(result.message);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al iniciar sesión");
    }
};

export const confirmPaymentAndGenerateKey = async (req, res) => {
    const { userId } = req.body; // Suponiendo que el ID del usuario se pasa en el cuerpo de la solicitud

    try {
        const result = await confirmPay(userId);

        if (result.success) {
            res.send(result);
        } else {
            console.log(result.message);
            res.status(400).send(result.message); // 400 Bad Request es apropiado aquí
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al confirmar el pago y generar la llave");
    }
};

export const logout = (req, res) => {
    res.clearCookie("jwt");
    res.send({ success: true, message: "Sesión cerrada exitosamente." });
};

export const session = async (req, res) => {
    console.log(req);
    try {
        const userInfo = await getUserBySession(req);
        console.log(userInfo);
        if (!userInfo) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.json(userInfo); // Envía la información del usuario
    } catch (error) {
        res.status(500).send("Hubo un error al extraer datos del usuario");
    }
};

export const buySubscription = async ( req, res) => {
    const { id, amount, userId } = req.body;
    try {
        const result = await buySubscriptionService(id, amount, userId);
        
        
        if (result) {
            res.send({ message: "Successfully payment", success: true });
        } else {
            res.send({ message: "Payment declined", success: false });
        }
    } catch (error) {
        console.error("Error buying subscription:", error);
        res.status(500).send("Error processing payment");
    }
};

/* export const verifyTokenController = async (req, res) => {
    const token = req.cookies.jwt; // Asume que estás usando una librería como cookie-parser

    const verificationResult = await verifyToken(token);
    if (verificationResult.success) {
        res.status(200).send({ authenticated: true, user: verificationResult.user});
    } else {
        res.status(401).send({
            authenticated: false,
            error: verificationResult.error,
        });
    }
};

export const optionalTokenVerification = async (req, res, next) => {
    const token = req.cookies.jwt; // Asume que estás usando una librería como cookie-parser
    console.log("token:",token);
    if (token) {
        const verificationResult = await verifyToken(token);
        if (verificationResult.success) {
            req.userData = verificationResult.user; // Almacena los datos del usuario en req para uso posterior
        } else {
            console.error(
                "Token verification failed:",
                verificationResult.error
            );
            res.clearCookie("jwt"); // Opcional: podrías querer limpiar la cookie si el token es inválido
        }
    }
    next(); // Pasa al siguiente middleware o ruta
};
 */
