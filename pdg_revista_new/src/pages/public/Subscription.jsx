import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import SubscriptionForm from "../../components/Form/SubscriptionForm";
import { useAuth } from "../../context/AuthContext";
import SubscriptionSummary from "../../components/Form/SubscriptionSummary";

function Subscription() {
    const { user, stripe } = useAuth();
    return (
        <Elements stripe={stripe}>
            <div className="app-container">
                <SubscriptionSummary />
                <SubscriptionForm />
            </div>
        </Elements>
    );
}

export default Subscription;

/* <div className="container p-3">
                <div className="row">
                    <div className="col-md-5 ">
                    </div>
                </div>
            </div> */
