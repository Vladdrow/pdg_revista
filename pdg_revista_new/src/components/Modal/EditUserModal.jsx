import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Modal from "react-modal";

/* API */
import { updateUserData } from "../../api/update.api";
/* Components */
import { InputModal, InputModal2, SelectInput } from "../Form/InputModal";
import SelectField from "../Form/SelectField";
/* Utils */
import { convertToTimeZone } from "../../utils/timeUtils";

import Swal from "sweetalert2";

import "../../assets/css/components/Modal/edit_user.css";

Modal.setAppElement("#root");

function EditUserModal({ isOpen, onRequestClose, user }) {
    // Desestructuración de props para simplificar el acceso a las propiedades del usuario.
    const { ID, Nombre, Apellidos, CorreoElectronico, TipoUsuario, FechaRegistro, RutaImagen } =
        user || {};

    // Estados locales para cada campo
    const [id, setId] = useState(ID || "");
    const [name, setName] = useState(Nombre || "");
    const [lastName, setLastName] = useState(Apellidos || "");
    const [email, setEmail] = useState(CorreoElectronico || "");
    const [userType, setUserType] = useState(TipoUsuario || "");
    const [registrationDate, setRegistrationDate] = useState(FechaRegistro || "");
    const [urlImagen, setUrlImagen] = useState(RutaImagen || "");
    const convertedDate = useMemo(
        () => (FechaRegistro ? convertToTimeZone(FechaRegistro) : ""),
        [FechaRegistro]
    ); // Memoización de convertedDate

    const options = [
        { value: "Lector", label: "Lector" },
        { value: "Editor", label: "Administrativo" },
    ];
    // Estado para rastrear si se han realizado cambios en el formulario
    const [isDirty, setIsDirty] = useState(false);

    // useRef para mantener una referencia a los valores iniciales del formulario
    const initialFormValuesRef = useRef({
        id: ID || "",
        name: Nombre || "",
        lastName: Apellidos || "",
        email: CorreoElectronico || "",
        userType: TipoUsuario || "",
        urlImagen: RutaImagen || "",
        registrationDate: FechaRegistro ? convertToTimeZone(FechaRegistro) : "",
    });

    // Este useEffect se ejecutará cada vez que la propiedad 'user' cambie
    useEffect(() => {
        if (user) {
            setId(ID || "");
            setName(Nombre || "");
            setLastName(Apellidos || "");
            setEmail(CorreoElectronico || "");
            setUserType(TipoUsuario || "");
            setUrlImagen(RutaImagen || "");
            setRegistrationDate(convertedDate);
        }
        console.log(user);
    }, [user, ID, Nombre, Apellidos, CorreoElectronico, TipoUsuario, RutaImagen, convertedDate]);

    // Nuevo useEffect para rastrear cambios en los campos del formulario
    useEffect(() => {
        const initialValues = initialFormValuesRef.current;
        if (
            initialValues.id !== id ||
            initialValues.name !== name ||
            initialValues.lastName !== lastName ||
            initialValues.email !== email ||
            initialValues.userType !== userType ||
            initialValues.urlImagen !== urlImagen ||
            initialValues.registrationDate !== registrationDate
        ) {
            setIsDirty(true);
        } else {
            setIsDirty(false);
        }
    }, [id, name, lastName, email, userType, urlImagen, registrationDate]);

    // useCallback para memoizar handleRequestClose y evitar recalculaciones innecesarias.
    const handleRequestClose = useCallback(() => {
        if (isDirty) {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Hay cambios sin guardar. ¿Estás seguro de que desea cerrar sin guardar?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, cerrar",
                cancelButtonText: "No, cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    onRequestClose();
                }
            });
        } else {
            onRequestClose();
        }
    }, [isDirty, onRequestClose]);

    const handleSaveChanges = async () => {
        // Preparar los datos del formulario para enviar a la API
        const formData = {
            id: id,
            nombre: name,
            apellidos: lastName,
            correo: email,
            tipoDeUsuario: userType === "Administrativo" ? "1" : "2", // Convertir a formato aceptable para la base de datos
            // ... otros campos que quieras actualizar
        };

        try {
            // Llamar a la API para actualizar los datos del usuario
            const response = await updateUserData(formData);

            // Verificar si la actualización fue exitosa
            if (response && response.resultUsuario.affectedRows > 0) {
                Swal.fire({
                    title: "¡Actualizado!",
                    text: "Los datos del usuario han sido actualizados.",
                    icon: "success",
                });
                onRequestClose(); // Cerrar el modal si la actualización fue exitosa
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar los datos del usuario.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error al actualizar los datos del usuario:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar los datos del usuario.",
                icon: "error",
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleRequestClose} // Modificado para usar handleRequestClose
            contentLabel="Modal de Edición"
            className={{
                base: "modal-content-edit",
                afterOpen: "modal-content-edit--after-open",
                beforeClose: "modal-content-edit--before-close",
            }}
            overlayClassName={{
                base: "modal-overlay",
                afterOpen: "modal-overlay--after-open",
                beforeClose: "modal-overlay--before-close",
            }}
        >
            <button className="close-modal" onClick={handleRequestClose}>
                X
            </button>

            <h2 className="mb-4">Editar Usuario</h2>

            <form id="form-edit-user">
                <div className="box-inp row">
                    <div className="left-user">
                        <img src={urlImagen} width="150" height="150" alt={name} />
                    </div>
                    <div className="right-user">
                        <InputModal
                            label="ID"
                            type="text"
                            id="id-user"
                            name="id-user"
                            value={id}
                            readOnly
                        />
                        <InputModal
                            label="Nombre"
                            type="text"
                            id="name-user"
                            name="name-user"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <InputModal2
                    label="Apellidos"
                    type="text"
                    id="lastname-user"
                    name="lastname-user"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <InputModal2
                    label="Correo Electrónico"
                    type="text"
                    id="email-user"
                    name="email-user"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="box-inp row mb-5">
                    <SelectInput
                        label="Tipo de Usuario"
                        id="user-type"
                        name="user-type"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        options={options} // Asegúrate de que `options` sea un array de { value, label }
                    />
                    <InputModal2
                        label="Fecha de Registro"
                        type="text"
                        id="date-user"
                        name="date-user"
                        value={registrationDate}
                        readOnly
                    />
                </div>
                <button onClick={handleSaveChanges} className="btn-save-changes">
                    Guardar Cambios
                </button>
            </form>
        </Modal>
    );
}

export default EditUserModal;
