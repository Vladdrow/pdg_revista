import React from "react";
import { Outlet } from "react-router-dom";


function WebSite() {
    return (
        <section id="web-site-edit">
            <div className="header-section">
                <h2>Sitio Web</h2>
                {/* <button>
                    Exportar
                </button> */}
                <button className="btn-new-user" onClick={() => setRegistrationModalOpen(true)}>
                    Nueva Entidad
                </button>
            </div>
            <section>
                hello
            </section>
            {/* <LogisticsEntities /> */}
            {/* <Outlet /> */}
        </section>
    );
}

export default WebSite;
