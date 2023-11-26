import React from "react";
import "../../assets/css/components/List/list_navigation.css"

function ListNavigation({ currentPage, setCurrentPage, List }) {
    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="btn-list-nav">
            <button className="btn btn-link" onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
                Anterior
            </button>
            <span>Página {currentPage}</span>
            <button className="btn btn-link" onClick={handleNextPage} disabled={List.length < 30}>
                Siguiente
            </button>
        </div>
    );
}

export default ListNavigation;
