import {
    saveUserToDb,
    getUserByEmail,
    updateLastAccess,
    incrementFailedAttempts,
    clearFailedAttempts,
    getUserAdditionalDetails,
    storeKeyForUserWithSalt,
    hasActiveKey, // Asume que esta función ya está definida en auth.data
    getLastKeyGenerationDate,
    getUserKey,
    isValidUserKey,
    shopRegister,
} from "../data/auth.data.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Stripe from "stripe";

const stripe = new Stripe(
    "sk_test_51OEsnRJvjkVyxw13ydCRK2x6rkYswuB8KujQ6aIbOqjbg7EkEwmCcDIjfjqZRSZxMjbbt2Z1yWV1DO8g8NQfqs14006a4LOEZ1"
);

const JWT_SECRET_STR =
    "0f350ee0f7fae11cf9bd517f2db0a510353e17f37fc0658fd9f76fb604c6631899f2cd05d9e1fcd08a30ba0e31270325693c3b1ae247f83077a57b6fb6462d00"; /* = config.jwtSecret; */

export const registerUserService = async (userData) => {
    const user = createUserFromData(userData);
    validateUserData(user);
    await setHashedPasswordForUser(user);

    console.log(user);
    return saveUserToDb(user);
};

const validateUserData = (user) => {
    if (!user.isPasswordValid() || !user.passwordsMatch()) {
        throw new Error("Las contraseñas no coinciden o son inválidas");
    }
    // Añade aquí más validaciones según sea necesario.
};

const createUserFromData = (userData) => {
    const {
        Nombre,
        Apellidos,
        correo,
        contrasena,
        confirmarContrasena,
        esEditor,
        rol,
        descripcion,
    } = userData;
    const user = new User(null, correo, contrasena, confirmarContrasena);
    user.setNombreCompleto(Nombre, Apellidos);
    user.setIsEditor(esEditor);
    user.setRol(rol);
    user.setDescripcion(descripcion);

    return user;
};

const setHashedPasswordForUser = async (user) => {
    await user.setHashedPassword(user.password);
};

export const loginUser = async (correo, contrasena) => {
    //Extraemos todos los datos del usuario mediante el correo ingresado
    const userFromDb = await getUserByEmail(correo);
    if (!userFromDb) {
        return { success: false, message: "Usuario no encontrado" };
    }

    // Comparamos la contrasena ingresada con la de la BD mediante un metodo de bcrypt
    if (await bcrypt.compare(contrasena, userFromDb.Contrasena)) {
        // Verificamos si tiene bloqueo temporal
        const checkBlockResult = await checkAndHandleTemporaryBlock(userFromDb);
        if (!checkBlockResult.success) return checkBlockResult;

        // Marcamos fecha actual como ultimo acceso
        updateLastAccess(userFromDb.ID);

        // Si el usuario es Editor extraemos datos adicionales de la BD
        if (userFromDb.TipoUsuario == "1") {
            console.log("DENTRO EDITOR");
            const additionalUserInfo = await getUserAdditionalDetails(
                userFromDb.ID,
                userFromDb.TipoUsuario
            );
            userFromDb.Rol = additionalUserInfo.Rol;
            userFromDb.Descripcion = additionalUserInfo.Descripcion;
        }
        const userJWT = {
            id: userFromDb.ID,
            name: userFromDb.Nombre,
            email: userFromDb.CorreoElectronico,
        };

        const token = jwt.sign({ userJWT }, JWT_SECRET_STR, {
            expiresIn: "10m",
        });

        // Verificamos si tiene una llave valida para marcarlo como Premium
        const isPremium = await hasValidKey(userFromDb.ID);
        return buildFullUserInfo(userFromDb, isPremium, token);
    } else {
        incrementFailedAttempts(userFromDb.ID, userFromDb.IntentosFallidos);
        return { success: false, message: "Contraseña incorrecta" };
    }
};

export const confirmPaymentAndGenerateKey = async (userId) => {
    if (await hasActiveKey(userId)) {
        return {
            success: false,
            message: "El usuario ya tiene una llave activa.",
        };
    }

    const lastKeyDate = await getLastKeyGenerationDate(userId);
    const oneDayMiliseconds = 24 * 60 * 60 * 1000;
    if (lastKeyDate && new Date().getTime() - new Date(lastKeyDate).getTime() < oneDayMiliseconds) {
        return {
            success: false,
            message: "No se puede generar una llave tan pronto para este usuario.",
        };
    }

    // 1. Confirmar el pago (aquí puedes agregar cualquier lógica o llamada a API para confirmar el pago)
    const paymentConfirmed = true;
    if (!paymentConfirmed) {
        return { success: false, message: "El pago no se ha confirmado" };
    }
    // 2. Generar y almacenar la llave y salt
    try {
        const key = await storeKeyForUserWithSalt(userId);
        return {
            success: true,
            message: "Pago confirmado y llave generada exitosamente",
            key: key,
        };
    } catch (error) {
        console.error("Error al generar y almacenar la llave:", error);
        return {
            success: false,
            message: "Hubo un error al generar y almacenar la llave",
        };
    }
};

