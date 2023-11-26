import pool from "../db.js";
/* import { convertToLaPazTime } from "../utils/dateUtils.js"; */
/* import { promises as fs } from 'fs';
import path from 'path'; */

import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { readdir } from "fs/promises";

// CONSULTAS PARA EL HOME

// 1. Obtener datos del libro de turno
export const getBookInfo = async () => {
    const bookId = 1; //Numero de ejemplo
    const [result] = await pool.query("SELECT * FROM Libro WHERE ID = ?", [bookId]);
    return result[0];
};

// 2. Obtener el ID, SeccionID e imágenes de las empresas con tipo de membresía = 2
export const getCompaniesImg = async () => {
    const query = `
        SELECT e.ID, e.Nombre, e.SeccionID, me.TipoMembresia, aa.NombreArchivo ,aa.RutaArchivo
        FROM Empresa e
        JOIN Membresia_Empresa me ON e.ID = me.EmpresaID
        JOIN Archivo_Adjunto aa ON e.ID = aa.EmpresaID
        WHERE me.TipoMembresia = '2' AND aa.TipoArchivo = '1';   
    `; // 2 es de premium
    const [results] = await pool.query(query);
    console.log(results);
    return results;
};

// 3. Obtener todos los datos de las Secciones
/* export const getAllSections = async () => {
    const [results] = await pool.query("SELECT * FROM Seccion");
    return results;
}; */
export const getSomeSections = async () => {
    const query = "SELECT * FROM Seccion ORDER BY RAND() LIMIT ?";
    const [results] = await pool.query(query, 4);
    return results;
};

// 4. Obtener todos los datos de los editores
export const getInfoEditors = async () => {
    const query =
        "SELECT u.ID, u.Nombre, u.ApellidoPaterno, u.ApellidoMaterno, e.Rol, e.Descripcion, u.RutaImagen, u.NombreImagen FROM Usuario u JOIN Editor e ON u.ID=e.UsuarioID WHERE u.TipoUsuario = '1' ORDER BY RAND() LIMIT ?";
    const [results] = await pool.query(query, 3);
    return results;
};

export const getSocialNetworksFromDB = async () => {
    // Suponiendo que tienes una función para interactuar con tu base de datos
    const networks = await pool.query("SELECT * FROM Red_Social");
    return networks;
};

/* Editores */
export const getBasicUsersUnified = async (
    page = 1,
    pageSize = 30,
    searchTerm = "", // Cambiado de 'nombre' a 'searchTerm'
    userType = "", // Cambiado de 'tipoUsuario' a 'userType'
    registrationDate = "", // Combinado 'fechaRegistroDesde' y 'fechaRegistroHasta' en un solo campo
    status = "" // Cambiado de 'estado' a 'status'
) => {
    const offset = (page - 1) * pageSize;

    let whereClauses = [];
    let params = [];

    // Filtro por término de búsqueda (nombre)
    if (searchTerm) {
        whereClauses.push("u.Nombre LIKE CONCAT('%', ?, '%')");
        params.push(searchTerm);
    }

    // Filtro por tipo de usuario
    if (userType) {
        whereClauses.push("u.TipoUsuario = ?");
        params.push(userType);
    }

    // Filtro por fecha de registro
    // Asumiendo que 'registrationDate' es una fecha específica o un rango en formato específico
    if (registrationDate) {
        // Aquí deberás implementar la lógica de filtrado basada en cómo se maneja 'registrationDate' en el frontend
    }

    // Filtro por estado
    if (status) {
        whereClauses.push("u.Estado = ?");
        params.push(status);
    }

    // Construcción dinámica de la cláusula WHERE
    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Consulta SQL con los filtros
    const query = `
        SELECT 
            u.ID,
            u.Nombre,
            IFNULL(u.ApellidoPaterno, '') AS ApellidoPaterno, 
            IFNULL(u.ApellidoMaterno, '') AS ApellidoMaterno, 
            u.CorreoElectronico,
            CASE
                WHEN u.TipoUsuario = 1 THEN 'Administrativo'
                ELSE 'Lector'
            END AS TipoUsuario,
            CONCAT(u.RutaImagen,u.NombreImagen ) AS RutaImagen,
            CASE
                WHEN u.Estado = '-1' THEN 'Bloqueado'
                WHEN u.Estado = '0' THEN 'Bloq. Temporalmente'
                ELSE 'Activo'
            END AS Estado,
            u.FechaRegistro,
            u.FechaUltimoAcceso
        FROM Usuario u
        ${whereClause}
        LIMIT ? OFFSET ?;
    `;

    params.push(pageSize, offset);

    const [results] = await pool.query(query, params);
    return results;
};

