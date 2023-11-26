import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { buySubscription } from "../../api/auth.api";
import "../../assets/css/components/Form/buy_subscription.css";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SubscriptionForm = () => {
    const { user: userAuth } = useAuth();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const paymentDetails = {
                id: paymentMethod.id,
                amount: 10000, // Ejemplo de cantidad
                userId: userAuth.id, // Aquí se añade el ID del usuario
            };
                    
            try {
                const result = await buySubscription({ paymentDetails });
                console.log("Subscription Result:", result);

                // Handle the result of the subscription here (e.g., display a message)
                if (result.success) {
                    await Swal.fire(
                        "¡Éxito!",
                        "Tu suscripción ha sido procesada con éxito.",
                        "success"
                    );
                    return;
                } else {
                    await Swal.fire(
                        "Error",
                        "Hubo un problema con tu suscripción. Por favor, intenta de nuevo.",
                        "error"
                    );
                }
                navigate("/ruta-destino"); // Reemplaza '/ruta-destino' con tu ruta específica
            } catch (error) {
                // Handle errors here
                await Swal.fire(
                    "Error",
                    "Hubo un problema al procesar tu suscripción. Por favor, intenta de nuevo.",
                    "error"
                );
            }
            // Handle the result of the subscription here (e.g., display a message)
        } else {
            // Handle errors here
        }
    };

    return (
        <div className="subscription-form-container">
            <div className="subscription-payment-info">
                <h2>Información de pago</h2>
                <p>Todas las transacciones son seguras y encriptadas</p>
                <form className="subscription-payment-form" onSubmit={handleSubmit}>
                    <div className="subscription-form-group">
                        <label htmlFor="cardholderName">Nombre titular de la tarjeta</label>
                        <input
                            type="text"
                            id="cardholderName"
                            className="subscription-input"
                            placeholder="Nombre del titular"
                        />
                    </div>
                    <div className="subscription-form-group">
                        <label htmlFor="cardNumber">Número de tarjeta</label>
                        <CardElement
                            className="form-control"
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                    },
                                    invalid: {
                                        color: "#9e2146",
                                    },
                                },
                            }}
                        />
                    </div>
                    <button type="submit" className="subscription-submit-btn">
                        PAGAR
                    </button>
                </form>
                {/* <div className="subscription-investment-info">
                    Invertir en ti es la única inversión con retorno garantizado
                </div> */}
            </div>
            <div className="subscription-alternate-payment">
                <p>
                    ¿Quieres otro método de pago? <a href="#">Próximamente</a>
                </p>
            </div>
        </div>
    );
};

export default SubscriptionForm;
