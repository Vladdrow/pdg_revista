import React, { useState, useEffect } from "react";

import "../../assets/css/components/Card/slider_companies.css";

const SliderCompanies = ({ images }) => {
    const RowLeft = "<";
    const RowRight = ">";
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        images.forEach((image) => {
            const img = new Image();
            img.src = image.RutaArchivo;
        });
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="carousel">
            <div className="carousel-inter">
                <button className="carousel-button prev" onClick={prevSlide}>
                    {/* <img src={RowLeft} alt="Previous slide" /> */}
                    {RowLeft}
                </button>
                {images.map((image, index) => (
                    <a
                        key={index}
                        href={image.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`carousel-slide ${
                            index === currentIndex ? "active" : "inactive"
                        }`}
                        style={{
                            backgroundImage: `url(${image.RutaArchivo})`,
                            /* transition: "opacity 1s ease-in-out", // Añadido transición de opacidad
                            opacity: index === currentIndex ? 1 : 0, // Añadido opacidad */
                        }}
                    ></a>
                ))}
                <button className="carousel-button next" onClick={nextSlide}>
                    {/* <img src={RowRight} alt="Next slide" /> */}
                    {RowRight}
                </button>
            </div>
            {/* <CarouselDots
                items={images}
                activeIndex={currentIndex}
                setActiveIndex={setCurrentIndex}
            /> */}
        </div>
    );
};

export default SliderCompanies;