/* export const getBasicEntitiesInfo = async (page = 1, pageSize = 30) => {
    const offset = (page - 1) * pageSize;

    const query = `
        SELECT
            E.ID,
            E.Nombre AS EmpresaNombre,
            U.Nombre AS UsuarioNombre,
            S.ID AS SeccionID,
            S.Nombre AS SeccionNombre,
            ME.TipoMembresia AS TipoMembresiaID,
            CASE ME.TipoMembresia
                WHEN '1' THEN 'Básico'
                WHEN '2' THEN 'Premium'
                WHEN '3' THEN 'Élite'
                ELSE 'No Especificado'
            END AS TipoMembresia,
            COALESCE(NULLIF(E.UrlSitioWeb, ''), 'No Especificado') AS UrlSitioWeb,
            E.FechaInicio AS FechaRegistro,
            COUNT(DE.DireccionID) AS Sucursales
        FROM Empresa E
            JOIN Usuario U ON E.UsuarioID = U.ID
            JOIN Seccion S ON E.SeccionID = S.ID
            LEFT JOIN Membresia_Empresa ME ON E.ID = ME.EmpresaID
            LEFT JOIN Direccion_Empresa DE ON E.ID = DE.EmpresaID
        GROUP BY E.ID, E.Nombre, U.Nombre, S.Nombre, ME.TipoMembresia, E.UrlSitioWeb, E.FechaInicio
        ORDER BY E.ID ASC
        LIMIT ? OFFSET ?;
    `;
    const [results] = await pool.query(query, [pageSize, offset]);
    return results;
}; */
export const getBasicEntitiesInfo = async (
    nombreEmpresa,
    nombreUsuario,
    tipoUsuario,
    nombreSeccion,
    tipoRedSocial,
    estado,
    pais,
    tipoMembresia,
    estadoPago,
    metodoPago,
    tipoArchivo,
    diaSemana,
    limit,
    offset
) => {
    // Construir dinámicamente la cláusula WHERE basada en los filtros aplicados
    let whereClauses = [];
    let params = [];

    // Agregar condiciones de filtro solo si los valores correspondientes no están vacíos
    if (nombreEmpresa) {
        whereClauses.push("E.Nombre LIKE CONCAT('%', ?, '%')");
        params.push(nombreEmpresa);
    }
    if (nombreUsuario) {
        whereClauses.push("U.Nombre LIKE CONCAT('%', ?, '%')");
        params.push(nombreUsuario);
    }
    if (tipoUsuario) {
        whereClauses.push("U.TipoUsuario = ?");
        params.push(tipoUsuario);
    }
    if (nombreSeccion) {
        whereClauses.push("S.ID = ?");
        params.push(nombreSeccion);
    }
    if (tipoRedSocial) {
        whereClauses.push("RSE.TipoRedSocial = ?");
        params.push(tipoRedSocial);
    }
    if (estado) {
        whereClauses.push("D.Estado = ?");
        params.push(estado);
    }
    if (pais) {
        whereClauses.push("D.Pais = ?");
        params.push(pais);
    }
    if (tipoMembresia) {
        whereClauses.push("ME.TipoMembresia = ?");
        params.push(tipoMembresia);
    }
    if (estadoPago) {
        whereClauses.push("ME.EstadoPago = ?");
        params.push(estadoPago);
    }
    if (metodoPago) {
        whereClauses.push("ME.MetodoPago = ?");
        params.push(metodoPago);
    }
    if (tipoArchivo) {
        whereClauses.push("AA.TipoArchivo = ?");
        params.push(tipoArchivo);
    }
    if (diaSemana) {
        whereClauses.push("HA.DiaSemana = ?");
        params.push(diaSemana);
    }

    console.log("MEMBRESIA: ", tipoMembresia);
    console.log("CLAUSES: ", whereClauses);
    // Unir todas las cláusulas WHERE con 'AND', si hay alguna
    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    console.log("Clause: ", whereClause);
    console.log("PARAMS: ", params);

    // La consulta SQL
    const query = `
        SELECT
            E.ID,
            E.Nombre AS EmpresaNombre,
            U.Nombre AS UsuarioNombre,
            S.ID AS SeccionID,
            S.Nombre AS SeccionNombre,
            ME.TipoMembresia AS TipoMembresiaID,
            CASE ME.TipoMembresia
                WHEN '1' THEN 'Básico'
                WHEN '2' THEN 'Premium'
                WHEN '3' THEN 'Élite'
                ELSE 'No Especificado'
            END AS TipoMembresia,
            COALESCE(NULLIF(E.UrlSitioWeb, ''), 'No Especificado') AS UrlSitioWeb,
            E.FechaInicio AS FechaRegistro,
            COUNT(DE.DireccionID) AS Sucursales
        FROM Empresa E
            JOIN Usuario U ON E.UsuarioID = U.ID
            JOIN Seccion S ON E.SeccionID = S.ID
            LEFT JOIN Membresia_Empresa ME ON E.ID = ME.EmpresaID
            LEFT JOIN Direccion_Empresa DE ON E.ID = DE.EmpresaID
            LEFT JOIN Direccion D ON DE.DireccionID = D.ID
            LEFT JOIN Red_Social_Empresa RSE ON E.ID = RSE.EmpresaID
            LEFT JOIN Horario_De_Atencion HA ON D.ID = HA.DireccionID
            LEFT JOIN Archivo_Adjunto AA ON E.ID = AA.EmpresaID
        ${whereClause}
        GROUP BY E.ID, E.Nombre, U.Nombre, S.Nombre, ME.TipoMembresia, E.UrlSitioWeb, E.FechaInicio
        ORDER BY E.ID ASC
        LIMIT ? OFFSET ?
    `;

    // Agregar los parámetros de paginación al final
    params.push(limit, offset);

    // Ejecutar la consulta
    const [results] = await pool.query(query, params);
    return results;
};

