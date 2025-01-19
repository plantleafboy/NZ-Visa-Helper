"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailParams = exports.sendEmailWithoutParameters = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const htmlTemplate = `
    <h1> Hello World </h1>
    <p>Thanks for your enquiry, here is the request</p>
`;
// Create the transporter
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});
// Verify the transporter configuration
// transporter.verify((error, success) => {
//     if (error) {
//         console.error("Error connecting to email server:", error);
//     } else {
//         console.log("Email server is ready to send messages:", success);
//     }
// });
// Function to send an email
const sendEmail = (to = 'hi', subject = 'test', text = 'helloworld', html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            to: "holdEmail",
            subject: 'my subject',
            html: htmlTemplate
        });
        // const info = await transporter.sendMail({
        //     from: `"Immigration service" <${process.env.EMAIL_USER}>`, // Sender address
        //     to, // List of recipients
        //     subject, // Subject line
        //     text, // Plain text body
        //     html, // HTML body (optional)
        // });
        // console.log(`Email sent: ${info.messageId}`);
    }
    catch (error) {
        // console.error("Error sending email:", error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
const sendEmailWithoutParameters = () => __awaiter(void 0, void 0, void 0, function* () {
    yield transporter.sendMail({
        to: "alexhpcp@gmail.com",
        subject: 'my subject',
        html: htmlTemplate
    }).then(r => "success");
});
exports.sendEmailWithoutParameters = sendEmailWithoutParameters;
const sendEmailParams = (to = 'hi', subject = 'test', text = 'helloworld', html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            to: "holdEmail",
            subject: 'my subject',
            html: htmlTemplate
        });
        // const info = await transporter.sendMail({
        //     from: `"Immigration service" <${process.env.EMAIL_USER}>`, // Sender address
        //     to, // List of recipients
        //     subject, // Subject line
        //     text, // Plain text body
        //     html, // HTML body (optional)
        // });
        // console.log(`Email sent: ${info.messageId}`);
    }
    catch (error) {
        // console.error("Error sending email:", error);
        throw error;
    }
});
exports.sendEmailParams = sendEmailParams;
//# sourceMappingURL=nodemailerConfig.js.map