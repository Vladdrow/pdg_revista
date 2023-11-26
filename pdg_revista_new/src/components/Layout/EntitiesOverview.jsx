import React, { useState } from "react";
import "../../assets/css/components/Layout/entities_overview.css";
import Modal from "react-modal";

import EntityCard from "../Card/EntityCard";
import EntityDetails from "../Modal/EntityDetails";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

Modal.setAppElement("#root");
function EntitiesOverview({ color = null, reverse = false }) {
    const [favorites, setFavorites] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);

    const handleFavorite = (entityId) => {
        // Cambia el estado de favorito para la entidad específica usando su ID.
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [entityId]: !prevFavorites[entityId],
        }));
    };

    const openModal = (entity) => {
        setSelectedEntity(entity);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <section class={`success-sections ${color ? "blue" : ""}`}>
            <div class={`content-wrapper ${reverse ? "reverse-order" : ""}`}>
                <div class="main-content-sects">
                    <div class="content-header-sects">
                        <h2 class="title-sects">AGENCIAS DESPACHANTES DE ADUANA</h2>
                        <div class="underline-sects"></div>
                    </div>
                    <p class="description-sects">
                        Organizaciones especializadas en la representación de empresas en trámites
                        aduaneros, asegurando la correcta importación y exportación de mercancías
                        conforme a la legislación vigente.
                    </p>
                    <a href="#" className="service-link">
                        Explorar sección →
                    </a>
                </div>

                <div className="entities-container">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        navigation
                        spaceBetween={20}
                        slidesPerView={2}
                        loop={true} // Habilita el desplazamiento infinito
                        autoplay={{
                            delay: 5000, // Cambia cada 5 segundos
                            disableOnInteraction: false, // Continúa automáticamente después de la interacción del usuario
                        }}
                        speed={2000}
                        freeMode={true}
                        breakpoints={{
                            650: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            600: {
                                slidesPerView: 1,
                                spaceBetween: 6,
                            },
                            // Cuando el ancho de la ventana es <= 480px
                            580: {
                                slidesPerView: 1,
                                spaceBetween: 6,
                            },
                            380: {
                                slidesPerView: 1,
                                spaceBetween: 6,
                            },
                        }}
                    >
                        {entities.map((entity, index) => (
                            <SwiperSlide key={entity.id}>
                                <EntityCard
                                    id={entity.id}
                                    title={entity.title}
                                    countries={entity.countries}
                                    branchesNumber={entity.branchesNumber}
                                    favoritesMarkup={entity.favoritesMarkup}
                                    handleFavorite={handleFavorite}
                                    isFavorite={favorites[entity.id]}
                                    onDetailsClick={() => openModal(entity)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        navigation
                        spaceBetween={20}
                        slidesPerView={2}
                        loop={true} // Habilita el desplazamiento infinito
                        autoplay={{
                            delay: 5000, // Cambia cada 5 segundos
                            disableOnInteraction: false, // Continúa automáticamente después de la interacción del usuario
                        }}
                        speed={2000}
                        freeMode={true}
                        breakpoints={{
                            650: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            600: {
                                slidesPerView: 1,
                                spaceBetween: 6,
                            },
                            // Cuando el ancho de la ventana es <= 480px
                            580: {
                                slidesPerView: 1,
                                spaceBetween: 6,
                            },
                            380: {
                                slidesPerView: 1,
                                spaceBetween: 6,
                            },
                        }}
                    >
                        {newEntities.map((entity, index) => (
                            <SwiperSlide key={entity.id}>
                                <EntityCard
                                    id={entity.id}
                                    title={entity.title}
                                    countries={entity.countries}
                                    branchesNumber={entity.branchesNumber}
                                    favoritesMarkup={entity.favoritesMarkup}
                                    handleFavorite={handleFavorite}
                                    isFavorite={favorites[entity.id]}
                                    onDetailsClick={() => openModal(entity)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="entity-details-modal"
                    overlayClassName="entity-details-overlay"
                >
                    <EntityDetails
                        entity={selectedEntity}
                        onClose={closeModal}
                        handleFavorite={() => handleFavorite(selectedEntity?.id)}
                        isFavorite={favorites[selectedEntity?.id]}
                    />
                </Modal>
            </div>
        </section>
    );
}

const entities = [
    {
        id: 1,
        title: "BANCO GANADERO DE GUATEMALA SRL",
        countries: "Bolivia",
        branchesNumber: "2",
        favoritesMarkup: "190",
        branches: [
            {
                id: 11,
                address: "Dirección Sucursal 1",
                addressAdditionalInformation: "Piso 2, Oficina 3",
                cellNumbers: ["123", "456", "789"],
                phoneNumbers: ["101", "102", "103"],
                emails: ["email1@banco1.com", "email2@banco1.com", "email3@banco1.com"],
            },
            {
                id: 12,
                address: "Dirección Sucursal 2",
                addressAdditionalInformation: "Edificio A, Local 5",
                cellNumbers: ["321", "654", "987"],
                phoneNumbers: ["201", "202", "203"],
                emails: ["email4@banco1.com", "email5@banco1.com", "email6@banco1.com"],
            },
        ],
    },
    {
        id: 2,
        title: "BANCO GANADERO DE GUATEMALA SRL",
        countries: "País de Prueba",
        branchesNumber: "1",
        favoritesMarkup: "190",
        branches: [
            {
                id: 21,
                address: "Dirección Sucursal Única",
                addressAdditionalInformation: "Planta Baja",
                cellNumbers: ["111", "222", "333"],
                phoneNumbers: ["444", "555", "666"],
                emails: ["email1@banco2.com", "email2@banco2.com", "email3@banco2.com"],
            },
        ],
    },
    {
        id: 3,
        title: "BANCO GANADERO DE GUATEMALA SRL",
        countries: "País de Prueba",
        branchesNumber: "2",
        favoritesMarkup: "190",
        branches: [
            {
                id: 31,
                address: "Dirección Sucursal 1",
                addressAdditionalInformation: "Piso 3, Oficina 2",
                cellNumbers: ["777", "888", "999"],
                phoneNumbers: ["000", "111", "222"],
                emails: ["email1@banco3.com", "email2@banco3.com", "email3@banco3.com"],
            },
            {
                id: 32,
                address: "Dirección Sucursal 2",
                addressAdditionalInformation: "Local 7",
                cellNumbers: ["333", "444", "555"],
                phoneNumbers: ["666", "777", "888"],
                emails: ["email4@banco3.com", "email5@banco3.com", "email6@banco3.com"],
            },
        ],
    },
    {
        id: 4,
        title: "BANCO GANADERO DE GUATEMALA SRL",
        countries: "País de Prueba",
        branchesNumber: "3",
        favoritesMarkup: "190",
        branches: [
            {
                id: 41,
                address: "Dirección Sucursal 1",
                addressAdditionalInformation: "Piso 1, Oficina 5",
                cellNumbers: ["010", "020", "030"],
                phoneNumbers: ["040", "050", "060"],
                emails: ["email1@banco4.com", "email2@banco4.com", "email3@banco4.com"],
            },
            {
                id: 42,
                address: "Dirección Sucursal 2",
                addressAdditionalInformation: "Edificio B",
                cellNumbers: ["070", "080", "090"],
                phoneNumbers: ["100", "110", "120"],
                emails: ["email4@banco4.com", "email5@banco4.com", "email6@banco4.com"],
            },
            {
                id: 43,
                address: "Dirección Sucursal 3",
                addressAdditionalInformation: "Piso 4, Oficina 1",
                cellNumbers: ["130", "140", "150"],
                phoneNumbers: ["160", "170", "180"],
                emails: ["email7@banco4.com", "email8@banco4.com", "email9@banco4.com"],
            },
        ],
    },
    /* {
        id: 5,
        title: "Banco de Prueba 4",
        countries: "País de Prueba",
        branchesNumber: "3",
        favoritesMarkup: "190",
        branches: [
            {
                id: 51,
                address: "Dirección Sucursal 1",
                addressAdditionalInformation: "Piso 1, Oficina 5",
                cellNumbers: ["010", "020", "030"],
                phoneNumbers: ["040", "050", "060"],
                emails: ["email1@banco4.com", "email2@banco4.com", "email3@banco4.com"],
            },
            {
                id: 52,
                address: "Dirección Sucursal 2",
                addressAdditionalInformation: "Edificio B",
                cellNumbers: ["070", "080", "090"],
                phoneNumbers: ["100", "110", "120"],
                emails: ["email4@banco4.com", "email5@banco4.com", "email6@banco4.com"],
            },
            {
                id: 53,
                address: "Dirección Sucursal 3",
                addressAdditionalInformation: "Piso 4, Oficina 1",
                cellNumbers: ["130", "140", "150"],
                phoneNumbers: ["160", "170", "180"],
                emails: ["email7@banco4.com", "email8@banco4.com", "email9@banco4.com"],
            },
        ],
    }, */
];

const newEntities = [
    {
        id: 5,
        title: "BANCO NACIONAL DE MÉXICO",
        countries: "México",
        branchesNumber: "3",
        favoritesMarkup: "220",
        branches: [
            {
                id: 51,
                address: "Dirección Sucursal 1",
                addressAdditionalInformation: "Piso 2, Oficina 5",
                cellNumbers: ["555 1111111", "555 2222222", "555 3333333"],
                phoneNumbers: ["111 4444444", "111 5555555", "111 6666666"],
                emails: ["email1@banco5.com", "email2@banco5.com", "email3@banco5.com"],
            },
            {
                id: 52,
                address: "Dirección Sucursal 2",
                addressAdditionalInformation: "Local 7",
                cellNumbers: ["444 7777777", "444 8888888", "444 9999999"],
                phoneNumbers: ["777 1111111", "777 2222222", "777 3333333"],
                emails: ["email4@banco5.com", "email5@banco5.com", "email6@banco5.com"],
            },
            {
                id: 53,
                address: "Dirección Sucursal 3",
                addressAdditionalInformation: "Piso 1, Oficina 3",
                cellNumbers: ["111 1234567", "111 2345678", "111 3456789"],
                phoneNumbers: ["444 9876543", "444 8765432", "444 7654321"],
                emails: ["email7@banco5.com", "email8@banco5.com", "email9@banco5.com"],
            },
        ],
    },
    {
        id: 6,
        title: "BANCO CENTRAL DE ESPAÑA",
        countries: "España",
        branchesNumber: "2",
        favoritesMarkup: "180",
        branches: [
            {
                id: 61,
                address: "Dirección Sucursal 1",
                addressAdditionalInformation: "Planta Baja",
                cellNumbers: ["123 1111111", "123 2222222", "123 3333333"],
                phoneNumbers: ["456 4444444", "456 5555555", "456 6666666"],
                emails: ["email1@banco6.com", "email2@banco6.com", "email3@banco6.com"],
            },
            {
                id: 62,
                address: "Dirección Sucursal 2",
                addressAdditionalInformation: "Edificio C, Local 5",
                cellNumbers: ["789 7777777", "789 8888888", "789 9999999"],
                phoneNumbers: ["123 1111111", "123 2222222", "123 3333333"],
                emails: ["email4@banco6.com", "email5@banco6.com", "email6@banco6.com"],
            },
        ],
    },
    {
        id: 7,
        title: "BANCO NACIONAL DE ARGENTINA",
        countries: "Argentina",
        branchesNumber: "1",
        favoritesMarkup: "150",
        branches: [
            {
                id: 71,
                address: "Dirección Sucursal Única",
                addressAdditionalInformation: "Planta Baja",
                cellNumbers: ["111 1111111", "111 2222222", "111 3333333"],
                phoneNumbers: ["444 4444444", "444 5555555", "444 6666666"],
                emails: ["email1@banco7.com", "email2@banco7.com", "email3@banco7.com"],
            },
        ],
    },
];

export default EntitiesOverview;
