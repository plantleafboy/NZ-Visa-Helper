import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../utility/config";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";
import InsuranceDisplay from "./InsuranceDisplay";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";


const ContactUs = () => {

    const MotionButton = motion(Button);

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
            <Box className="sign-up" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 4, justifyContent: 'center', ml: 10, mr: 3 }}>
                <Container sx={{flex: 0.4, pb: 10}}>
                    <h1>Get Started by Contacting Us</h1>
                    <Typography variant='h5'>Let us help start your journey in New Zealand</Typography>
                </Container>
                {/*<Container sx={{flex: 0.6, ml: 4, mt: 4, backgroundColor: ""}}>*/}
                <Paper
                    elevation={3} // Controls shadow depth
                    sx={{
                        mx: "auto",
                        flex: 0.6,
                        p: 4, // Adds padding inside the form
                        borderRadius: 3, // Makes the corners rounded
                        border: "1px solid #ccc", // Optional: Adds an outline
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                        backgroundColor: "white"
                    }}
                >
                    <form onSubmit={handleSubmit} id="sign-up-form" noValidate>
                        <Stack spacing={2} direction="column" sx={{marginBottom: 2, width: '100%'}}>
                            <FormControl margin="normal">
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
                        <Stack spacing={2} direction="column" sx={{marginBottom: 2, width: '100%'}}>
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
                            <MotionButton variant="outlined"
                                          color="secondary"
                                          type="submit"
                                          whileHover={{scale: 1.1}}
                                          whileTap={{scale: 0.9}}
                                          sx={{width: 0.6, ml:'auto'}}
                            >
                                Send Email
                            </MotionButton>
                        </Stack>
                    </form>
                {/*</Container>*/}
                </Paper>
            </Box>
            <Box sx={{bgcolor: 'grey.100', display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 4, mb: 4, py: 4}}>
                <InsuranceDisplay></InsuranceDisplay>
            </Box>
            <ToastContainer/>
        </React.Fragment>
    )
}

export default ContactUs;