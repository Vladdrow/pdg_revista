import React from "react";
import "../../assets/css/components/Layout/entities_subscription.css"

function EntitiesSubscription() {
    return (
        <section class="entities-subscription">
            <h2>Únete a Nuestra Plataforma Empresarial de Logística</h2>
            <p>
                Amplía tu alcance y conecta con más clientes. Envíanos tus detalles para ser parte
                de nuestro catálogo online.
            </p>
            <input type="email" placeholder="Inscribe tu correo electrónico aquí" required />
            <input type="file" required />
            <button type="submit">Enviar información</button>
        </section>
    );
}

export default EntitiesSubscription;
