import { getUserDataList } from "../api/content.api.js";
import User from "./User.js";
import { convertToTimeZone } from "../utils/timeUtils.js";
import config from "../../config.js";

/* UserFrontend */
class UserAuthenticated extends User {
    constructor(user = {}) {
        super(user);
        this.isPremium = user.IsPremium || false;
        this.isEditor2 = user.IsEditor === true ? true : false;
        this.estado = user.Estado || "";
        this.fechaRegistro = convertToTimeZone(user.FechaRegistro) || "";
        this.fechaUltimoAcceso = user.FechaUltimoAcceso || "";
        this.rutaImagen = user.RutaImagen || "";

        this.baseURL = config.contentPath;
    }

    setIsPremium(isPremium) {
        this.isPremium = isPremium;
    }
    nombreCompleto() {
        return `${this.nombre} ${this.apellidoPaterno} ${this.apellidoMaterno}`.trim();
    }
    concatRutaImagen() {
        return `${this.baseURL}${this.rutaImagen}`;
    }

    static async getUsersApi(currentPage, filter) {
        try {
            // Desestructurar los valores del objeto de filtro
            const { searchTerm, userType, registrationDate, status } = filter;

            // Llamar a getUserDataList con los parámetros adecuados
            const response = await getUserDataList(
                currentPage,
                searchTerm,
                userType,
                registrationDate, // Asumiendo que es la fecha desde
                "", // Fecha hasta, si es necesario añadir al objeto de filtro
                status
            );

            if (response) {
                return response.map((usuarioData) => new UserAuthenticated(usuarioData));
            }
        } catch (error) {
            console.error("Error al obtener datos de la API:", error);
            return [];
        }
    }
    getDataForTable() {
        // Ajustar los datos para mostrar en el DataTable
        return {
            ID: this.id,
            Nombre: this.nombreCompleto(), // Asumiendo que tienes un método para obtener el nombre completo
            CorreoElectronico: this.email,
            TipoUsuario: this.isEditor ? "Administrativo" : "Lector",
            Estado: this.estado /*  ? 'Premium' : 'Normal', */, // Ejemplo de cómo podrías querer mostrar esta información
            FechaRegistro: this.fechaRegistro, // Puede necesitar formateo
            RutaImagen: this.concatRutaImagen(), // Puede necesitar
            // Otros campos que n   ecesites
        };
    }
}

export default UserAuthenticated;
