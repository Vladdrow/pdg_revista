import React from "react";
import "../../assets/css/components/Utility/loading_overlay.css"

function LoadingOverlay() {
    return (
        <div className="overlay">
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>
    );
}

export default LoadingOverlay;