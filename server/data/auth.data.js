import pool from "../db.js";
import { generateKeyWithSalt } from "../services/crypt.service.js";

export const saveUserToDb = async (user) => {
    try {
        await pool.query("START TRANSACTION");
        const resultUsuario = await createUser(user);
        if (user.isEditor) {
            await dataEditor(resultUsuario.insertId, user);
        }
        await pool.query("COMMIT");
        return user; // Retornar el objeto usuario podría ser útil para el proceso posterior.
    } catch (error) {
        await pool.query("ROLLBACK");
        throw error;
    }
};

const createUser = async (user) => {
    const { email, password, nombre, apellidoPaterno, apellidoMaterno, isEditor } = user;
    const result = await pool.query(
        "INSERT INTO Usuario (CorreoElectronico, Contrasena, Nombre, ApellidoPaterno, ApellidoMaterno, RutaImagen, NombreImagen, TipoUsuario, FechaRegistro) VALUES (?,?,?,?,?,?,?,?,?)",
        [
            email,
            password,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            "users/",
            `user${Math.floor(Math.random() * 4) + 1}.svg`,
            isEditor ? "1" : "2",
            new Date(),
        ]
    );
    return result[0];
};

const dataEditor = async (UsuarioID, user) => {
    const { rol, descripcion } = user;
    const values = [UsuarioID, rol, descripcion];
    await pool.query("INSERT INTO Editor (UsuarioID, Rol, Descripcion) VALUES (?,?,?)", values);
};

export const getUserByEmail = async (email) => {
    const [results] = await pool.query(
        "SELECT ID, Nombre, ApellidoPaterno, ApellidoMaterno, CorreoElectronico, Contrasena, TipoUsuario, IntentosFallidos, BloqueoTemporal, IntentosFallidos, RutaImagen, NombreImagen, FechaUltimoAcceso, FechaRegistro FROM Usuario WHERE CorreoElectronico = ?",
        [email]
    );
    return results[0];
};

export const getDateRegisterUser = async (userId) => {
    const [results] = await pool.query("SELECT FechaRegistro FROM Usuario WHERE ID = ?", [userId]);
    return results[0];
};

export const getUserAdditionalDetails = async (userId, userType) => {
    if (userType !== "1") {
        throw new Error("Tipo de usuario no soportado");
    }

    const [results] = await pool.query(`SELECT Rol, Descripcion FROM Editor WHERE UsuarioID = ?`, [
        userId,
    ]);

    return results[0];
};

export const updateLastAccess = async (userId) => {
    await pool.query("UPDATE Usuario SET FechaUltimoAcceso = ? WHERE ID = ?", [new Date(), userId]);
};

export const incrementFailedAttempts = async (userId, failedAttempts) => {
    if (failedAttempts >= 4) {
        await pool.query(
            "UPDATE Usuario SET Estado='0',BloqueoTemporal = DATE_ADD(?, INTERVAL 1 MINUTE) WHERE ID = ?",
            [new Date(), userId]
        );
    }
    failedAttempts += 1;
    await pool.query("UPDATE Usuario SET IntentosFallidos = ? WHERE ID = ?", [
        failedAttempts,
        userId,
    ]);
};

export const clearFailedAttempts = async (userId) => {
    await pool.query(
        "UPDATE Usuario SET Estado = '1', IntentosFallidos = 0, BloqueoTemporal = NULL WHERE ID = ?",
        [userId]
    );
};

export const storeKeyForUserWithSalt = async (userId) => {
    const dateUser = getDateRegisterUser(userId);

    /* console.log("REGISTER USER DATE:",registerUser); */
    const { key, salt } = generateKeyWithSalt(userId, dateUser);

    // Guardar en Llave_Usuario
    await pool.query(
        "INSERT INTO Llave_Usuario (UsuarioID, LlaveEncriptada, FirmaLlave, Estado, FechaCreacion) VALUES (?, ?, ?, ?, ?)",
        [userId, key, salt, "1", new Date()]
    );

    // Guardar en Llave_Valida
    await pool.query(
        "INSERT INTO Llave_Valida (LlaveEncriptada, FirmaLlave, EstadoLlave, FechaCreacion) VALUES (?, ?, ?, ?)",
        [key, salt, "1", new Date()]
    );

    return key;
};
//Verificar si tiene una llave activa
export const hasActiveKey = async (userId) => {
    const [results] = await pool.query(
        "SELECT * FROM Llave_Usuario WHERE UsuarioID = ? AND Estado = '1'",
        [userId]
    );
    return results.length > 0;
};

export const getLastKeyGenerationDate = async (userId) => {
    const [results] = await pool.query(
        "SELECT FechaCreacion FROM Llave_Usuario WHERE UsuarioID = ? ORDER BY FechaCreacion DESC LIMIT 1",
        [userId]
    );
    return results[0]?.FechaCreacion;
};

//
export const getUserKey = async (userId) => {
    const [[result]] = await pool.query(
        "SELECT LlaveEncriptada FROM Llave_Usuario WHERE UsuarioID = ?",
        [userId]
    );
    return result ? result.LlaveEncriptada : null;
};

export const isValidUserKey = async (userKey) => {
    const [results] = await pool.query(
        "SELECT * FROM Llave_Valida WHERE LlaveEncriptada = ? AND EstadoLlave = '1'", // '1' es Activo
        [userKey]
    );
    return results.length > 0;
};

export const shopRegister = async (userId, amount) => {
    // Convertir la cantidad a dólares (asumiendo que 'amount' está en centavos)
    const amountInDollars = amount / 100;

    // Preparar y ejecutar la consulta SQL
    const [results] = await pool.query(
        "INSERT INTO Pago_Usuario (UsuarioID, Monto, MetodoPago, Estado) VALUES (?, ?, ?, ?)",
        [userId, amountInDollars, "1", "1"]
    );

    // Verificar si la inserción fue exitosa (esto depende de cómo tu sistema gestiona las inserciones)
    return results.affectedRows > 0;
};
