import React, { useState } from "react";
import SidebarSection from "./SidebarSection";
import "../../assets/css/components/Sidebar/sidebar.css";
import { sections } from "./SidebarNav";
import LogoUser from "../../assets/resources/user1.svg";

import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Sidebar({ isOpenSidebar, setIsOpenSidebar }) {
    const { user: userAuth } = useAuth();
    const [isOpen, setIsOpen] = useState(true);
    const [expandedSection, setExpandedSection] = useState(null);
    const [activeSection, setActiveSection] = useState(null);

    // Función para cambiar el estado de isOpen
    const toggleSidebar = () => {
        /* setIsOpen(!isOpen); */
        setIsOpenSidebar(!isOpenSidebar);
    };

    const handleSectionClick = (sectionTitle) => {
        setActiveSection(sectionTitle);
        // Otras acciones, como cambiar el estado de expansión si es necesario
        /* toggleSection(sectionTitle); */
    };

    // Función para cambiar la sección expandida
    const toggleSection = (sectionTitle) => {
        setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
    };
    return (
        <div className={`sidebar ${isOpenSidebar ? "open" : "collapsed"}`}>
            {/* Botón para alternar la barra lateral */}
            {/* <button onClick={toggleSidebar}>{isOpen ? "Collapse" : "Expand"}</button> */}
            <button className="toggle-btn" onClick={toggleSidebar}>
                {/* {isOpen ? "<Colapsar SVG o texto>" : "<Expandir SVG o texto>"} */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path fill="#000000" d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z" />
                </svg>
                {isOpenSidebar && <span>Cerrar menú</span>}
            </button>
            <div className="menu-items">
                {sections.map((section) => (
                    <div
                        key={section.title}
                        className={`menu-section ${
                            expandedSection === section.title ? "expanded" : ""
                        }`}
                    >
                        <div
                            className={`menu-item ${
                                activeSection === section.title ? "active" : ""
                            }`}
                            onClick={() => handleSectionClick(section.title)} // Manejar clic aquí
                            data-title={isOpenSidebar ? "" : section.title}
                        >
                            <Link to={section.url} className={`item ${isOpenSidebar ? "" : "icon-only"}`}>
                                {section.icon}
                                {isOpenSidebar && <span className="tooltip-text">{section.title}</span>}
                            </Link>
                            {section.items && section.items.length > 0 && isOpenSidebar && (
                                <button
                                    onClick={() => toggleSection(section.title)}
                                    className="expand-btn"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            fill="none"
                                            stroke="#000000"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="4"
                                            d="M36 18L24 30L12 18"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="submenu">
                            {section.items &&
                                section.items.map((item) => (
                                    <Link key={item.title} to={item.url} className="subitem">
                                        {item.title}
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="profile">
                <div className={`admin-user ${!isOpenSidebar ? "collapsed" : ""}`}>
                    <div className={`img-admin-user ${!isOpenSidebar ? "collapsed" : ""}`}>
                        <img src={userAuth.rutaImagen} alt="" />
                    </div>
                    <div className={`info-admin-user ${!isOpenSidebar ? "collapsed" : ""}`}>
                        <p className="name-user">
                            {userAuth.nombre} {userAuth.apellidoPaterno}
                            <p>{userAuth.isEditor && "Administrativo"}</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
