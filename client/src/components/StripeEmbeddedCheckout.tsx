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

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51QjIpJKgxsHSLKCZ6DajWzC7qBe26n9GghQC8JiVFfu37tMLWwc7A0vaizdOevVpHcK1llulyuPkfTqdrZthOS2t0061pU4Teu');
//console.log(data.url)
const StripeEmbeddedCheckout = () => {

    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session using axios
        return axios.post(`${BASE_URL}/api/v1/stripe/embedded-checkout`)
            .then((response) => {
            //     // Log the response to check what data is returned
            //     console.log('Axios response:', response);
            //
            //     // Return the clientSecret from the response data
            //     return response.data.clientSecret;
            // })

            // Log the response to check what data is returned
            console.log('Axios response:', response);

            // Ensure we are returning only the clientSecret string
            if (response.data && typeof response.data.clientSecret === 'string') {
                return response.data.clientSecret;
            } else {
                throw new Error('clientSecret is missing or not a string');
                }
            })
            .catch((error) => {
                console.log('Error fetching client secret:', error.message);
                return null; // Return null or handle the error as needed
            });
    }, []);


    // const fetchClientSecret = useCallback(() => {
    //     //create a Checkout Session
    //     return fetch(`${BASE_URL}/api/v1/stripe/embedded-checkout`, {
    //         method: "POST",
    //     })
    //         .then((res) => res.json())
    //         .then((data) => data.clientSecret);
    // }, []);
    //
    // const fetchClientSecret = useCallback(() => {
    //     // Create a Checkout Session
    //     return fetch(`${BASE_URL}/api/v1/embedded-checkout`, {
    //         method: "POST",
    //     })
    //         .then((res) => {
    //             console.log('Response:', res); // Check the full response object
    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log('Parsed data:', data); // Check the parsed JSON data
    //             return data.clientSecret;
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching client secret:', error);
    //         });
    // }, []);

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