export const getMoreBasicEntityInfo = async (EntityID) => {
    const [results] = await pool.query(
        `SELECT
            D.ID AS DireccionID,
            D.Calle,
            D.Numero,
            D.Ciudad,
            D.Estado,
            D.Pais,
            D.InformacionAdicional,
            CE.ID as ContactoID,
            CASE CE.TipoContacto
                WHEN '1' THEN 'Teléfono'
                WHEN '2' THEN 'Celular'
                WHEN '3' THEN 'Email'
                ELSE 'No Especificado'
            END AS TipoContacto,
            CE.DetalleContacto
        FROM Empresa E
            LEFT JOIN Direccion_Empresa DE ON E.ID = DE.EmpresaID
            LEFT JOIN Direccion D ON DE.DireccionID = D.ID
            LEFT JOIN Contacto_Empresa CE ON D.ID = CE.DireccionID
        WHERE E.ID = ?`,
        [EntityID]
    );
    return results;
};

/* WHEN CE.TipoContacto IN ('1', '2') THEN CONCAT('+', COALESCE(CE.Prefijo, '000'), ' ', CE.DetalleContacto) */
export const getSectionsInfo = async () => {
    const query = `
        SELECT 
            S.ID,
            S.Nombre,
            S.Descripcion,
            S.RutaImagen,
            S.UrlSeccion,
            S.NombreImagen,
            COUNT(E.ID) AS NumeroDeEntidades
        FROM Seccion S
        LEFT JOIN Empresa E ON S.ID = E.SeccionID
        GROUP BY S.ID, S.Nombre, S.Descripcion, S.RutaImagen, S.NombreImagen;
    `;
    const [results] = await pool.query(query);
    return results;
};

