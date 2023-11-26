import React, { createContext, useContext, useState } from "react";

import config from "../../config";
import Section from "../models/Section";
/* class */

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const contentPath = config.contentPath;
    const [sections, setSections] = useState(null);

    const fillSection = (sectionsData) => {
        const sectionInstance = sectionsData.map(
            (data) =>
                new Section(
                    data.ID,
                    data.Nombre,
                    data.Descripcion,
                    data.RutaImagen,
                    data.NombreImagen,
                    data.NumeroDeEntidades
                )
        );

        // Establecer propiedades de la instancia
        /* sectionInstance.setCompleteRoute(contentPath) */

        // Establecer el usuario en el estado
        setSections(sectionInstance);
    };

    return (
        <ContentContext.Provider value={{ sections, fillSection }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent debe ser usado dentro de un ContentProvider");
    }
    return context;
};
