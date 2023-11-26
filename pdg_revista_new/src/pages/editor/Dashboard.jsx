import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import "../../assets/css/pages/editor/dashboard.css";

/* Pages */
import UserManagement from "./UserManagement";
import NotificationsManagement from "./NotificationsManagement";
import EntitiesManagement from "./EntitiesManagement";
import SectionsManagement from "./SectionsManagement";
import MonitoringAnalysis from "./MonitoringAnalysis";
import Welcome from "./Welcome";

import { useAuth } from "../../context/AuthContext";
import WebSite from "./WebSite";
import WebSiteHome from "./WebSiteHome";
import WebSiteLogistics from "./WebSiteLogistics";
import HeaderManagement from "../../components/Header/HeaderManagement";
import EntityForm from "./entity/EntityForm";

function Dashboard() {
    const { user: userAuth } = useAuth();

    const [collapsed, setCollapsed] = useState(true);
    const User = {
        ID: "12345", // ID único del usuario
        CorreoElectronico: "usuario@ejemplo.com", // Correo electrónico del usuario
        Nombre: "Juan", // Primer nombre del usuario
        Apellido: "Valencia", // Apellido del usuario (para simplificar, lo hemos dejado como un solo campo, pero puedes dividirlo en ApellidoPaterno y ApellidoMaterno si lo prefieres)
        IsEditor: false, // Indica si el usuario es un editor
        IsPremium: true, // Indica si el usuario tiene una suscripción premium
        FechaRegistro: "2023-01-01", // Fecha de registro del usuario
        FechaUltimoAcceso: "2023-09-01", // Última fecha de acceso del usuario
        /* photoURL: ImgUser, */ // URL de la foto del perfil del usuario
    };

    const EditorPages = [
        /* {
          name: "Inicio",
          path: "/editor",
      }, */
        /* {
          name: "ViewUsers",
          path: "/dashboard",
      }, */
        /* {
          name: "Gestionar Empresas",
          path: "/manage-companies",
      },
      {
          name: "Publicar Notificaciones",
          path: "/publish-notifications",
      },
      {
          name: "Gestionar Contenido",
          path: "/manage-content",
      },
      {
          name: "Estadísticas",
          path: "/statistics",
      },*/
        /* {
            name: "Cerrar Sesión",
            path: "/logout",
        }, */
    ];

    console.log("userAuth", userAuth);
    return (
        <>
            <main id="main-dashboard" className="dashboard-container">
                <HeaderManagement isOpenSidebar={collapsed} setIsOpenSidebar={setCollapsed} />
                <Sidebar isOpenSidebar={collapsed} setIsOpenSidebar={setCollapsed} />
                <div className={`canvas ${collapsed ? "" : "full"}`}>
                    <Routes>
                        {/* <Route index element={<Welcome />} /> */}
                        <Route path="entities-management"  >
                            <Route index element={<EntitiesManagement />}/>
                            <Route path="registration" element={<EntityForm />} />
                        </Route>
                        <Route path="sections-management" element={<SectionsManagement />} />
                        <Route
                            path="notifications-management"
                            element={<NotificationsManagement />}
                        />
                        <Route path="user-management" element={<UserManagement />} />
                        <Route path="monitoring-analysis" element={<MonitoringAnalysis />} />
                        <Route path="web-site">
                            {/* <Route index element={<WebSiteHome />} /> */}{/*  <WebSite /> */}
                            <Route path="home" element={<WebSiteHome />} />
                            <Route path="logistics" element={<WebSiteLogistics />} />
                        </Route>
                    </Routes>
                </div>
            </main>
        </>
    );
}

export default Dashboard;