/* export const verifyToken = async (token) => {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET_STR);
        const userId = decodedToken.id;

        // Obtén los datos del usuario por su ID
        const user = await getDataUser(userId);
        const additionalUserInfo = await getUserAdditionalDetails(
            user.ID,
            user.TipoUsuario
        );
        const isPremium = await hasValidKey(user.id);
        console.log(user);
        if (!user) {
            throw new Error("User not found");
        }

        return {
            success: true,
            user: {
                ...user,
                additionalUserInfo: additionalUserInfo,
                isPremium: isPremium,
            },
        };
    } catch (error) {
        console.error("Token verification failed:", error);
        return {
            success: false,
            error: error.message,
        };
    }
}; */
/* BLOQUEO TEMPORAL */
const checkAndHandleTemporaryBlock = async (userFromDb) => {
    const currentDate = new Date();
    const bloqueoTemporal = userFromDb.BloqueoTemporal
        ? new Date(userFromDb.BloqueoTemporal)
        : null;
    const isBlocked = bloqueoTemporal && bloqueoTemporal > currentDate;

    if (isBlocked) {
        return {
            success: false,
            message:
                "Tu cuenta ha sido temporalmente bloqueada. Por favor, espera un momento y vuelve a intentarlo.",
        };
    }

    if (bloqueoTemporal && bloqueoTemporal <= currentDate) {
        await clearFailedAttempts(userFromDb.ID);
    }

    return { success: true };
};

/* Usuario lector logeado */
const buildFullUserInfo = (dataUser, isPremium, token = null) => {
    const fullUserInfo = {
        ID: dataUser.ID,
        CorreoElectronico: dataUser.CorreoElectronico,
        Nombre: dataUser.Nombre,
        ApellidoPaterno: dataUser.ApellidoPaterno,
        ApellidoMaterno: dataUser.ApellidoMaterno,
        IsEditor: dataUser.TipoUsuario === "1" ? true : false,
        IsPremium: isPremium,
        RutaImagen: dataUser.RutaImagen + dataUser.NombreImagen,
        /* NombreImagen: dataUser.NombreImagen, */
        FechaUltimoAcceso: dataUser.FechaUltimoAcceso,
        FechaRegistro: dataUser.FechaRegistro,
    };
    return {
        success: true,
        message: "Inicio de sesión exitoso",
        userDataDB: fullUserInfo,
        token,
    };
};

const hasValidKey = async (userId) => {
    const userKey = await getUserKey(userId);
    return await isValidUserKey(userKey);
};

export const getUserBySession = async (req) => {
    try {
        const email = req.user.userJWT.email;
        const user = await getUserByEmail(email);
        if (!user) {
            return null; // Devuelve null si el usuario no se encuentra
        }

        const isPremium = await hasValidKey(user.ID);
        return buildFullUserInfo(user, isPremium); // Devuelve la información del usuario
    } catch (error) {
        throw error; // Lanza el error para manejarlo en el controlador
    }
};

export const buySubscriptionService = async (id, amount, userId) => {
    if (await hasActiveKey(userId)) {
        return {
            success: false,
            message: "El usuario ya tiene una llave activa.",
        };
    }
    const lastKeyDate = await getLastKeyGenerationDate(userId);
    const oneDayMiliseconds = 24 * 60 * 60 * 1000;
    if (lastKeyDate && new Date().getTime() - new Date(lastKeyDate).getTime() < oneDayMiliseconds) {
        return {
            success: false,
            message: "No se puede generar una llave tan pronto para este usuario.",
        };
    }

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Subscription Payment",
            payment_method: id,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
        });

        // Si el pago es exitoso, registra la compra
        if (payment.status === "succeeded") {
            const shopReg = await shopRegister(userId, amount);
            if (shopReg) {
                const key = await storeKeyForUserWithSalt(userId);
                return {
                    success: true,
                    message: "Pago confirmado y llave generada exitosamente",
                    key: key,
                };
            }
        }

        const paymentConfirmed = true;
        if (!paymentConfirmed) {
            return { success: false, message: "El pago no se ha confirmado" };
        }
        // 2. Generar y almacenar la llave y salt
        try {
        } catch (error) {
            console.error("Error al generar y almacenar la llave:", error);
            return {
                success: false,
                message: "Hubo un error al generar y almacenar la llave",
            };
        }
        return payment;
    } catch (error) {
        console.error("Error in payment service:", error);
        throw error;
    }
};
