import {Box, Button} from "@mui/material";
import StripeEmbeddedCheckout from "./StripeEmbeddedCheckout";
import dotenv from 'dotenv';
import axios from "axios";
import {BASE_URL} from "../utility/config";
import {useCallback} from "react";
import NavBar from "./NavBar";
const BookAppointment = () => {

    return (
        <Box>
            <NavBar></NavBar>
            <StripeEmbeddedCheckout></StripeEmbeddedCheckout>
        </Box>
    )
}

export default BookAppointment;