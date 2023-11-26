import {
    fetchBook,
    fetchCompaniesImg,
    fetchSomeSections,
    fetchInfoEditors,
    fetchSocialNetworks,
    fetchBasicUsersUnified,
    fetchBasicEntitiesInfo,
    fetchSectionInfo,
    insertNewSection,
    insertUpdateSection,
    deleteSectionService,
    insertNewEntity,
    deleteEntityService,
    fetchMoreBasicEntityInfo,
    updateEntityService,
    getCountriesAndStates,
} from "../services/content.service.js";

export const getBookData = async (req, res) => {
    try {
        const book = await fetchBook();
        res.json(book);
    } catch (error) {
        console.error("Error fetching book data:", error);
        res.status(500).send("Error fetching book data.");
    }
};

export const getCompaniesData = async (req, res) => {
    try {
        const companies = await fetchCompaniesImg();
        res.json(companies);
    } catch (error) {
        console.error("Error fetching companies data:", error);
        res.status(500).send("Error fetching companies data.");
    }
};

export const getSomeSectionsData = async (req, res) => {
    try {
        const sections = await fetchSomeSections();
        res.json(sections);
    } catch (error) {
        console.error("Error fetching sections data:", error);
        res.status(500).send("Error fetching sections data.");
    }
};

export const getEditorsData = async (req, res) => {
    try {
        const editors = await fetchInfoEditors();
        res.json(editors);
    } catch (error) {
        console.error("Error fetching editors data:", error);
        res.status(500).send("Error fetching editors data.");
    }
};

export const getSocialNetworks = async (req, res) => {
    try {
        const networks = await fetchSocialNetworks();
        res.send(networks[0]);
    } catch (err) {
        res.status(500).send("Unable to fetch social networks: " + err);
    }
};

/* EDITORES */

export const getBasicUsersUnifiedData = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 30;

    // Extraer los parámetros de filtrado de la solicitud
    const nombre = req.query.nombre || "";
    const tipoUsuario = req.query.tipoUsuario || "";
    const fechaRegistroDesde = req.query.fechaRegistroDesde || "";
    const fechaRegistroHasta = req.query.fechaRegistroHasta || "";
    const estado = req.query.estado || "";

    try {
        // Pasar los parámetros de filtrado a la función del servicio
        const users = await fetchBasicUsersUnified(
            page,
            pageSize,
            nombre,
            tipoUsuario,
            fechaRegistroDesde,
            fechaRegistroHasta,
            estado
        );
        res.json(users);
    } catch (error) {
        console.error("Error fetching basic unified user data:", error);
        res.status(500).send("Error fetching basic unified user data.");
    }
};

/* 
export const getBasicEntitiesInfoData = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 30;

    try {
        const entities = await fetchBasicEntitiesInfo(page, pageSize);
        res.send(entities);
    } catch (error) {
        console.error("Error fetching basic entities info data:", error);
        res.status(500).send("Error fetching basic unified entity data.");
    }
}; */
export const getBasicEntitiesInfoData = async (req, res) => {
    console.log("QUERY", req.query);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 30;

    // Agregamos los parámetros de filtrado
    const {
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
    } = req.query;

    const offset = (page - 1) * pageSize;

    try {
        const entities = await fetchBasicEntitiesInfo(
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
        res.send(entities);
    } catch (error) {
        console.error("Error fetching basic entities info data:", error);
        res.status(500).send("Error fetching basic unified entity data.");
    }
};

export const getMoreBasicEntityInfoData = async (req, res) => {
    console.log("PARAMS", req.params);
    const EntityID = req.params.id;
    try {
        const result = await fetchMoreBasicEntityInfo(EntityID);
        /* const x = ({ ...result, success: true });
        console.log(x.success); */
        res.send({ ...result, success: true });
    } catch (error) {
        console.error("Error fetching more basic entity info data:", error);
        res.status(500).send("Error fetching more basic unified entity data.");
    }
};

export const getSectionsInfoData = async (req, res) => {
    try {
        const sections = await fetchSectionInfo();
        res.send(sections);
    } catch (error) {
        console.error("Error fetching sections info data:", error);
        res.status(500).send("Error fetching sections info data:");
    }
};

export const sendNewEntity = async (req, res) => {
    console.log("NEW ENTITY:", req.body);
    try {
        const result = await insertNewEntity(req.body);
        res.send({ ...result, success: true });
    } catch (error) {
        console.error("Error inserting new entity:", error);
        res.status(500).send("Error inserting new entity data:");
    }
};
export const sendUpdateEntity = async (req, res) => {
    try {
        const result = await updateEntityService(req.body);
        res.send({ ...result, success: true });
    } catch (error) {
        console.error("Error updating entity:", error);
        res.status(500).send("Error updating entity data:");
    }
    // Aquí debes continuar con la lógica para actualizar la entidad en la base de datos
};

export const sendDeleteEntity = async (req, res) => {
    const { id } = req.params; // Extrae el id de los parámetros de la URL
    console.log("Delete Entity: " + id);
    try {
        const result = await deleteEntityService(id);
        res.send(result);
    } catch (error) {
        console.error("Error delete section:", error);
        res.status(500).send("Error delete section data:");
    }
};

export const sendNewSection = async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const fileRoute = req.body.fileType;
    const image = req.file.originalname; // Esto es un objeto que contiene la información del archivo

    try {
        const result = await insertNewSection(name, description, fileRoute, image);
        console.log({ ...result, success: true });
        res.send({ ...result, success: true });
    } catch (error) {
        console.error("Error inserting new section:", error);
        res.status(500).send("Error inserting new section data:");
    }
};

export const sendUpdateSection = async (req, res) => {
    const { id, name, description, fileType } = req.body;
    let image;

    // Si se cargó un archivo, se usará el nuevo nombre de imagen
    if (req.file) {
        image = req.file.originalname.replace(/\s+/g, "_"); // reemplazar espacios por guiones bajos
    }

    try {
        const result = await insertUpdateSection(id, name, description, fileType, image);
        res.send({ ...result, success: true });
    } catch (error) {
        console.error("Error updating section:", error);
        res.status(500).send("Error updating section data:");
    }
};

export const sendDeleteSection = async (req, res) => {
    const { id } = req.params; // Extrae el id de los parámetros de la URL
    console.log("Delete section: " + id);
    try {
        const result = await deleteSectionService(id);
        res.send(result);
    } catch (error) {
        console.error("Error delete section:", error);
        res.status(500).send("Error delete section data:");
    }
};

export const countriesAndStates = async (req, res) => {
    try {
        const result = await getCountriesAndStates();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.error("Error countries and states section:", error);
        res.status(500).send("Error countries and states data:");
    }
};
