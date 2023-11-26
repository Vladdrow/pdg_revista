import React, { useState, useEffect } from "react";

import contenedor from "../../assets/resources/contenedor.png";
import engranaje from "../../assets/resources/engranaje.png";
import "../../assets/css/components/Layout/sectors_covered.css";
import TextBlockInfo from "../Card/TextBlockInfo";

import { getSomeSectionsData } from "../../api/content.api";
import config from "../../../config";
import BasicInfoCard from "../Card/BasicInfoCard";

function SectorsCovered({ isAuthenticated = false, color = null, title = null }) {
    /* const sections = [
        {
            imgSrc: contenedor,
            title: "Barton, Greenholt and Ernser",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus blanditiis repellendus consequuntur voluptatem laborum illum aliquam! ",
        },
        {
            imgSrc: engranaje,
            title: "Barton, Greenholt and Ernser",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus blanditiis repellendus consequuntur voluptatem laborum illum aliquam! ",
        },
        {
            imgSrc: contenedor,
            title: "Barton, Greenholt and Ernser",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus blanditiis repellendus consequuntur voluptatem laborum illum aliquam! ",
        },
        {
            imgSrc: engranaje,
            title: "Barton, Greenholt and Ernser",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus blanditiis repellendus consequuntur voluptatem laborum illum aliquam! ",
        },
    ]; */

    const [sectionData, setSectionData] = useState([]);
    const baseURL = config.contentPath;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sectionsData = await getSomeSectionsData();
                setSectionData(
                    sectionsData.map((section) => ({
                        ...section,
                        RutaImagen: `${baseURL}${section.RutaImagen}${section.NombreImagen}`,
                    }))
                );
            } catch (error) {
                console.error("Hubo un error al obtener los datos:", error);
            }
        };
        fetchData();
    }, []);
    console.log("Sections", sectionData);
    return (
        <>
            <section class={`services ${color ? color : ""}`}>
                <div class="services-header">
                    <h2 className={`serv-hd ${color ? "white" : ""}  `}>{title}</h2>
                </div>
                <div class="service-cards">
                    {sectionData.map((section, index) => (
                        <BasicInfoCard
                            key={index}
                            title={section.Nombre}
                            description={section.Descripcion}
                            toUrl={section.UrlSeccion}
                            imgSrc={section.RutaImagen}
                            toDo={!color ? "Explorar →" : "Más Información"}
                        />
                    ))}
                </div>
                
            </section>
        </>
    );
}

export default SectorsCovered;
