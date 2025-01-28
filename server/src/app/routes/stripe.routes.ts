import express, {Express} from "express";
import {rootUrl} from "./base.routes";
import * as stripeCheckout from '../controllers/stripe.controller';
module.exports = (app: Express) => {

    app.route(rootUrl+'/stripe/embedded-checkout')
        .post(stripeCheckout.createSession)

    app.route(rootUrl+'/stripe/session-status')
        .get(stripeCheckout.getCheckoutStatus);

    app.post(
        rootUrl + '/stripe/webhook',
        express.raw({ type: 'application/json' }), // apply middleware to parse raw body
        stripeCheckout.webhookFulfilment
    );
}