import {Request, Response} from "express";
import Logger from '../../config/logger';
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY
);



const createSession = async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'consultation',
                },
                unit_amount: 60,
            },
            quantity: 1,
        }],
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'   //use url
    })
    res.json({ id: session.id, client_secret: session.client_secret });
    // res.send({clientSecret: session.client_secret});
};




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
// app.listen(4242, () => console.log('Running on port 4242'));

export {createSession}