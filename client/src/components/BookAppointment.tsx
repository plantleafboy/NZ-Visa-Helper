import {Box} from "@mui/material";
import StripeEmbeddedCheckout from "./StripeEmbeddedCheckout";
import dotenv from 'dotenv';
import axios from "axios";
import {BASE_URL} from "../utility/config";
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

const BookAppointment = () => {

    return (
        <Box>Book with us
            <StripeEmbeddedCheckout></StripeEmbeddedCheckout>
        </Box>
    )
}

export default BookAppointment;