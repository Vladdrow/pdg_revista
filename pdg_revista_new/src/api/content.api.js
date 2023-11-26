import axios from "axios";
import config from "../../config";

const BASE_URL = config.baseURL;
/* export const getHomePageData = async () => await axios.get(`${BASE_URL}/`); */
export const getBookData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/book`);
        return response.data;
    } catch (error) {
        console.error("Error fetching book data:", error);
        throw error;
    }
};

export const getCompaniesData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/companies`);
        return response.data;
    } catch (error) {
        console.error("Error fetching companies data:", error);
        throw error;
    }
};
export const getSomeSectionsData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/sections`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sections data:", error);
        throw error;
    }
};
export const getEditorsData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/editors`);
        return response.data;
    } catch (error) {
        console.error("Error fetching editors data:", error);
        throw error;
    }
};

/* De acá pa abajo ya estaba */
export const getSocialNetworks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/social-networks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching social networks:", error);
        throw error;
    }
};
/* Esto no estaba */
/* export const getUserDataList = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/getUserDataList?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}; */

export const getUserDataList = async (
    page = 1,
    nombre = "",
    tipoUsuario = "",
    fechaRegistroDesde = "",
    fechaRegistroHasta = "",
    estado = ""
) => {
    try {
        // Construir la URL con parámetros de consulta para filtrado
        const params = new URLSearchParams({
            page,
            nombre,
            tipoUsuario,
            fechaRegistroDesde,
            fechaRegistroHasta,
            estado,
        }).toString();

        const response = await axios.get(`${BASE_URL}/getUserDataList?${params}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

/* export const getEntitiesDataList = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/getEntitiesDataList?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching entities data:", error);
        throw error;
    }
}; */
export const getEntitiesDataList = async (
    page = 1,
    {
        nombreEmpresa = "",
        nombreUsuario = "",
        tipoUsuario = "",
        nombreSeccion = "",
        tipoRedSocial = "",
        estado = "",
        pais = "",
        tipoMembresia = "",
        estadoPago = "",
        metodoPago = "",
        tipoArchivo = "",
        diaSemana = "",
    } = {}
) => {
    try {
        const params = new URLSearchParams({
            page,
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
        }).toString();

        const response = await axios.get(`${BASE_URL}/getEntitiesDataList?${params}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching entities data:", error);
        throw error;
    }
};

export const getMoreEntityData = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getEntityData/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching entity data:", error);
        throw error;
    }
};

export const getSectionsData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getSectionsList`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sections data:", error);
        throw error;
    }
};

/* Registrando nueva entidad */
export const newEntity = (entityData) => {
    return axios.post(`${BASE_URL}/newEntity`, entityData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateEntity = (entityData, entityId) => {
    console.log("API:", entityData, entityId);
    return axios.put(`${BASE_URL}/updateEntity/${entityId}`, entityData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
export const deleteEntity = async (id) => {
    return axios.delete(`${BASE_URL}/deleteEntity/${id}`);
};
/* Registrando nueva seccion */
export const newSection = (sectionData) => {
    return axios.post(`${BASE_URL}/newSection`, sectionData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateSection = (sectionData) => {
    return axios.post(`${BASE_URL}/updateSection`, sectionData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteSection = async (id) => {
    return axios.delete(`${BASE_URL}/deleteSection/${id}`);
};

export const getCountriesAndStates = async () => {
    return axios.get(`${BASE_URL}/getCountriesAndStates`);
};
