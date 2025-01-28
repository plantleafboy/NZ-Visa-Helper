import {Request, Response} from "express";
import Logger from '../../config/logger';
import {rootUrl} from "../routes/base.routes";
import Stripe from 'stripe';
import dotenv from 'dotenv';
import {sendEmailWithoutParameters} from "../utilities/nodemailerConfig";
import bodyParser from "body-parser";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
});


async function fulfillCheckout(sessionId: string) {
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    Logger.info('Fulfilling Checkout Session ' + sessionId);

    // TODO: Make this function safe to run multiple times,
    // even concurrently, with the same session ID

    // TODO: Make sure fulfillment hasn't already been
    // disable payment button afterwards for such users? embedded checkout handles?
    // performed for this Checkout Session if (axios.get().then.. check user.fulfilled from DB).

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

    // Check the Checkout Session's payment_status property
    // to determine if fulfillment should be performed
    if (checkoutSession.payment_status !== 'unpaid') {
        // TODO: Perform fulfillment of the line items
        try {
            await sendEmailWithoutParameters() // change to correct email function
        } catch (e) {
            Logger.error('Error sending email:', e);
        }


        // TODO: Record/save fulfillment status for this Checkout Session save IN USER DB
    }
}

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
    Logger.info('enter function here');

    const session = await stripe.checkout.sessions.retrieve(req.query.session_id as string);
    Logger.info(req.query.session_id);
    res.send({
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details.email
    });

}

// Use the secret provided by Stripe CLI for local testing
// or your webhook endpoint's secret.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// Use body-parser to retrieve the raw body as a buffer
export const rawBodyParser = bodyParser.raw({ type: "application/json" });
// const bodyParser = require('body-parser');

const webhookFulfilment = async (req: Request, res: Response) => {
    Logger.info("Received > webhook req.body", req.body);
    const payload = req.body;
    const sig = req.headers['stripe-signature'];


    Logger.error('req.body is not a Buffer or string:', typeof req.body); // check body type: json or raw via global parser application
    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        Logger.error('fail on construction ', err.message);
        return res.status(400).send(`Webhook construct event Error: ${err.message}`);

    }

    if (
        event.type === 'checkout.session.completed'
        || event.type === 'checkout.session.async_payment_succeeded'
        || event.type === 'payment_intent.succeeded'
    ) {
        await fulfillCheckout(event.data.object.id);
    }

    res.status(200).end();
    Logger.info('fulfilled');

};


export {createSession, getCheckoutStatus, webhookFulfilment}