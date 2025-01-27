import {Request, Response} from "express";
import Logger from '../../config/logger';
import {rootUrl} from "../routes/base.routes";
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
});

const createSession = async (req: Request, res: Response) => {
    try {
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'], FOR EXTRA PAYMENT TYPES
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'consultation',
                    },
                    unit_amount: 6000,
                },
                quantity: 1,
            }],
            mode: 'payment',
            ui_mode: 'embedded',
            return_url: `${req.headers.origin}/order-outcome/return?session_id={CHECKOUT_SESSION_ID}`   // make server page (url)
        })
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ id: session.id, clientSecret: session.client_secret });

    } catch (e) {
        res.status(500).json({ error: e.message })
    }

};

const getCheckoutStatus = async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.retrieve(<string>req.query.sessionId);
    res.send({
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details.email
    });

}

// // Use the secret provided by Stripe CLI for local testing
// // or your webhook endpoint's secret.
// const endpointSecret = 'whsec_...';
//
// // Using Express
// const app = require('express')();
//
// // Use body-parser to retrieve the raw body as a buffer
// const bodyParser = require('body-parser');
//
// app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
//     const payload = request.body;
//     const sig = request.headers['stripe-signature'];
//
//     let event;
//
//     try {
//         event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//     } catch (err) {
//         return response.status(400).send(`Webhook Error: ${err.message}`);
//     }
//
//     if (
//         event.type === 'checkout.session.completed'
//         || event.type === 'checkout.session.async_payment_succeeded'
//     ) {
//         fulfillCheckout(event.data.object.id);
//     }
//
//     response.status(200).end();
// });
//

export {createSession, getCheckoutStatus}