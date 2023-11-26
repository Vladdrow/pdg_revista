import React, { useState, useEffect } from "react";
import DataTable from "../../components/List/DataTable";

import "../../assets/css/pages/editor/sections_management.css";
import { deleteSection, getSectionsData, newSection, updateSection } from "../../api/content.api";
import config from "../../../config";

import RegistrationSectionModal from "../../components/Modal/RegistrationSectionModal";
import EditSectionModal from "../../components/Modal/EditSectionModal";

import { useContent } from "../../context/ContentContext";
import Swal from "sweetalert2";
import { sections } from "./../../components/Sidebar/SidebarNav";
import { actionsTable } from "../../utils/ActionsTable";

function SectionsManagement() {
    const baseURL = config.contentPath;
    const { sections: sectionsContext, fillSection: fillSectionsContext } = useContent();

    const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [list, setList] = useState([]);

    const [previewImage, setPreviewImage] = useState(null);
    const [sectionName, setSectionName] = useState("");
    const [sectionDescription, setSectionDescription] = useState("");
    const [sectionImage, setSectionImage] = useState(null);

    /* EDICION */
    const [editSectionName, setEditSectionName] = useState("");
    const [editSectionDescription, setEditSectionDescription] = useState("");
    const [editSectionImage, setEditSectionImage] = useState(null);
    const [editPreviewImage, setEditPreviewImage] = useState(null);

    const [selectedSection, setSelectedSection] = useState(null);

    const [showDataGraphic, setShowDataGraphic] = useState(false);

    // Manejador para el cambio del checkbox
    const handleCheckboxChange = (event) => {
        setShowDataGraphic(event.target.checked);
    };
    /* Abrir-cerrar el modal */
    const handleRegistrationModal = () => {
        setRegistrationModalOpen(!isRegistrationModalOpen);
        setPreviewImage(null);
    };
    const openEditModal = (section) => {
        setEditSectionName(section.Nombre);
        setEditSectionDescription(section.Descripcion);
        setEditPreviewImage(section.RutaImagen); // Asume que RutaImagen es la URL completa de la imagen
        setEditSectionImage(null); // Si deseas cambiar la imagen, el usuario deberá seleccionar una nueva
        setSelectedSection(section);
        setEditModalOpen(true); // Abre el modal de edición
    };
    const closeEditModal = () => {
        setEditModalOpen(false);
        // Asegúrate de que también limpias los estados relacionados cuando cierras el modal.
        setSelectedSection(null);
        setEditSectionName("");
        setEditSectionDescription("");
        setEditPreviewImage("");
        setEditSectionImage(null);
    };
    const handleEdit = (section) => {
        
        if (openEditModal) {
            if (!section.RutaImagen.startsWith(baseURL)) {
                section.RutaImagen = `${baseURL}${section.RutaImagen}${section.NombreImagen}`;
            } else {
                console.log("Volviendo a concatenar a la rutaImagen");
            }
            openEditModal(section);
        }
        setEditPreviewImage(null);
    };

    const handleFormSubmit = async (e, { name, description, image }) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("fileType", "web-sections");
        if (image) {
            formData.append("image", image);
        }
        try {
            const response = await newSection(formData);
            if (response.data.success) {
                Swal.fire({
                    title: "¡Guardado!",
                    text: "La sección ha sido guardada con éxito.",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                setSectionName("");
                setSectionDescription("");
                setPreviewImage(null);
                setRegistrationModalOpen(false);
            }
            fetchData(); // Esta función debería recargar tus datos
        } catch (error) {
            // Si hay un problema, aquí capturamos el error
            Swal.fire({
                title: "¡Error!",
                text: "Error al guardar sección",
                icon: "error",
                confirmButtonText: "Ok",
            });
            console.error(
                "Error al guardar la sección:",
                error.response ? error.response.data : error
            );
        }
    };

    const handleEditFormSubmit = async (data) => {
        const { id, name, description, image } = data;

        const formData = new FormData();
        formData.append("id", id); // Asegúrate de que el 'id' se añada al FormData si el servidor lo espera.
        formData.append("name", name);
        formData.append("description", description);
        formData.append("fileType", "web-sections");
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await updateSection(formData);
            if (response.data.success) {
                Swal.fire({
                    title: "¡Guardado!",
                    text: "La sección ha sido actualizada con éxito.",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            }
            setEditModalOpen(false);
            fetchData();
        } catch (error) {
            Swal.fire({
                title: "¡Error!",
                text: "Error al actualizar sección",
                icon: "error",
                confirmButtonText: "Ok",
            });
            console.error("Error al actualizar la sección:", error);
        }
    };

    const fetchData = async () => {
        try {
            const sectionsData = await getSectionsData();
            fillSectionsContext(sectionsData);
            console.log(sectionsData)
            setList(
                sectionsData.map((section) => ({
                    ...section,
                    RutaImagen: `${baseURL}${section.RutaImagen}${section.NombreImagen}`,
                }))
            );
        } catch (error) {
            console.error("Hubo un error al obtener los datos:", error);
        }
    };
    const handleDelete = async (sect) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // El usuario confirmó la acción
                deleteSectionConfirmed(sect.ID);
            }
        });
    };

    const deleteSectionConfirmed = async (id) => {
        console.log("Deleting", id);
        try {
            await deleteSection(id);
            // Eliminar la sección de la lista en el estado después de una eliminación exitosa
            setList(list.filter((section) => section.ID !== id));
            Swal.fire("Eliminado!", "La sección ha sido eliminada.", "success");
        } catch (error) {
            console.error("Error al eliminar la sección:", error);
            Swal.fire("Error!", "No se pudo eliminar la sección.", "error");
            // Aquí manejar el error, como mostrar un mensaje al usuario
        }
    };
    useEffect(() => {
        fetchData();
        console.log("Sections:", list);
    }, []);

    const columns = [
        { header: "#", key: "ID" },
        { header: "Nombre", key: "Nombre" },
        { header: "Descripcion", key: "Descripcion" },
        /* { header: "URL", key: "UrlSeccion" }, */
        { header: "Entidades", key: "NumeroDeEntidades" },
        { header: "Acciones", key: "actions" },
    ];

    const actions = actionsTable(handleEdit, handleDelete);

    const management = true;
    return (
        <section id="show-sect-manag">
            <div className="header-section">
                <h2>Secciones</h2>
                {/* <button>
                        Exportar
                    </button> */}
                <button className="btn btn-primary btn-new-user" onClick={handleRegistrationModal}>
                    Nueva Sección
                </button>
            </div>

            <RegistrationSectionModal
                isOpen={isRegistrationModalOpen}
                onRequestClose={handleRegistrationModal}
                onFormSubmit={handleFormSubmit}
            />
            {selectedSection && (
                <EditSectionModal
                    isOpen={editModalOpen}
                    onRequestClose={closeEditModal}
                    section={selectedSection}
                    onFormSubmit={handleEditFormSubmit}
                />
            )}

            <div className="sections-list">
                {/* <div className="form-check form-switch btn-list-nav">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" for="flexSwitchCheckDefault">
                        Vista Grafica
                    </label>
                </div> */}

                {showDataGraphic ? (
                    <div className="body-sects-manag">
                        <div
                            id="text-blocks-section"
                            className={`log-ent ${management ? "management" : ""}`}
                        >
                            {list.map((section, index) => (
                                <div className="text-block">
                                    <img src={section.RutaImagen} alt="Descripción de la imagen" />
                                    <h3 className="txt-h-before">{section.Nombre}</h3>{" "}
                                    <div className="txt-block-sectors">
                                        <h3 className="txt-h-after">{section.Nombre}</h3>
                                        <p>{section.Descripcion}</p>
                                        <p>{section.NumeroDeEntidades} Entidades</p>
                                        <div className="actions-sect">
                                            <a
                                                className="btn btn-edt"
                                                href="#"
                                                onClick={() => handleEdit(section)}
                                            >
                                                Editar
                                            </a>
                                            <a
                                                className="btn btn-dlt"
                                                href="#"
                                                onClick={() => handleDelete(section)}
                                            >
                                                Eliminar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <DataTable data={list} columns={columns} actions={actions} />
                )}
            </div>
        </section>
    );
}

export default SectionsManagement;
