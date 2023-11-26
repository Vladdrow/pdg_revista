// TextBlock.js
import React from "react";

function TextBlockInfo({ imgSrc, title, desc }) {
    return (
        <div className="text-block">
            <img src={imgSrc} alt="Descripción de la imagen" />
            <h3 className="txt-h-before">{title}</h3> {/* Añadido el h3 aquí */}
            <div className="txt-block-sectors">
                <h3 className="txt-h-after">{title}</h3>
                <p>{desc}</p>
                <a href="#">Explorar</a>
            </div>
        </div>
    );
}

export default TextBlockInfo;