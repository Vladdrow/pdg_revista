import moment from "moment-timezone";

export const convertToTimeZone = (dateString, timeZone = "America/La_Paz") => {
    if (!dateString) {
        return "";
    }

    // Crear un objeto moment con la fecha y hora proporcionadas
    const momentDate = moment(dateString);

    // Formato predeterminado solo con fecha
    let format = "DD/MM/YYYY";

    // Verificar si la hora es diferente de medianoche
    if (!(momentDate.hour() === 0 && momentDate.minute() === 0 && momentDate.second() === 0)) {
        // Si la hora no es medianoche, usar el formato con fecha y hora
        format += " HH:mm:ss";
    }

    // Retornar la fecha convertida al huso horario deseado y formateada
    return momentDate.tz(timeZone).format(format);
};
