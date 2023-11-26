import React from "react";

import "../../assets/css/components/Card/carrousel_dots.css"

function CarrouselDots({ items, activeIndex, setActiveIndex }) {
    return (
        <div className="carousel-dots">
            {items.map((_, idx) => (
                <span
                    key={idx}
                    className={`dot ${idx === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(idx)}
                ></span>
            ))}
        </div>
    );
}

export default CarrouselDots;