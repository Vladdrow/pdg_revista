import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
function EditSectionModal({ isOpen, onRequestClose, section, onFormSubmit }) {
    const [editSectionName, setEditSectionName] = useState("");
    const [editSectionDescription, setEditSectionDescription] = useState("");
    const [editPreviewImage, setEditPreviewImage] = useState("");
    const [editSectionImage, setEditSectionImage] = useState(null);

    useEffect(() => {
        if (section) {
            setEditSectionName(section.Nombre);
            setEditSectionDescription(section.Descripcion);
            setEditPreviewImage(section.RutaImagen);
        }
        console.log("SECTION SELECT: ", section);
    }, [section]);

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        setEditSectionImage(file);
        console.log("FILE", file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onFormSubmit) {
            onFormSubmit({
                id: section.ID,
                name: editSectionName,
                description: editSectionDescription,
                image: editSectionImage,
            });
        }
        setEditSectionName("");
        setEditSectionDescription("");
        setEditPreviewImage("");
        setEditSectionImage(null);
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal de Edición"
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
            <button className="close-modal" onClick={onRequestClose}>
                X
            </button>
            <div className="modal-body">
                <h2 className="mb-4">Editar Sección</h2>
                <form id="section-form">
                    <div className="input-group mb-3">
                        <label htmlFor="edit-section-name" className="input-group-text">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="edit-section-name"
                            name="editSectionName"
                            placeholder="Ingresa el nombre de la sección"
                            value={editSectionName}
                            onChange={(e) => setEditSectionName(e.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="edit-section-description" className="input-group-text">
                        Descripción de la Sección
                    </label>
                    <div className="input-group mb-3">
                        <textarea
                            className="form-control"
                            id="edit-section-description"
                            name="editSectionDescription"
                            placeholder="Ingresa una descripción"
                            rows="3"
                            value={editSectionDescription}
                            onChange={(e) => setEditSectionDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="input-group mb-3 with-img">
                        <label className="input-group-text" htmlFor="edit-section-image">
                            Imagen
                        </label>
                        <input
                            type="file"
                            className="form-control form-control-file"
                            id="edit-section-image"
                            name="editSectionImage"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleEditImageChange}
                        />
                    </div>
                    {editPreviewImage && (
                        <img
                            src={editPreviewImage}
                            alt="Previsualización de la imagen"
                            className="img-preview mb-3"
                            style={{ maxWidth: "300px", maxHeight: "300px" }}
                        />
                    )}
                </form>
                <button className="btn btn-primary w-100" onClick={handleSubmit}>
                    Actualizar Sección
                </button>
            </div>
        </Modal>
    );
}

export default EditSectionModal;
