import {Express} from "express";
import {rootUrl} from "./base.routes";
import * as email from '../controllers/email.controller';

// note: consider internal routing for the API request

module.exports = (app: Express) => {
    app.route(rootUrl+'/email/contact')
        .post(email.handleContactEmail);

    app.route(rootUrl+'/email/appointment')
        .post(email.handleAppointmentEmail);

    app.route(rootUrl+'/email/heartbeat')
        .get(email.testLog);
}
