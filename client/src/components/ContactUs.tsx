import {Box, Button, Container, FormControl, FormLabel, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../utility/config";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";
import InsuranceDisplay from "./InsuranceDisplay";

const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    axios.get(`${BASE_URL}/api/v1/users/1/image`,).then(
        (response) => {
        },
        (error) => {
        },
    );

    const handleSubmit = (e: React.FormEvent) => {
        /** TODO
         * validates the input fields for
         * email
         * subject
         * message
         */
        e.preventDefault();
        sendEmail();
    }

    const testQuery = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.get(`${BASE_URL}/api/v1/email`).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            },
        );
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
        <React.Fragment>
            <NavBar></NavBar>
            <Box className="sign-up" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit} id="sign-up-form" noValidate>
                    <Stack spacing={2} direction="row" sx={{marginBottom: 4, width: '100%'}}>
                        <FormControl margin="normal" >
                            <FormLabel>Name</FormLabel>
                            <TextField
                                // label="Name"
                                type="text"
                                onChange={handleChange}
                                name="Name"
                                placeholder="Jane"
                                value={formData.name}
                                required
                            />
                        </FormControl>
                        <FormControl margin="normal">
                            <FormLabel>Message</FormLabel>
                            <TextField
                                type="text"
                                onChange={handleChange}
                                name="message"
                                placeholder="Doe"
                                value={formData.email}
                                required
                            />
                        </FormControl>
                    </Stack>
                    <Stack spacing={2} direction="column" sx={{marginBottom: 4, width: '100%'}}>
                        <FormControl margin="dense">
                            <FormLabel>Email</FormLabel>
                            <TextField
                                type="email"
                                onChange={handleChange}
                                name="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                // error={emailError}
                                required
                            />
                            {/*<span>{emailError && (<div>{fieldErrors.email}</div>)}</span>*/}

                        </FormControl>
                        {/*<span>{formError && (<div>{errorMessage}</div>)}</span>*/}
                        <Button variant="outlined" color="secondary" type="submit">Send Email</Button>

                    </Stack>
                    <InsuranceDisplay></InsuranceDisplay>
                </form>
            </Box>
        </React.Fragment>
    )
}

export default ContactUs;