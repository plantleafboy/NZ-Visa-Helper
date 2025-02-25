import {Request, Response} from "express";
import Logger from '../../config/logger';
import {sendContactEmail, sendAppointmentEmail} from '../utilities/nodemailerConfig'

// extra to do
// import * as schemas from '../resources/schemas.json';
// import {validate} from '../services/validator'

const handleContactEmail = async (req: Request, res: Response)   => {
    try {
        await sendContactEmail(req.body.name, req.body.email, req.body.message)
        res.status(200).send('Email sent successfully');
    }
    catch (e) {
        Logger.error(e);
    }
    return;
}

const handleAppointmentEmail = async (req: Request, res: Response)   => {
    try {
        await sendAppointmentEmail()
        res.status(200).send('Email sent successfully');
    }
    catch (e) {
        Logger.error(e);
    }
    return;
}

const testLog = async (req: Request, res: Response) => {
    Logger.info("working query received")
    res.status(200).send('Test hold query sent successfully');
}


export {handleContactEmail, testLog, handleAppointmentEmail}
