import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "../../assets/css/components/Card/entities.css";
import LogoPrueba from "../../assets/resources/institutions.jpg";
import Logo from "../../assets/resources/logo-revista.png";
import TeamMember from "./TeamMember";
import Modal from "react-modal";

import FavoriteIcon from "../Utility/FavoriteIcon";

Modal.setAppElement("#root");

const Entities = ({ Nombre, Sucursales = [], tipoMembresia = 1 }) => {
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalClosing, setModalClosing] = useState(false); // Estado para la animación de salida
    const [favoriteChecked, setFavoriteChecked] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalClosing(true); // Inicia la animación de salida
        setTimeout(() => {
            setModalIsOpen(false);
            setModalClosing(false); // Resetea el estado para la próxima apertura
        }, 300); // El timeout debe coincidir con la duración de tu animación
    };

    const setFavoriteEntity = () => {
        setFavoriteChecked(!favoriteChecked);
    };

    const toggleSucursales = useCallback(() => {
        setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    }, []);

    const handleItemClick = useCallback((item) => {
        copyToClipboard(item);
    }, []);

    const copyToClipboard = useCallback((text) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    setShowCopyMessage(true);
                    setTimeout(() => setShowCopyMessage(false), 2000);
                })
                .catch((err) => {
                    console.error("Error al copiar", err);
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                const successful = document.execCommand("copy");
                if (successful) {
                    setShowCopyMessage(true);
                    setTimeout(() => setShowCopyMessage(false), 2000);
                } else {
                    console.error("No se pudo copiar el texto");
                }
            } catch (err) {
                console.error("Error al copiar", err);
            }
            document.body.removeChild(textArea);
        }
    }, []);

    const srcPrueba = (
        <div className={`premium-icon-container ${tipoMembresia === 1 ? "silver" : "gold"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24">
                <path
                    stroke="#C0C0C0"
                    strokeWidth="1"
                    fill="#C0C0C0"
                    d="m9.675 13.7l.875-2.85L8.25 9h2.85l.9-2.8l.9 2.8h2.85l-2.325 1.85l.875 2.85l-2.3-1.775L9.675 13.7ZM6 23v-7.725q-.95-1.05-1.475-2.4T4 10q0-3.35 2.325-5.675T12 2q3.35 0 5.675 2.325T20 10q0 1.525-.525 2.875T18 15.275V23l-6-2l-6 2Zm6-7q2.5 0 4.25-1.75T18 10q0-2.5-1.75-4.25T12 4Q9.5 4 7.75 5.75T6 10q0 2.5 1.75 4.25T12 16Zm-4 4.025L12 19l4 1.025v-3.1q-.875.5-1.888.788T12 18q-1.1 0-2.113-.288T8 16.925v3.1Zm4-1.55Z"
                />
            </svg>
        </div>
    );

    const cantSucursales = Sucursales.length;
    const indicador = "<< ";
    const indicador2 = " >>";
    return (
        <>
            <article className="institucion">
                <div
                    className={`premium-icon-container ${tipoMembresia === 1 ? "silver" : "gold"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24">
                        <path
                            stroke="#C0C0C0"
                            strokeWidth="1"
                            fill="#C0C0C0"
                            d="m9.675 13.7l.875-2.85L8.25 9h2.85l.9-2.8l.9 2.8h2.85l-2.325 1.85l.875 2.85l-2.3-1.775L9.675 13.7ZM6 23v-7.725q-.95-1.05-1.475-2.4T4 10q0-3.35 2.325-5.675T12 2q3.35 0 5.675 2.325T20 10q0 1.525-.525 2.875T18 15.275V23l-6-2l-6 2Zm6-7q2.5 0 4.25-1.75T18 10q0-2.5-1.75-4.25T12 4Q9.5 4 7.75 5.75T6 10q0 2.5 1.75 4.25T12 16Zm-4 4.025L12 19l4 1.025v-3.1q-.875.5-1.888.788T12 18q-1.1 0-2.113-.288T8 16.925v3.1Zm4-1.55Z"
                        />
                    </svg>
                </div>
                {/* {tipoMembresia === 2 && <img src={Logo} alt="Logo de la institución" />} */}
                <div className="hd-card">
                    <div className="name-img-inst" onClick={openModal}>
                        <p id="name-inst">
                            {indicador}
                            {Nombre}
                            {indicador2}
                        </p>
                    </div>
                    {/* {cantSucursales > 0 && ( */}
                    <div className="cant-sucursales">
                        {cantSucursales === 1
                            ? cantSucursales + " Sucursal"
                            : cantSucursales + " Sucursales"}
                    </div>
                    {/* )} */}
                </div>

                <FavoriteIcon
                    favoriteChecked={favoriteChecked}
                    toggleFavorite={setFavoriteEntity}
                />
            </article>

            {modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Entity Details"
                    className={`Modal-entity ${modalClosing ? "modalOut" : ""}`}
                    overlayClassName="Overlay"
                >
                    <div className="modal-content-entity">
                        <div className="hd-modal-entity">
                            <button onClick={closeModal} className="close-button">
                                x
                            </button>
                            <h2>{Nombre}</h2>

                            <FavoriteIcon
                                favoriteChecked={favoriteChecked}
                                toggleFavorite={setFavoriteEntity}
                            />

                            {tipoMembresia === 2 && <img src={Logo} alt="Logo de la institución" />}
                        </div>
                        {Sucursales.map((sucursal, index) => (
                            <div className="sucursal-section" key={index}>
                                <div className="item-with-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 384 512"
                                    >
                                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                    </svg>
                                    <p>{sucursal.Direccion}</p>
                                </div>
                                {sucursal.Telefonos.map((telefono, telIndex) => (
                                    <div className="item-with-icon" key={`tel-${telIndex}`}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                        </svg>
                                        <p
                                            key={telIndex}
                                            onClick={() => handleItemClick(telefono)}
                                            className="with-underline"
                                        >
                                            {telefono}
                                        </p>
                                    </div>
                                ))}
                                {sucursal.Emails.map((email, emailIndex) => (
                                    <div className="item-with-icon" key={`email-${emailIndex}`}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                        </svg>
                                        <p
                                            key={emailIndex}
                                            onClick={() => handleItemClick(email)}
                                            className="with-underline"
                                        >
                                            {email}
                                        </p>
                                    </div>
                                ))}
                                {showCopyMessage && (
                                    <span className="success-copy">
                                        ¡Elemento copiado al portapapeles!
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
};

Entities.propTypes = {
    Nombre: PropTypes.string.isRequired,
    Sucursales: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            Direccion: PropTypes.string.isRequired,
            Telefonos: PropTypes.arrayOf(PropTypes.string).isRequired,
            Emails: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ),
    tipoMembresia: PropTypes.number,
};

export default Entities;
