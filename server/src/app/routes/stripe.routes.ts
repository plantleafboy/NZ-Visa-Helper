import express, {Express} from "express";
import {rootUrl} from "./base.routes";
import * as stripeCheckout from '../controllers/stripe.controller';
import Logger from '../../config/logger';

module.exports = (app: Express) => {

    app.route(rootUrl+'/stripe/embedded-checkout')
        .post(stripeCheckout.createSession)

    // app.route(rootUrl+'/stripe/webhook')

    app.route(rootUrl+'/stripe/session-status')
        .get(stripeCheckout.getCheckoutStatus);

    app.post(
        rootUrl + '/stripe/webhook',
        express.raw({ type: 'application/json' }), // apply middleware to parse raw body
        stripeCheckout.webhookFulfilment
    );

    // app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    //     let event = request.body;
    //     // Only verify the event if you have an endpoint secret defined.
    //     // Otherwise use the basic event deserialized with JSON.parse
    //     if (endpointSecret) {
    //         // Get the signature sent by Stripe
    //         const signature = request.headers['stripe-signature'];
    //         try {
    //             event = stripe.webhooks.constructEvent(
    //                 request.body,
    //                 signature,
    //                 endpointSecret
    //             );
    //         } catch (err) {
    //             console.log(`⚠️  Webhook signature verification failed.`, err.message);
    //             return response.sendStatus(400);
    //         }
    //     }
    //
    //     // Handle the event
    //     switch (event.type) {
    //         case 'payment_intent.succeeded':
    //             const paymentIntent = event.data.object;
    //             console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    //             // Then define and call a method to handle the successful payment intent.
    //             // handlePaymentIntentSucceeded(paymentIntent);
    //             break;
    //         case 'payment_method.attached':
    //             const paymentMethod = event.data.object;
    //             // Then define and call a method to handle the successful attachment of a PaymentMethod.
    //             // handlePaymentMethodAttached(paymentMethod);
    //             break;
    //         default:
    //             // Unexpected event type
    //             console.log(`Unhandled event type ${event.type}.`);
    //     }
    //
    //     // Return a 200 response to acknowledge receipt of the event
    //     response.send();
    // });
}