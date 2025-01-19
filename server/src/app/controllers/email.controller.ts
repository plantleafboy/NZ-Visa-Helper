import {Request, Response} from "express";
import Logger from '../../config/logger';
import {sendEmailWithoutParameters} from '../utilities/nodemailerConfig'

// extra to do
// import * as schemas from '../resources/schemas.json';
// import {validate} from '../services/validator'

const sendEmailTest = async (req: Request, res: Response)   => {
    try {
        await sendEmailWithoutParameters()
    }
    catch (e) {
        Logger.error(e);
    }
    return;
}

export {sendEmailTest}
