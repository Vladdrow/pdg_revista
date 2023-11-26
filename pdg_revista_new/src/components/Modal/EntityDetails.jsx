import React, { useState } from "react";
import { FavoriteStar } from "../Utility/SvgList";
import "../../assets/css/components/Modal/entity_details.css";

function EntityDetails({ entity, onClose, handleFavorite, isFavorite }) {
    if (!entity) return null;
    const [showCopyNotification, setShowCopyNotification] = useState(false);

    const copyToClipboard = (text) => {
        if (!navigator.clipboard) {
            console.error("Clipboard no disponible");
            return;
        }
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setShowCopyNotification(true);
                setTimeout(() => setShowCopyNotification(false), 2000);
                console.log("Copiado al portapapeles:", text);
            })
            .catch((err) => {
                console.error("Error al copiar al portapapeles:", err);
            });
    };

    const renderSucursal = (sucursal, index) => (
        <div className="sucursal-details" key={index}>
            <p>
                <strong>Dirección: </strong>
                {sucursal.address}
            </p>
            {sucursal.addressAdditionalInformation && (
                <p>
                    <strong>Información Adicional:</strong> {sucursal.addressAdditionalInformation}
                </p>
            )}
            <div className="contact-info">
                <strong>Teléfonos:</strong>
                {sucursal.phoneNumbers.map((phone, idx) => (
                    <span key={idx} onClick={() => copyToClipboard(phone)} className="clickable">
                        {phone}
                        {idx < sucursal.phoneNumbers.length - 1 ? ", " : ""}
                    </span>
                ))}
            </div>

            <div className="contact-info">
                <strong>Celulares:</strong>
                {sucursal.cellNumbers.map((cell, idx) => (
                    <span key={idx} onClick={() => copyToClipboard(cell)} className="clickable">
                        {cell}
                        {idx < sucursal.cellNumbers.length - 1 ? ", " : ""}
                    </span>
                ))}
            </div>

            <div className="contact-info">
                <strong>Correos:</strong>
                {sucursal.emails.map((email, idx) => (
                    <span key={idx} onClick={() => copyToClipboard(email)} className="clickable">
                        {email}
                        {idx < sucursal.emails.length - 1 ? ", " : ""}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="entity-details-content">
            <div className="entity-details-header">
                <h2 className="entity-details-title">{entity?.title}</h2>
                <button
                    className={`entity-favorite-btn ${isFavorite ? "active" : ""}`}
                    onClick={handleFavorite}
                >
                    <FavoriteStar />
                </button>
                {/* <button onClick={onClose} className="entity-details-close-btn">
                    &times;
                </button> */}
            </div>
            <div className="entity-branch">{entity.branches.map(renderSucursal)}</div>
            {showCopyNotification && (
                <div className="copy-notification">Texto copiado al portapapeles</div>
            )}
            <button onClick={onClose} className="btn entity-details-close-link">
                Cerrar
            </button>
        </div>
    );
}
export default EntityDetails;

/* {entity.sucursales.map(renderSucursal)} */
