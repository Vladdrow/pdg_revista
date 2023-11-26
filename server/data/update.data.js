import pool from "../db.js"; // Importa la conexión a la base de datos

export const updateUserInDb = async (formData) => {
    // Define una función asincrónica
    // Define la consulta SQL para actualizar la tabla Usuario
    const queryUsuario = `
        UPDATE Usuario
        SET 
            Nombre = ?,
            ApellidoPaterno = ?,
            ApellidoMaterno = ?,
            CorreoElectronico = ?,
            TipoUsuario = ?
        WHERE
            ID = ?
    `;

    // Ejecuta la consulta SQL para actualizar la tabla Usuario
    const [resultUsuario] = await pool.query(queryUsuario, [
        formData.nombre,
        formData.apellidos.split(" ")[0],
        formData.apellidos.split(" ")[1] || null, // Si no hay ApellidoMaterno, establece null
        formData.correo,
        formData.tipoUsuario,
        formData.id,
    ]);
    return { resultUsuario }; // Si no es un Editor, retorna solo el resultado de actualizar la tabla Usuario
};

export const deleteUserFromDB = async (userId, userType) => {
    try {
        await pool.query("START TRANSACTION");

        // Actualizar el estado del usuario a -1
        const [result] = await pool.query("UPDATE Usuario SET Estado = '-1' WHERE ID = ?", [userId]);
        
        await pool.query("COMMIT");
        
        return result;
    } catch (error) {
        await pool.query("ROLLBACK");
        console.error("Error updating user state in database:", error);
        throw error;
    }
};