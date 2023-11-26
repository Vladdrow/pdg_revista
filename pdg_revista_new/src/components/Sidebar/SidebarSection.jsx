import React, { useState, useRef, useEffect } from "react";
import SidebarSubsection from "./SidebarSubsection";

import { useNavigate } from "react-router-dom";

const SidebarSection = ({ title, url, items, icon, onCollapsed, isSelected, onSectionSelect }) => {
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const [urlPush, setUrlPush] = useState();

    const [maxHeight, setMaxHeight] = useState(0); // Para almacenar la altura
    const subsectionRef = useRef(null); // Referencia al elemento

    const handleSectionClick = () => {
        setIsVisible(!isVisible);
        /* onSelect(url); */
        console.log(url);
        onSectionSelect();
        navigate(url);
    };

    useEffect(() => {
        if (subsectionRef.current) {
            setMaxHeight(subsectionRef.current.scrollHeight);
        }
    }, [items]);

    return (
        <section className={`section ${isSelected ? "selected" : ""}`}>
            <div className="section-header">
                <div
                    className={`link-div-sect ${onCollapsed ? "only-icon" : ""}`}
                    onClick={handleSectionClick}
                >
                    <div className={`left-group`}>
                        {icon}
                        <p
                            className={`sect-name ${onCollapsed ? "hidden" : ""}`}
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {title}
                        </p>
                    </div>

                    {items && !onCollapsed && (
                        <button onClick={() => setIsVisible(!isVisible)}>
                            <svg
                                className={`arrow ${isVisible ? "rotated" : ""}`}
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                            >
                                <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            {items && (
                <>
                    <div
                        className={`subsection ${isVisible ? "visible" : ""}`}
                        style={{
                            maxHeight: isVisible ? `${maxHeight}px` : "0px",
                        }}
                        ref={subsectionRef}
                    >
                        <SidebarSubsection items={items} /* onSelect={onSelect} */ />
                    </div>
                </>
            )}
        </section>
    );
};

export default SidebarSection;
