import React from "react";
import "../../assets/css/components/Form/subscription_summary.css"
import ContactoEconomico from "../../assets/resources/logo-revista.png"

const SubscriptionSummary = () => {
    return (
        <div className="subscription-summary-container">
            <h2 className="subscription-summary-title">Resumen de tu pedido</h2>
            <div className="subscription-summary-card">
                <img
                    src={ContactoEconomico}
                    alt="Contacto Economico"
                    className="subscription-summary-image"
                />
                <h3>Suscripción premium (Ilimitado)</h3>
                <p>Más de 1000 Empresas, 15 secciones y muchas oportunidades te esperan.</p>
                <div className="subscription-summary-pricing">
                    <span className="subscription-summary-discount-price">100 BS/ilim.</span>
                    <span className="subscription-summary-normal-price">Normal 150 BS/ilim.</span>
                </div>
            </div>
            <div className="subscription-summary-total">
                {/* <p>Subtotal: 12 x 111 BS</p> */}
                <p className="subscription-summary-total-amount">Total 100 BS</p>
            </div>
            {/* <div className="subscription-summary-help">¿Necesitas ayuda con tu compra?</div> */}
        </div>
    );
};

export default SubscriptionSummary;
