import express, {Express} from "express";
import {rootUrl} from "./base.routes";
import * as stripeCheckout from '../controllers/stripe.controller';
module.exports = (app: Express) => {

    app.route(rootUrl+'/stripe/embedded-checkout')
        .post(stripeCheckout.createSession)

    app.route(rootUrl+'/stripe/session-status')
        .get(stripeCheckout.getCheckoutStatus);

    /* webhook call from stripe -> fulfilment logic on server + send response data for UI handling
    
    StripeEmbeddedCheckout -> controller (Redirect component) -> get(session-state) -- HERE --> stripeCheckoutService -> nodemailerConfig email
              |
              |
     response up to controller -> client
    called from client/Redirect via a SUCCESS FLOW from GET(session-status)
    pipes stripe.checkout flows: response: (sends email OR propogates bad state: error back to client)
    */
    app.post( 
        rootUrl + '/stripe/webhook',
        express.raw({ type: 'application/json' }), // apply middleware to parse raw body
        stripeCheckout.webhookFulfilment
    );
}