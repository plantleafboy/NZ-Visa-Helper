import {Box, Button} from "@mui/material";
import StripeEmbeddedCheckout from "./StripeEmbeddedCheckout";
import dotenv from 'dotenv';
import axios from "axios";
import {BASE_URL} from "../utility/config";
import {useCallback} from "react";
const BookAppointment = () => {

    return (
        <Box>Book with us
            <StripeEmbeddedCheckout></StripeEmbeddedCheckout>
        </Box>
    )
}

export default BookAppointment;