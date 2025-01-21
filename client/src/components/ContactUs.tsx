import {Box, Button, TextField} from "@mui/material";
import React from "react";
import axios from "axios";
import {BASE_URL} from "../utility/config";

const ContactUs = () => {

    axios.get(`${BASE_URL}/api/v1/users/1/image`,).then(
        (response) => {
        },
        (error) => {
        },
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        /** TODO
         * validates the input fields for
         * email
         * subject
         * message
         */
        e.preventDefault();
        sendEmail();
    }

    const sendEmail = () => {
        axios.post(`${BASE_URL}/api/v1/email`).then(
            (response) => {
            },
            (error) => {
            },
        );
    };

    return (
        <Box>Contact us in construction
            <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                <h2>Login Form</h2>
                {/*<TextField*/}
                {/*    label="Email"*/}
                {/*    onChange={handleInputChange}*/}
                {/*    required*/}
                {/*    variant="outlined"*/}
                {/*    color="secondary"*/}
                {/*    type="email"*/}
                {/*    sx={{mb: 3}}*/}
                {/*    fullWidth*/}
                {/*    name="email"*/}
                {/*    // value={user.email}*/}
                {/*    error={emailError}*/}
                {/*/>*/}
                {/*<TextField*/}
                {/*    label="Subject"*/}
                {/*    onChange={handleInputChange}*/}
                {/*    required*/}
                {/*    name="subject"*/}
                {/*    variant="outlined"*/}
                {/*    color="secondary"*/}
                {/*    type="subject"*/}
                {/*    // value={user.subject}*/}
                {/*    error={subjectError}*/}
                {/*    fullWidth*/}
                {/*    sx={{mb: 3}}*/}
                {/*/>*/}
                <Button variant="outlined" color="secondary" type="submit">Send Email</Button>
                {/*<span>{formError && (<div>{errorMessage}</div>)}</span>*/}
            </form>
        </Box>
    )
}

export default ContactUs;