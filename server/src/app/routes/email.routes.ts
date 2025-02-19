import {Express} from "express";
import {rootUrl} from "./base.routes";
import * as email from '../controllers/email.controller';
import * as stripeCheckout from '../controllers/stripe.controller';

// note try use internal routing here for the API request

module.exports = (app: Express) => {
    app.route(rootUrl+'/email')
        .post(email.sendEmailTest);
}