export const registerEntity = async (entityData) => {
    // Desestructuración de los datos recibidos
    const { entityName, adminID, entitySection, websiteUrl, membership, branches } = entityData;

    await pool.query("START TRANSACTION");

    try {
        // Insertar Empresa
        const [empresaResult] = await pool.query(
            "INSERT INTO Empresa (Nombre, UsuarioID, SeccionID, UrlSitioWeb, FechaInicio) VALUES (?, ?, ?, ?, ?)",
            [entityName, adminID, entitySection, websiteUrl, new Date()]
        );
        const empresaId = empresaResult.insertId;

        if (membership === "1") {
            await pool.query(
                "INSERT INTO Membresia_Empresa (EmpresaID, TipoMembresia, FechaInicio, FechaFin, EstadoPago, MetodoPago) VALUES (?, ?, ?, NULL, NULL, NULL)",
                [empresaId, membership, new Date()]
            );
        } else {
            // Aquí puedes añadir lógica para otros tipos de membresía si es necesario
        }

        // Procesar e insertar cada sucursal y sus contactos
        for (const branch of branches) {
            // Insertar Direccion y obtener su ID
            const address = branch.address;
            const [direccionResult] = await pool.query(
                "INSERT INTO Direccion (Calle, Numero, Ciudad, Estado, Pais, InformacionAdicional) VALUES (?, ?, ?, ?, ?, ?)",
                [
                    address.street,
                    address.number,
                    address.city,
                    address.state,
                    address.country,
                    address.additionalInfo,
                ]
            );
            const direccionId = direccionResult.insertId;

            // Vincular Direccion con Empresa
            await pool.query(
                "INSERT INTO Direccion_Empresa (EmpresaID, DireccionID) VALUES (?, ?)",
                [empresaId, direccionId]
            );

            // Convertir los datos de formato JSON a arrays
            /* console.log("PHONE NUMBERS: ",branch.phoneNumbers);
            const phoneNumbers = JSON.parse(branch.phoneNumbers);
            const cellNumbers = JSON.parse(branch.cellNumbers);
            const emails = JSON.parse(branch.emails); */

            // Insertar Contactos para cada Direccion
            for (const phoneNumber of branch.phoneNumbers) {
                await pool.query(
                    "INSERT INTO Contacto_Empresa (DireccionID, Prefijo, TipoContacto, DetalleContacto) VALUES (?, ?, '1', ?)",
                    [direccionId, "591", phoneNumber.value]
                );
            }
            for (const cellNumber of branch.cellNumbers) {
                await pool.query(
                    "INSERT INTO Contacto_Empresa (DireccionID, Prefijo, TipoContacto, DetalleContacto) VALUES (?, ?, '2', ?)",
                    [direccionId, "591", cellNumber.value]
                );
            }
            for (const email of branch.emails) {
                await pool.query(
                    "INSERT INTO Contacto_Empresa (DireccionID, TipoContacto, DetalleContacto) VALUES (?, '3', ?)",
                    [direccionId, email.value]
                );
            }
        }

        // Confirmar la transacción
        await pool.query("COMMIT");
        console.log("Empresa y sucursales registradas exitosamente.");
    } catch (error) {
        // Revertir los cambios si hay un error
        await pool.query("ROLLBACK");
        console.error("Error al registrar la empresa y sus sucursales:", error);
        throw error;
    }
};

/*  */
async function actualizarInformacionEmpresa(entity) {
    const { entityId, entityName, entitySection, websiteUrl } = entity;
    const updateEmpresaQuery = [];
    const updateEmpresaValues = [];

    if (entityName !== null) {
        updateEmpresaQuery.push("Nombre = ?");
        updateEmpresaValues.push(entityName);
    }
    if (entitySection !== null) {
        updateEmpresaQuery.push("SeccionID = ?");
        updateEmpresaValues.push(entitySection);
    }
    if (websiteUrl !== null) {
        updateEmpresaQuery.push("UrlSitioWeb = ?");
        updateEmpresaValues.push(websiteUrl);
    }

    if (updateEmpresaQuery.length > 0) {
        await pool.query(`UPDATE Empresa SET ${updateEmpresaQuery.join(", ")} WHERE ID = ?`, [
            ...updateEmpresaValues,
            entityId,
        ]);
    }
}

