import nodemailer from "nodemailer"
import dotenv from 'dotenv';
import Logger from '../../config/logger';

dotenv.config();

const htmlTemplate = `
    <h1> test webhook fulfillment </h1>
    <p>Thanks for your enquiry, here is the request</p>
`;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true - port 465 & false for 587
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        Logger.error("Error connecting to email server:" + error);
    } else {
        Logger.info("Email server is ready to send messages:" + success);
    }
});

export const sendAppointmentEmail = async (fulfillmentObject : StripeFulfillmentData) => {
    const message = `Thanks ${fulfillmentObject.customerName}! This is a successful flow from the checkout! Thank you for your interest. We will be in contact shortly!`;
    try {
        const info = await transporter.sendMail({
            to: fulfillmentObject.customerEmail,
            subject: 'NZ Visa Helper - Checkout Notice',
            text: message,
            // html: htmlTemplate
        });
    } catch (error) {
        throw error;
    }
};

export const sendContactEmail = async (name: string, email: string, message: string) => {
    try {
        const info = await transporter.sendMail({
            from: email,
            to: "alexhpcp@gmail.com", // List of recipients
            subject: `New Query from Visa Helper`, // Subject line
            text: message,
            // html: htmlTemplate
        });

        // console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        // console.error("Error sending email:", error);
        throw error;
    }
};