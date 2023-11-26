import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarSubsection = ({ items/* , onSelect  */}) => {
    const navigate = useNavigate();

    return (
        <ul className="subsection">
            {items.map((item, index) => (
                <a
                    key={index}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        /* onSelect(item.url); */
                        navigate(
                            `/auth/editor/dashboard/${item.url
                                .toLowerCase()
                                .replace(/ /g, "-")}`
                        );
                    }}
                >
                    <li>{item.title}</li>
                </a>
            ))}
        </ul>
    );
};

export default SidebarSubsection;