async function actualizarMembresia(entity) {
    const { entityId, membership } = entity;

    if (membership !== null) {
        const [existingMembership] = await pool.query(
            "SELECT ID FROM Membresia_Empresa WHERE EmpresaID = ?",
            [entityId]
        );

        if (existingMembership.length > 0) {
            await pool.query(
                "UPDATE Membresia_Empresa SET TipoMembresia = ?, FechaInicio = ? WHERE EmpresaID = ?",
                [membership, new Date(), entityId]
            );
        } else {
            await pool.query(
                "INSERT INTO Membresia_Empresa (EmpresaID, TipoMembresia, FechaInicio) VALUES (?, ?, ?)",
                [entityId, membership, new Date()]
            );
        }
    }
}

async function procesarSucursalesYContactos(entity) {
    const { branches, entityId } = entity;

    for (const branch of branches) {
        console.log("BRANCH: ", branch);

        if (branch.deleted) {
            await pool.query("DELETE FROM Direccion WHERE ID = ?", [branch.addressId]);
            continue;
        }

        let addressId = branch.addressId;

        if (branch.added) {
            const address = branch.address;
            const [direccionResult] = await pool.query(
                "INSERT INTO Direccion (Calle, Numero, Ciudad, Estado, Pais, InformacionAdicional) VALUES (?, ?, ?, ?, ?, ?)",
                [
                    address.street,
                    address.number,
                    address.city,
                    address.state,
                    address.country,
                    address.additionalInfo,
                ]
            );
            addressId = direccionResult.insertId;

            console.log("RESULT ADDED: ", direccionResult);

            await pool.query(
                "INSERT INTO Direccion_Empresa (EmpresaID, DireccionID) VALUES (?, ?)",
                [entityId, addressId]
            );
        } else if (branch.address && branch.address.updated) {
            const address = branch.address;
            const updateDireccionQuery = [];
            const updateDireccionValues = [];

            if (address.number) {
                updateDireccionQuery.push("Numero = ?");
                updateDireccionValues.push(address.number);
            }
            if (address.street) {
                updateDireccionQuery.push("Calle = ?");
                updateDireccionValues.push(address.street);
            }
            if (address.city) {
                updateDireccionQuery.push("Ciudad = ?");
                updateDireccionValues.push(address.city);
            }
            if (address.state) {
                updateDireccionQuery.push("Estado = ?");
                updateDireccionValues.push(address.state);
            }
            if (address.country) {
                updateDireccionQuery.push("Pais = ?");
                updateDireccionValues.push(address.country);
            }
            if (address.additionalInfo) {
                updateDireccionQuery.push("InformacionAdicional = ?");
                updateDireccionValues.push(address.additionalInfo);
            }

            if (updateDireccionQuery.length > 0) {
                await pool.query(
                    `UPDATE Direccion SET ${updateDireccionQuery.join(", ")} WHERE ID = ?`,
                    [...updateDireccionValues, addressId]
                );
            }
        }
        // Procesar contactos (teléfonos, celulares, emails) de la sucursal...
        await procesarContactos(branch, branch.addressId || addressId);
    }
}

