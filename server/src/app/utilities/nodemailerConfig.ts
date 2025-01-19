import nodemailer from "nodemailer"
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const htmlTemplate = `
    <h1> Hello World </h1>
    <p>Thanks for your enquiry, here is the request</p>
`;
// Create the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use true for port 465; false for 587
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
export const sendEmail = async (to: string='hi', subject: string='test', text: string='helloworld', html?: string) => {
    try {
        const info = await transporter.sendMail({
            to: "holdEmail", // List of recipients
            subject: 'my subject', // Subject line
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
    } catch (error) {
        // console.error("Error sending email:", error);
        throw error;
    }
};

export const sendEmailWithoutParameters = async () => {
    await transporter.sendMail({
        to: "alexhpcp@gmail.com", // List of recipients
        subject: 'my subject', // Subject line
        html: htmlTemplate
    }).then(r => "success");
};

export const sendEmailParams = async (to: string='hi', subject: string='test', text: string='helloworld', html?: string) => {
    try {
        const info = await transporter.sendMail({
            to: "holdEmail", // List of recipients
            subject: 'my subject', // Subject line
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
    } catch (error) {
        // console.error("Error sending email:", error);
        throw error;
    }
};
