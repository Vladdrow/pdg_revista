import { useState } from "react";
import RegistrationEntity from "../../../components/Modal/RegistrationEntity";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/pages/editor/entity_form.css";

import Swal from "sweetalert2";

function EntityForm({ /* onRequestClose,  */ entity = null }) {
    const [isFormDirty, setIsFormDirty] = useState(false);
    const navigate = useNavigate();

    const handleFormChange = (changed) => {
        console.log("CHANGED:", changed);
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
                    navigate("/dashboard/entities-management");
                }
            });
        } else {
            navigate("/dashboard/entities-management");
        }
    };
    const prev = "<";
    return (
        <main id="registration-entity">
            <button type="button" onClick={handleAttemptClose} className="btn btn-outline-primary">
                {prev}
            </button>
            <div className="header-reg-entity">
                <h2 className="mb-4"> {entity ? "Editando" : "Nueva Empresa"}</h2>
            </div>
            <div className="main-reg-entity">
                {entity ? (
                    <RegistrationEntity onFormChange={handleFormChange} initialData={entity} />
                ) : (
                    <RegistrationEntity onFormChange={handleFormChange} initialData={null} />
                )}
            </div>
        </main>
    );
}

export default EntityForm;