async function procesarContactos(branch, addressId) {
    // Procesar números de teléfono
    if (branch.phoneNumbers) {
        for (const phoneNumber of branch.phoneNumbers) {
            if (phoneNumber.updated) {
                await pool.query("UPDATE Contacto_Empresa SET DetalleContacto = ? WHERE ID = ?", [
                    phoneNumber.value,
                    phoneNumber.id,
                ]);
            } else if (phoneNumber.deleted) {
                await pool.query("DELETE FROM Contacto_Empresa WHERE ID = ?", [phoneNumber.id]);
            } else if (phoneNumber.added || branch.added) {
                await pool.query(
                    "INSERT INTO Contacto_Empresa (DireccionID, TipoContacto, DetalleContacto) VALUES (?, '1', ?)",
                    [addressId, phoneNumber.value]
                );
            }
        }
    }

    // Procesar números de celular
    if (branch.cellNumbers) {
        for (const cellNumber of branch.cellNumbers) {
            if (cellNumber.updated) {
                await pool.query("UPDATE Contacto_Empresa SET DetalleContacto = ? WHERE ID = ?", [
                    cellNumber.value,
                    cellNumber.id,
                ]);
            } else if (cellNumber.deleted) {
                await pool.query("DELETE FROM Contacto_Empresa WHERE ID = ?", [cellNumber.id]);
            } else if (cellNumber.added || branch.added) {
                await pool.query(
                    "INSERT INTO Contacto_Empresa (DireccionID, TipoContacto, DetalleContacto) VALUES (?, '2', ?)",
                    [addressId, cellNumber.value]
                );
            }
        }
    }

    // Procesar correos electrónicos
    if (branch.emails) {
        for (const email of branch.emails) {
            if (email.updated) {
                await pool.query("UPDATE Contacto_Empresa SET DetalleContacto = ? WHERE ID = ?", [
                    email.value,
                    email.id,
                ]);
            } else if (email.deleted) {
                await pool.query("DELETE FROM Contacto_Empresa WHERE ID = ?", [email.id]);
            } else if (email.added || branch.added) {
                await pool.query(
                    "INSERT INTO Contacto_Empresa (DireccionID, TipoContacto, DetalleContacto) VALUES (?, '3', ?)",
                    [addressId, email.value]
                );
            }
        }
    }
}

export const updateEntity = async (entity) => {
    await pool.query("START TRANSACTION");

    try {
        await actualizarInformacionEmpresa(entity);
        await actualizarMembresia(entity);
        await procesarSucursalesYContactos(entity);

        await pool.query("COMMIT");
        console.log("Empresa y sucursales actualizadas exitosamente.");
    } catch (error) {
        await pool.query("ROLLBACK");
        console.error("Error al actualizar la empresa y sus sucursales:", error);
        throw error;
    }
};

/*  */

export const deleteEntity = async (id) => {
    const [results] = await pool.query("DELETE FROM Empresa WHERE ID = ?", [id]);
    return [results] > 0;
};

/* Registrando nueva seccion */
export const registerSection = async (name, description, fileRoute, image) => {
    const results = await pool.query(
        "INSERT INTO Seccion (Nombre, Descripcion, RutaImagen, NombreImagen) VALUES (?,?,?,?)",
        [name, description, fileRoute, image]
    );
    return results;
};

export const updateSection = async (id, name, description, fileType, imageName) => {
    let query, values;

    if (imageName) {
        // Si se proporciona una imagen, se actualiza todo
        query =
            "UPDATE Seccion SET Nombre=?, Descripcion=?, RutaImagen=?, NombreImagen=? WHERE ID = ?";
        values = [name, description, `${fileType.replace("-", "/")}/`, imageName, id];
    } else {
        // Si no se proporciona una imagen, no se actualiza la columna de imagen
        query = "UPDATE Seccion SET Nombre=?, Descripcion=? WHERE ID = ?";
        values = [name, description, id];
    }

    console.log("Name: " + name);
    console.log("Description: " + description);
    if (imageName) {
        console.log("File: " + fileType);
        console.log("Image: " + imageName);
    }
    const results = await pool.query(query, values);
    return results;
};

export const deleteSection = async (id) => {
    const [results] = await pool.query("DELETE FROM Seccion WHERE ID = ?", [id]);
    return [results] > 0;
};

export const getUniqueCountriesAndStates = async () => {
    // Consulta para obtener todos los países únicos
    const queryCountries = `
        SELECT DISTINCT Pais
        FROM Direccion;
    `;

    // Consulta para obtener todos los estados únicos
    const queryStates = `
        SELECT DISTINCT Estado
        FROM Direccion;
    `;

    // Ejecutar la consulta de países
    const [countries] = await pool.query(queryCountries);

    // Ejecutar la consulta de estados
    const [states] = await pool.query(queryStates);

    // Combinar los resultados
    const results = {
        countries,
        states,
    };

    return results;
};
