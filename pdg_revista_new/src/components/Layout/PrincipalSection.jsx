import React from "react";
import { useState, useEffect } from "react";

import "../../assets/css/components/Layout/principal_section.css";

import ImgGuide from "../../assets/resources/guia-logistica-2023.jpg";
import BgGuide from "../../assets/resources/background-guide.svg";

import { getBookData } from "../../api/content.api";
import config from "../../../config";
import CarrouselCompanies from "../Card/CarrouselCompanies";

function PrincipalSection() {
    const baseURL = config.contentPath;
    const [guideInfoDB, setGuideInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookData = await getBookData();
                const bookImage = `${baseURL}${bookData.RutaImagen}`;
                bookData.RutaImagen = bookImage;
                setGuideInfo(bookData);
            } catch (error) {
                console.error("Hubo un error al obtener los datos:", error);
            }
        };
        console.log("GUIDE: ",guideInfoDB);
        fetchData();
    }, []);
    return (
        <section
            id="main-section"
            className="main-section"
            style={{ backgroundImage: `url(${BgGuide})` }}
        >
            <div className="main-section-sub">
                <div className="sub-main-sect">
                    <div className="contenido">
                        <h1 className="titulo">{guideInfoDB.Titulo}</h1>
                        <h2 className="descripcion">
                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
                        facilisis urna. */}
                            {/* El directorio más completo de empresas logísticas para 2023. */}
                            {guideInfoDB.Descripcion}
                        </h2>
                        <div className="button-wrapper">
                            <a
                                className="btn btn-primary main-button desktop-button"
                                href="https://logistica-ni.com/guia-empresarial-2023/"
                                target="_blank"
                            >
                                Más Información
                            </a>
                        </div>
                    </div>
                    <div className="img-guide">
                        <img src={guideInfoDB.RutaImagen} alt="Imagen de libro" />
                        <a
                            className="btn btn-primary main-button mobile-button"
                            href="https://logistica-ni.com/guia-empresarial-2023/"
                            target="_blank"
                        >
                            Más Información
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PrincipalSection;

/* <a
                        className="main-button mobile-button"
                        href="https://logistica-ni.com/guia-empresarial-2023/"
                        target="_blank"
                    >
                        Más Información
                    </a>{" "}
                    {/* Botón para tablets pequeñas */
