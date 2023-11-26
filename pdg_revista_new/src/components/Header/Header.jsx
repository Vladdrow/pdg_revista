import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/components/Header/header.css";
import LogoLogistica from "../../assets/resources/logo-revista.png";
import LogoUser from "../../assets/resources/user1.svg";

const Header = ({
    Pages,
    User = null,
    isHome = false,
    showSections,
    setShowSections,
    disableScrollHide,
    route,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setVisible(lastScrollY > currentScrollY || currentScrollY < 10);
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        if (!disableScrollHide) {
            window.addEventListener("scroll", handleScroll, { passive: true });

            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [lastScrollY, disableScrollHide]);

    return (
        <div className={`header ${visible ? "" : "hidden"}`}>
            <div className="logo">
                <img src={LogoLogistica} alt="" className="logo-img" />
            </div>

            <div className={` nav-container ${isNavOpen ? "open" : ""}`}>
                {!isNavOpen && route && (
                    <a className="btn btn-outline-primary register-link" href={route.path}>
                        {route.name}
                    </a>
                )}
                {Pages && Pages.length > 0 && (
                    <nav className={`nav ${isNavOpen ? "open" : ""}`}>
                        {Pages.slice(0, User ? 3 : Pages.length).map((page) => (
                            // Asegúrate de que `page.name` es único; de lo contrario, busca una mejor clave.
                            <a
                                key={page.name}
                                href={page.path}
                                onClick={() => setShowSections(!showSections)} // Aquí inviertes el valor
                                className="btn nav-link"
                            >
                                {page.name}
                                {page.nameUrl === "sections" && (
                                    <div
                                        className={`sects-dropdown dropdown-arrow ${
                                            showSections ? "rotated" : ""
                                        }`}
                                    ></div>
                                )}
                            </a>
                        ))}
                    </nav>
                )}

                {User ? (
                    <div className="user-info" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <img
                            src={LogoUser} /* {User.PhotoURL} */
                            alt={`${User.Nombre} ${User.Apellido}`}
                            className="user-photo"
                            /* onClick={() => setIsDropdownOpen(!isDropdownOpen)} */
                        />
                        <div className="notification-count">2</div>
                        <div className="dropdown">
                            <button
                                className="dropbtn"
                                /* onClick={() => setIsDropdownOpen(!isDropdownOpen)} */
                            >
                                <p>
                                    {User.Nombre} {User.Apellido}
                                </p>
                                <div
                                    className={`dropdown-arrow ${isDropdownOpen ? "rotated" : ""}`}
                                ></div>
                                <div className={`dropdown-hamburger`}>
                                    <svg
                                        className="hamburger"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                                    </svg>
                                </div>
                            </button>
                            {isDropdownOpen && (
                                <div className="dropdown-content">
                                    <a href="/profile">Perfil</a>
                                    <a href="/profile">Notificaciones</a>
                                    <a href="/settings">Configuración</a>
                                    <a href="/logout">Cerrar sesión</a>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <button className="btn hamburger-home" onClick={() => setIsNavOpen(!isNavOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                    </button>
                )}
            </div>
            <div class="custom-shape-divider-bottom-1700503563">
                {/* <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"
                        class="shape-fill"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                        class="shape-fill"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        class="shape-fill"
                    ></path>
                </svg> */}
            </div>
        </div>
    );
};

export default Header;
