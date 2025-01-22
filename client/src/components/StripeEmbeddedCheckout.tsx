"use client"; //for use? internal routing?

import axios from 'axios';
import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {useCallback} from "react";
import {BASE_URL} from "../utility/config";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51QjIpJKgxsHSLKCZ6DajWzC7qBe26n9GghQC8JiVFfu37tMLWwc7A0vaizdOevVpHcK1llulyuPkfTqdrZthOS2t0061pU4Teu');
//console.log(data.url)

const StripeEmbeddedCheckout = () => {
    const fetchClientSecret = useCallback(async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/stripe/embedded-checkout`);
            console.log('Checkout response:', response);
            return response.data.clientSecret;
        } catch (error: unknown) {
            console.error('Error:', error);
        }
    }, []);

    const options = {fetchClientSecret}

    return (
        <div>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
        </div>
    )
}

export default StripeEmbeddedCheckout;