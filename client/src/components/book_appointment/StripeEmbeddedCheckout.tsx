"use client"; //for use? internal routing?

import axios from 'axios';
import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {useCallback} from "react";
import {BASE_URL} from "../../utility/config";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const STRIPE_PUBLISHABLE_KEY = process.env.NODE_ENV === 'production'
    ? 'pk_live_51QjIpJKgxsHSLKCZNyigVf37dsnc9k50jwbTqfXvvKJ0XR1P0aV3z7aYLJIohx3q1Fg4IujOyXz4mJSi98YE9anh00OVNAh6MO'
    : 'pk_test_51QjIpJKgxsHSLKCZ6DajWzC7qBe26n9GghQC8JiVFfu37tMLWwc7A0vaizdOevVpHcK1llulyuPkfTqdrZthOS2t0061pU4Teu';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const StripeEmbeddedCheckout = () => {
    const fetchClientSecret = useCallback(async () => {
        try {
            
            const response = await axios.post(`${BASE_URL}/api/v1/stripe/embedded-checkout`);
            console.log('current publishable key (stripe):', STRIPE_PUBLISHABLE_KEY);
            console.log('Checkout response:', response);
            return response.data.clientSecret;
        } catch (error: unknown) {
            console.error('User Thrown Error -> stripeEmbeddedcheckout: ', error);
            throw error;
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