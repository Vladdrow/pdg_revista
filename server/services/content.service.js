import {
    getBookInfo,
    getCompaniesImg,
    getSomeSections,
    getInfoEditors,
    getSocialNetworksFromDB,
    getBasicUsersUnified,
    getBasicEntitiesInfo,
    getMoreBasicEntityInfo,
    getSectionsInfo,
    registerSection,
    updateSection,
    deleteSection,
    registerEntity,
    deleteEntity,
    updateEntity,
    getUniqueCountriesAndStates,
} from "../data/content.data.js";

export const fetchBook = async () => {
    return await getBookInfo();
};

export const fetchCompaniesImg = async () => {
    return await getCompaniesImg();
};

export const fetchSomeSections = async () => {
    return await getSomeSections();
};

export const fetchInfoEditors = async () => {
    return await getInfoEditors();
};

export const fetchSocialNetworks = async () => {
    return await getSocialNetworksFromDB();
};
/* Editores */
export const fetchBasicUsersUnified = async (
    page,
    pageSize,
    searchTerm,
    userType,
    registrationDate,
    status
) => {
    return await getBasicUsersUnified(
        page,
        pageSize,
        searchTerm,
        userType,
        registrationDate,
        status
    );
};

export const fetchBasicEntitiesInfo = async (
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
    pageSize,
    offset
) => {
    return await getBasicEntitiesInfo(
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
        pageSize,
        offset
    );
};

export const fetchMoreBasicEntityInfo = async (EntityID) => {
    const results = await getMoreBasicEntityInfo(EntityID);

    // Crear un objeto para agrupar las sucursales por DireccionID
    const sucursales = {};

    results.forEach((item) => {
        // Si la sucursal aún no existe en el objeto, inicializarla
        if (!sucursales[item.DireccionID]) {
            sucursales[item.DireccionID] = {
                EmpresaID: item.EmpresaID,
                DireccionID: item.DireccionID,
                Calle: item.Calle,
                Numero: item.Numero,
                Ciudad: item.Ciudad,
                Estado: item.Estado,
                Pais: item.Pais,
                InformacionAdicional: item.InformacionAdicional,
                Contactos: [],
            };
        }

        // Agregar el contacto a la sucursal correspondiente
        sucursales[item.DireccionID].Contactos.push({
            ContactoID: item.ContactoID,
            TipoContacto: item.TipoContacto,
            Prefijo: item.Prefijo,
            DetalleContacto: item.DetalleContacto,
        });
    });

    // Convertir el objeto de sucursales a un array
    return Object.values(sucursales);
};

export const fetchSectionInfo = async () => {
    return await getSectionsInfo();
};

export const insertNewEntity = async (entityData) => {
    // Preparar los datos aquí si es necesario
    const preparedData = prepareEntityData(entityData);

    // Luego, registrar la entidad con los datos preparados
    return await registerEntity(preparedData);
};

export const updateEntityService = async (rawData) => {
    console.log("Datos recibidos para actualizar la entidad:", rawData);

    // Extracción y transformación de los datos
    const data = {
        adminId: rawData.adminID || null,
        entityId: rawData.entityID || null,
        entityName: rawData.entityName || null,
        entitySection: rawData.entitySection || null,
        websiteUrl: rawData.websiteUrl || null,
        membership: rawData.membership || null,
        branches: rawData.branches ? JSON.parse(rawData.branches) : null,
    };

    console.log(JSON.stringify(data, null, 2));
    return await updateEntity(data);
};

export const deleteEntityService = async (id) => {
    return await deleteEntity(id);
};

export const insertNewSection = async (name, description, fileRoute, image) => {
    const imageModified = image.replace(/\s+/g, "_");
    const fileRouteModified = fileRoute.replace("-", "/") + "/";

    return await registerSection(name, description, fileRouteModified, imageModified);
};

export const insertUpdateSection = async (id, name, description, fileType, image) => {
    // Solo modificamos la ruta y el nombre de la imagen si realmente se proporciona una imagen
    let fileRouteModified, imageModified;
    if (image) {
        imageModified = image; // asumimos que ya hicimos el replace en el controlador
        fileRouteModified = fileType.replace("-", "/") + "/";
    } else {
        imageModified = null;
        fileRouteModified = null;
    }

    return await updateSection(id, name, description, fileRouteModified, imageModified);
};

export const deleteSectionService = async (id) => {
    return await deleteSection(id);
};

function processBranches(rawBranchesData) {
    return rawBranchesData.map((branchData) => {
        return typeof branchData === "string" ? JSON.parse(branchData).added : branchData;
    });
}

function processBranchSpecificChanges(rawData, branches) {
    Object.keys(rawData).forEach((key) => {
        const match = key.match(/branches\[(\d+)\]\.(phoneNumbers|cellNumbers|emails)\[(\d+)\]/);
        if (match) {
            const branchIndex = parseInt(match[1]);
            const contactType = match[2];
            const contactIndex = parseInt(match[3]);
            const contactChange = JSON.parse(rawData[key]);

            // Asegurar que la sucursal y el tipo de contacto existan
            if (!branches[branchIndex]) {
                branches[branchIndex] = { phoneNumbers: [], cellNumbers: [], emails: [] };
            }
            if (!branches[branchIndex][contactType]) {
                branches[branchIndex][contactType] = [];
            }

            if (contactChange.added) {
                // Añadir o actualizar el contacto específico
                branches[branchIndex][contactType][contactIndex] = contactChange.added;
            }
            // Agregar lógica para otros tipos de cambios si es necesario
        }
    });
}

function prepareEntityData(newEntityData) {
    // Desestructurando y transformando los datos recibidos
    const { entityName, adminID, entitySection, websiteUrl, membership, branches } = newEntityData;

    // Preparar 'branches', si es necesario
    const preparedBranches = branches.map((branch) => {
        return {
            // Transformaciones específicas para cada sucursal, si las hay
            phoneNumbers: branch.phoneNumbers,
            cellNumbers: branch.cellNumbers,
            emails: branch.emails,
            address: branch.address,
            // Más propiedades según sea necesario
        };
    });

    // Objeto 'entityData' preparado
    return {
        entityName,
        adminID,
        entitySection,
        websiteUrl,
        membership,
        branches: preparedBranches,
    };
}

export const getCountriesAndStates = async () => {
    return await getUniqueCountriesAndStates();
};
