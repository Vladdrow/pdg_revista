import React from "react";
import RegistrationEntity from "../../components/Modal/RegistrationEntity";

function NotificationsManagement() {
    return (
        <section id="show-sect-manag">
            <div className="header-section">
                <h2>Notificaciones</h2>
                {/* <button>
                        Exportar
                    </button> */}
                <button className="btn-new-user" /* onClick={handleRegistrationModal} */>
                    Nueva Sección
                </button>
            </div>
            <RegistrationEntity />

            {/* <h2>Test Register</h2>
            <TestRegister /> */}
        </section>
    );
}

export default NotificationsManagement;
