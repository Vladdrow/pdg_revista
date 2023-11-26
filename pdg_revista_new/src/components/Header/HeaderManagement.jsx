import React from "react";
import "../../assets/css/components/Header/header_management.css";

function HeaderManagement({ isOpenSidebar, setIsOpenSidebar }) {
    const toggleSidebar = () => {
        /* setIsOpen(!isOpen); */
        setIsOpenSidebar(!isOpenSidebar);
    };
    return (
        <header id="hd-management">
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
                {/* {isOpen && <span>Cerrar menú</span>} */}
            </button>
        </header>
    );
}

export default HeaderManagement;
