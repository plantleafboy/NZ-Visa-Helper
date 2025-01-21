import {Express} from "express";
import {rootUrl} from "./base.routes";
import * as stripeCheckout from '../controllers/stripe.controller';

module.exports = (app: Express) => {

    app.route(rootUrl+'/stripe/embedded-checkout')
        .post(stripeCheckout.createSession)

}