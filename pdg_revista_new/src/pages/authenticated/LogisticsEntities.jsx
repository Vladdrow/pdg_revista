import React, { useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Engranaje from "../../assets/resources/engranaje.png";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../assets/css/pages/authenticated/logistics_entities.css";
import SectorsCovered from "../../components/Layout/SectorsCovered";
/* import User from "./../../models/User"; */
import SectionsList from "../../components/List/SectionsList";
import Entities from "../../components/Card/Entities";

import LogoPrueba from "../../assets/resources/logos/img2.png";
import LogoPrueba2 from "../../assets/resources/logos/img1.png";

import { entities } from "../../utils/EntitiesArray";
import CarrouselCompanies from "../../components/Card/CarrouselCompanies";
import SliderCompanies from "../../components/Card/SliderCompanies";
import TextBlockInfo from "../../components/Card/TextBlockInfo";

import GooglePayButton from "@google-pay/button-react";
import LogoVer from "../../assets/resources/transporte.jpg";
import EntitiesOverview from "../../components/Layout/EntitiesOverview";


function LogisticsEntities() {
    const [collapsed, setCollapsed] = useState(false); //Manejar el sidebar
    const [showSections, setShowSections] = useState(false);
    const User = {
        ID: "12345", // ID único del usuario
        CorreoElectronico: "usuario@ejemplo.com", // Correo electrónico del usuario
        Nombre: "Juan", // Primer nombre del usuario
        Apellido: "Valencia", // Apellido del usuario (para simplificar, lo hemos dejado como un solo campo, pero puedes dividirlo en ApellidoPaterno y ApellidoMaterno si lo prefieres)
        IsEditor: false, // Indica si el usuario es un editor
        IsPremium: true, // Indica si el usuario tiene una suscripción premium
        FechaRegistro: "2023-01-01", // Fecha de registro del usuario
        FechaUltimoAcceso: "2023-09-01", // Última fecha de acceso del usuario
        /* photoURL: ImgUser, */ // URL de la foto del perfil del usuario
    };

    const LoggedInUserPages = [
        {
            name: "Secciones",
            nameUrl: "sections",
        },
        {
            name: "Suscribirse",
            nameUrl: "subscribe",
            path: "subscription",
        },
        /*{
            name: "Notificaciones",
            nameUrl: "notifications",
            path: "/notifications",
        }, */
        /* {
            name: "Perfil",
            path: "/profile",
        },
        {
            name: "Cerrar Sesión",
            path: "/logout",
        }, */
    ];
    const sections = [
        { name: "Agencias Despachantes de Aduana", path: "/customs-broker-agencies" },
        { name: "Almacenes y Archivos", path: "/warehouses-and-archives" },
        { name: "Banca", path: "/banking" },
        { name: "Consolidador o Desconsolidador", path: "/consolidator-or-deconsolidator" },
        { name: "Freight Forwarders", path: "/freight-forwarders" },
        { name: "Instituciones", path: "/institutions" },
        { name: "Lineas Aereas", path: "/airlines" },
        { name: "Lineas navieras", path: "/shipping-lines" },
        { name: "Operadores Logisticos", path: "/logistic-operators" },
        { name: "Puertos", path: "/ports" },
        { name: "Proveedores de Servicios y Productos", path: "/service-and-product-providers" },
        { name: "Seguros", path: "/insurance" },
        { name: "Transportes Frigotermicos", path: "/refrigerated-transport" },
        { name: "Transportadoras", path: "/carriers" },
        { name: "Directorio Zona Libre de Colon", path: "/colon-free-zone-directory" },
    ];
    /* const imageData = [
        {
            link: "http://www.facebook.com",
            RutaArchivo: LogoPrueba,
        },
        {
            link: "http://www.youtube.com",
            RutaArchivo: LogoPrueba2,
        },
        {
            link: "http://www.instagram.com",
            RutaArchivo: LogoPrueba,
        },
    ]; */

    const imagesData = [
        { src: LogoVer, url: "https://ejemplo1.com", name: "Nombre1", desc: "Descripcion1" },
        { src: LogoVer, url: "https://ejemplo2.com", name: "Nombre2", desc: "Descripcion2" },
        { src: LogoVer, url: "https://ejemplo3.com", name: "Nombre3", desc: "Descripcion3" },
        { src: LogoVer, url: "https://ejemplo4.com", name: "Nombre4", desc: "Descripcion4" },
    ];
    const [favoriteMarkup, setFavoriteMarkup] = useState(false);
    const handleFavorite = () => {
        setFavoriteMarkup(!favoriteMarkup);
    };
    const auth = true;
    return (
        <>
            <Header
                Pages={LoggedInUserPages}
                User={User}
                showSections={showSections}
                setShowSections={setShowSections}
            />
            <main id="main-logistics-entities">
            <a href="subscription">GOGOGOGO</a>
                <EntitiesOverview />
                <SectorsCovered color="blue" title={"Destacados"} />
                <EntitiesOverview reverse={true} />
                <EntitiesOverview />
                {/* <SectorsCovered color="blue" title={""}/> */}
                <CarrouselCompanies imagesData={imagesData} title="Otros destacados" />
                <EntitiesOverview reverse={true} />
            </main>
            <Footer />
        </>
    );
}

export default LogisticsEntities;

/* <GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        allowedPaymentMethods: [
                            {
                                type: "CARD",
                                parameters: {
                                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                                },
                                tokenizationSpecification: {
                                    type: "PAYMENT_GATEWAY",
                                    parameters: {
                                        gateway: "example",
                                        gatewayMerchantId: "exampleGatewayMerchantId",
                                    },
                                },
                            },
                        ],
                        merchantInfo: {
                            merchantId: "12345678901234567890",
                            merchantName: "Demo Merchant",
                        },
                        transactionInfo: {
                            totalPriceStatus: "FINAL",
                            totalPriceLabel: "Total",
                            totalPrice: "100.00",
                            currencyCode: "USD",
                            countryCode: "US",
                        },
                    }}
                    onLoadPaymentData={(paymentRequest) => {
                        console.log("load payment data", paymentRequest);
                    }}
                /> */

/* const paymentRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
            {
                type: "CARD",
                parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                        // Configuración específica de tu pasarela de pago
                        gateway: "exampleGateway",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                },
            },
        ],
        merchantInfo: {
            merchantId: "1234567890",
            merchantName: "Nombre del comerciante",
        },
        transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: "1.00",
            currencyCode: "USD",
            countryCode: "US",
        },
    }; */
