import {Express} from "express";
import {rootUrl} from "./base.routes";
import * as stripeCheckout from '../controllers/stripe.controller';

module.exports = (app: Express) => {

    app.route(rootUrl+'/stripe/embedded-checkout')
        .post(stripeCheckout.createSession)

    app.route(rootUrl+'/test')
        .post(stripeCheckout.testLog)

    // Debug: log all routes
    app._router.stack.forEach((r: any) => {
        if (r.route && r.route.path) {
            console.log("stripe routes:", r.route.path);
        }
    });
}