import React from "react";
import "../../assets/css/components/Layout/buy_book.css";

function BuyBook({ rutaImagen }) {
    return (
        <section id="buy-book">
            <div class="book-container">
                <div class="book-image">
                    <img src={rutaImagen} alt="Web Dev Guide" />
                </div>
                <div class="book-description">
                    <h2>¿Quieres adquirir el libro físico?</h2>
                    {/* Prefieres el libro impreso? */}
                    <p>Obtén la guía esencial para profesionales de la logística.</p>
                    <p>
                        Tanto en formato interactivo en línea como en una edición impresa detallada,
                        esta guía es tu recurso definitivo para navegar por el complejo mundo de la
                        logística.
                    </p>
                    <a
                        href="https://wa.me/59169206199?text=Hola%2C%20me%20gustar%C3%ADa%20adquirir%20el%20libro%20en%20f%C3%ADsico"
                        class="buy-button"
                        target="_blank"
                    >
                        Reserva por WhastsApp
                    </a>
                </div>
            </div>
        </section>
    );
}

export default BuyBook;
