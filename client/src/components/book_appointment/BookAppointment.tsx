import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import StripeEmbeddedCheckout from "../book_appointment/StripeEmbeddedCheckout";
import dotenv from 'dotenv';
import axios from "axios";
import {BASE_URL} from "../../utility/config";
import React, {useCallback, useState} from "react";
import NavBar from "../NavBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {motion} from "motion/react";
const BookAppointment = () => {
    const [open, setOpen] = useState(false);
    const MotionButton = motion.create(Button);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <NavBar></NavBar>

            <Box
                sx={{display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: "center", height: "100%", textAlign: "center", mb: 4, minHeight: "100vh", px: 20}}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                >
                    {/*<Typography*/}
                    {/*    sx={{ mt: 4 }}*/}
                    {/*    variant="h2" gutterBottom>*/}
                    {/*    Education Options*/}
                    {/*</Typography>*/}
                    <Typography variant="h3" gutterBottom>
                        Make a quick and easy appointment with us now to <b>begin</b> your <i>travel journey</i>.
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Appointment includes a 60 minute consultation, one on one. to discuss and identify your travel needs,
                    </Typography>
                    <MotionButton
                        size="large"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1,
                            px: 4, // Increases left/right padding
                            py: 2, // Increases top/bottom padding
                            fontSize: "1.2rem", // Increases text size
                            minWidth: "200px", // Sets a wider button
                            height: "60px" // Adjusts button height
                            }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClickOpen}
                    >
                        Make a Booking
                    </MotionButton>
                </motion.div>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center'}}>
                    {"Reserve an appointment"}
                </DialogTitle>
                <DialogContent>
                    <StripeEmbeddedCheckout></StripeEmbeddedCheckout>
                    <DialogContentText id="alert-dialog-description" sx={{mt: 4}}>
                        You will receive a confirmation email and follow up from our team shortly!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </Button>
                    {/*https://stackoverflow.com/questions/48919843/left-alignment-of-material-ui-dialog-buttons*/}
                    <div style={{flex: '1 0 0'}}/>
                    {/*autofocus*/}
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default BookAppointment;