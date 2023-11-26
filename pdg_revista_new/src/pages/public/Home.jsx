import React, { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import PrincipalSection from "../../components/Layout/PrincipalSection";
import CarrouselCompanies from "../../components/Card/CarrouselCompanies";
import TextBlocks from "../../components/Layout/TextBlocks";
import SectorsCovered from "../../components/Layout/SectorsCovered";
import OurTeam from "../../components/Layout/OurTeam";
import Footer from "../../components/Footer/Footer";

import GooglePayButton from "@google-pay/button-react";

/* API */

import Contenedor from "../../assets/resources/contenedor.png";
import LogoVer from "../../assets/resources/transporte.jpg";
import LogoVer2 from "../../assets/resources/logistica2.jpg";
import config from "../../../config";
import { getBookData } from "../../api/content.api";
import BuyBook from "../../components/Layout/BuyBook";
import EntitiesSubscription from "../../components/Layout/EntitiesSubscription";

function Home() {
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
        fetchData();
    }, []);

    const register = {
        /* name: "Iniciar Sesión",
        path: "/login", */
        name: "Registrarse",
        path: "/register",
    };
    const NewUserPages = [
        {
            name: "Explorar",
            path: "/explore",
        },
        {
            name: "Nosotros",
            path: "/about",
        },
        {
            name: "Contáctanos",
            path: "/contact",
        },
        {
            name: "Registrarse",
            path: "/register",
        },
        {
            name: "Iniciar Sesión",
            path: "/login",
        },
    ];
    const imagesData = [
        { src: LogoVer, url: "https://ejemplo1.com" },
        { src: LogoVer2, url: "https://ejemplo2.com" },
        { src: LogoVer, url: "https://ejemplo3.com" },
        { src: LogoVer2, url: "https://ejemplo4.com" },
        { src: LogoVer, url: "https://ejemplo5.com" },
        { src: LogoVer, url: "https://ejemplo1.com" },
        { src: LogoVer2, url: "https://ejemplo2.com" },
        { src: LogoVer, url: "https://ejemplo3.com" },
        { src: LogoVer2, url: "https://ejemplo4.com" },
        { src: LogoVer, url: "https://ejemplo5.com" },
    ];

    return (
        <>
            <Header Pages={NewUserPages} isHome={true} route={register} />
            <main>
                

                {/* <a href="auth/show1">vamos</a> */}
                <PrincipalSection />
                <CarrouselCompanies imagesData={imagesData} home={true} />
                <TextBlocks />
                <SectorsCovered title={"Sectores cubiertos"} />
                <BuyBook rutaImagen={guideInfoDB.RutaImagen} />
                <EntitiesSubscription />
                <OurTeam />
            </main>
            <Footer />
        </>
    );
}

export default Home;
