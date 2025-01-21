import * as React from 'react';
"use client"; //for use? internal routing?
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {useCallback} from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51QjIpJKgxsHSLKCZ6DajWzC7qBe26n9GghQC8JiVFfu37tMLWwc7A0vaizdOevVpHcK1llulyuPkfTqdrZthOS2t0061pU4Teu');

const StripeEmbeddedCheckout = () => {
    const fetchClientSecret = useCallback(() => {
        //create a Checkout Session
        return fetch("/create-checkout-session", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    }, []);

    const options = {fetchClientSecret}

    return (
        <div>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}

export default StripeEmbeddedCheckout;