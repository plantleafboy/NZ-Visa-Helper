import {Express} from "express";
import {rootUrl} from "./base.routes";
import * as stripeCheckout from '../controllers/stripe.controller';
import Logger from '../../config/logger';

module.exports = (app: Express) => {

    app.route(rootUrl+'/stripe/embedded-checkout')
        .post(stripeCheckout.createSession)

}