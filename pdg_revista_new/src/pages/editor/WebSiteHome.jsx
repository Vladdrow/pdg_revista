import React from "react";
import LogisticsEntities from "../authenticated/LogisticsEntities";

import "../../assets/css/pages/editor/web_site_edit_home.css";

function WebSiteHome() {
    return (
        <section id="web-site-edit-home">
            <div className="header-section">
                <h2>Sitio Web Home</h2>
                {/* <button>
                    Exportar
                </button> */}
                <button className="btn-new-user">
                    Nueva Entidad
                </button>
            </div>
            
            {/* <LogisticsEntities /> */}
        </section>
    );
}

export default WebSiteHome;