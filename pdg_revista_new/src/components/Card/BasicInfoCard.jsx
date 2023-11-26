import React from "react";

import "../../assets/css/components/Card/section_card.css";
const BasicInfoCard = ({ title, description, toUrl, imgSrc, toDo }) => {
    return (
        <div className="service-card">
            <div className="card-image-container">
                <img src={imgSrc} alt={title} className="card-image" />
            </div>
            <h3>{title}</h3>
            <p className="service-description">{description}</p>
            <a href={toUrl} className="service-link">
                {toDo}
            </a>
        </div>
    );
};

export default BasicInfoCard;
