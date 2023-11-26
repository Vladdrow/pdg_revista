import React, { useState } from "react";
import Modal from "react-modal";


Modal.setAppElement("#root");

import RegistrationEntity from "./RegistrationEntity";
import Swal from "sweetalert2";
import { Entidad } from "../../models/Entidad";

function RegistrationEntityModal({ isOpen, onRequestClose, entity }) {
    const [isFormDirty, setIsFormDirty] = useState(false);

    const handleFormChange = (changed) => {
        setIsFormDirty(changed);
    };

    const handleAttemptClose = () => {
        if (isFormDirty) {
            Swal.fire({
                title: "¿Está seguro?",
                text: "Se perderán los cambios no guardados si sale.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, salir",
                cancelButtonText: "No, quedarse",
            }).then((result) => {
                if (result.isConfirmed) {
                    onRequestClose();
                }
            });
        } else {
            onRequestClose();
        }
    };

    console.log("MIDDLE ENTITY: ", entity)
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleAttemptClose}
            contentLabel="Modal de Registro"
            className={{
                base: "modal-entity-register",
                afterOpen: "modal-entity-register-section--after-open",
                beforeClose: "modal-entity-register-section--before-close",
            }}
            overlayClassName={{
                base: "modal-overlay",
                afterOpen: "modal-overlay--after-open",
                beforeClose: "modal-overlay--before-close",
            }}
        >
            <div className="modal-body">
                <div className="header-modal">
                    <button type="button" className="close-modal" onClick={handleAttemptClose}>
                        X
                    </button>
                    <h2 className="mb-4"> {entity ? "Editando" : "Nueva Empresa"}</h2>
                </div>
                <div className="main-modal">
                    {entity ? (
                        <RegistrationEntity
                            onFormChange={handleFormChange}
                            onRequestClose={onRequestClose}
                            initialData={entity}
                        />
                    ) : (
                        <RegistrationEntity
                            onFormChange={handleFormChange}
                            onRequestClose={onRequestClose}
                            initialData={null}
                        />
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default RegistrationEntityModal;
