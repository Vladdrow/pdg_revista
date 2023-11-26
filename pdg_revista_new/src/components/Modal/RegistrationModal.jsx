// RegistrationModal.js

import React, { useState } from "react";
import Modal from "react-modal";

import InputField from "../Form/InputField";
import Register from "../../pages/public/Register.jsx";


    
Modal.setAppElement("#root"); // Esto es para la accesibilidad
function RegistrationModal({ isOpen, onRequestClose }) {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal de Registro"
            className={{
                base: 'modal-content-register',
                afterOpen: 'modal-content-register--after-open',
                beforeClose: 'modal-content-register--before-close',
            }}
            overlayClassName={{
                base: 'modal-overlay',
                afterOpen: 'modal-overlay--after-open',
                beforeClose: 'modal-overlay--before-close',
            }}
        >
            <button className="close-modal" onClick={onRequestClose}>
                X
            </button>
            <Register onRequestClose={onRequestClose} />
        </Modal>
    );
}

export default RegistrationModal;
