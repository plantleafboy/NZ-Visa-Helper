import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import StripeEmbeddedCheckout from "./StripeEmbeddedCheckout";
import dotenv from 'dotenv';
import axios from "axios";
import {BASE_URL} from "../utility/config";
import {useCallback, useState} from "react";
import NavBar from "./NavBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const BookAppointment = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <NavBar></NavBar>
            <Button variant="outlined" onClick={handleClickOpen}>
                Make a Booking
            </Button>
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