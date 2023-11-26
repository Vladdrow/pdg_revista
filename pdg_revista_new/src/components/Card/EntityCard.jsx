import React from "react";
import { BranchIcon, FavoriteIcon, WorldIcon } from "../Utility/SvgList";

function EntityCard({
    id,
    title,
    countries,
    branchesNumber,
    favoritesMarkup,
    handleFavorite,
    isFavorite,
    onDetailsClick,
}) {
    return (
        <div className="entity">
            <div className="entity-header">
                <h3 className="entity-title">{title}</h3>

                <button
                    className={`entity-favorite-btn ${isFavorite ? "active" : ""}`}
                    onClick={() => handleFavorite(id)} // Pasa el ID de la entidad al hacer clic
                >
                    <svg
                        className="favorite-star"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 .587l3.515 7.113 7.485 1.084-5.421 5.276 1.281 7.467-6.86-3.607-6.86 3.607 1.281-7.467-5.421-5.276 7.485-1.084z" />
                    </svg>
                </button>
            </div>
            <div className="entity-statistics">
                <span className="entity-statistic">
                    <WorldIcon /> {countries}
                </span>
                <span className="entity-statistic">
                    <BranchIcon /> {branchesNumber} {branchesNumber > 1 ? "Sucursales" : "Sucursal"}
                </span>
                <span className="entity-statistic">
                    <FavoriteIcon /> {favoritesMarkup} Favorito
                </span>
                <div className="entity-details-link-container">
                    <a
                        className="service-link entity-details-link"
                        onClick={onDetailsClick}
                    >
                        Más detalles
                    </a>
                </div>
            </div>
        </div>
    );
}

export default EntityCard;
