import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

Modal.setAppElement("#root");
function RegistrationSectionModal({ isOpen, onRequestClose, onFormSubmit }) {
    const [sectionName, setSectionName] = useState("");
    const [sectionDescription, setSectionDescription] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [sectionImage, setSectionImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSectionImage(file);
        }
    };

    const handleCloseModal = () => {
        if (sectionName || sectionDescription || previewImage) {
            // Alerta de confirmación al intentar cerrar con cambios
            Swal.fire({
                title: "Tienes cambios sin guardar",
                text: "¿Quieres salir sin guardar estos cambios?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Salir sin guardar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Resetea los estados solo si el usuario confirma que quiere salir
                    setPreviewImage(null);
                    setSectionImage(null);
                    setSectionName("");
                    setSectionDescription("");
                    onRequestClose(); // Cierra el modal
                }
            });
        } else {
            // Si no hay cambios, simplemente cierra el modal
            onRequestClose();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(e, {
            name: sectionName,
            description: sectionDescription,
            image: sectionImage,
        });
        
        // Limpia el estado después de enviar el formulario
        setSectionName("");
        setSectionDescription("");
        setPreviewImage(null);
        onRequestClose(); // Cierra el modal
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Modal de Registro"
            className={{
                base: "modal-content-section",
                afterOpen: "modal-content-section--after-open",
                beforeClose: "modal-content-section--before-close",
            }}
            overlayClassName={{
                base: "modal-overlay",
                afterOpen: "modal-overlay--after-open",
                beforeClose: "modal-overlay--before-close",
            }}
        >
            <button type="button" className="close-modal" onClick={handleCloseModal}>
                X
            </button>
            <div className="modal-body">
                <h2 className="mb-5">Nueva Sección</h2>
                <form id="section-form">
                    <div className="input-group mb-3">
                        <label htmlFor="section-name" className="input-group-text">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="section-name"
                            name="sectionName"
                            placeholder="Ingresa el nombre de la sección"
                            value={sectionName}
                            onChange={(e) => setSectionName(e.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="section-description" className="input-group-text">
                        Descripción de la Sección
                    </label>
                    <div className="input-group mb-3">
                        <textarea
                            className="form-control"
                            id="section-description"
                            name="sectionDescription"
                            placeholder="Ingresa una descripción"
                            rows="3"
                            value={sectionDescription}
                            onChange={(e) => setSectionDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="input-group mb-3 with-img">
                        <label className="input-group-text" htmlFor="section-image">
                            Imagen
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-file"
                            id="section-image"
                            name="sectionImage"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleImageChange}
                        />
                    </div>
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Previsualización de la imagen"
                            className="img-preview mb-3"
                            style={{ maxWidth: "350px", maxHeight: "350px" }}
                        />
                    )}
                </form>
                <button className="btn btn-primary w-100" onClick={handleSubmit}>
                    Guardar Sección
                </button>
            </div>
        </Modal>
    );
}

export default RegistrationSectionModal;
