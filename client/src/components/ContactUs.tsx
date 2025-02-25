import {Box, Button, Container, FormControl, FormLabel, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../utility/config";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";
import InsuranceDisplay from "./InsuranceDisplay";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    // axios.get(`${BASE_URL}/api/v1/users/1/image`,).then(
    //     (response) => {
    //     },
    //     (error) => {
    //     },
    // );

    const handleSubmit = (e: React.FormEvent) => {
        /** TODO
         * validates the input fields for form data:
         * email
         * subject
         * message
         */
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error("All fields are required.");
            return;
        }

        sendEmail(); //to change
    }

    const sendEmail = () => {
        axios.post(`${BASE_URL}/api/v1/email/contact`, formData).then(
            (response) => {
                toast.success("Email sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                });
            },
            (error) => {
                toast.error("Failed to send email.");
            },
        );
    };

    return (
        <React.Fragment>
            <NavBar></NavBar>
            <Box className="sign-up" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit} id="sign-up-form" noValidate>
                    <Stack spacing={2} direction="column" sx={{marginBottom: 4, width: '100%'}}>
                        <FormControl margin="normal" >
                            <TextField
                                label="Name"
                                type="text"
                                onChange={handleChange}
                                name="name"
                                placeholder="Jane"
                                value={formData.name}
                                required
                            />
                        </FormControl>
                        <FormControl margin="dense">
                            <TextField
                                label="Email"
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
                    </Stack>
                    <Stack spacing={2} direction="column" sx={{marginBottom: 4, width: '100%'}}>
                        <FormControl margin="normal">
                            <FormLabel>Message</FormLabel>
                            <TextField
                                type="text"
                                onChange={handleChange}
                                name="message"
                                multiline
                                placeholder="I would like to find out more about..."
                                value={formData.message}
                                minRows={4}
                                maxRows={6}
                                required
                            />
                        </FormControl>
                        {/*<span>{formError && (<div>{errorMessage}</div>)}</span>*/}
                        <Button variant="outlined" color="secondary" type="submit">Send Email</Button>
                    </Stack>

                    <InsuranceDisplay></InsuranceDisplay>
                </form>
            </Box>
            <ToastContainer />
        </React.Fragment>
    )
}

export default ContactUs;