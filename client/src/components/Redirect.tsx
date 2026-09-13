import NavBar from "./NavBar";
import {Box} from "@mui/material";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {BASE_URL} from "../utility/config";
import SuccessPage from "./utility/SuccessPage";


const Redirect = () => {

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    //tanstack requires react 18+
    // const query = useQuery();
    // const sessionId = query.get('session_id'); // Get the session_id from the URL

    //using react-router-dom
    // const session_id = useParams();
    // console.log(session_id)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        console.log(sessionId)
        if (!sessionId) {
            setStatus('no_session');
            return;
        }

        axios.get(`${BASE_URL}/api/v1/stripe/session-status?session_id=${sessionId}`)

            .then((response) => {
                const { status, customer_email } = response.data;
                setStatus(status);
                setCustomerEmail(customer_email);
                console.log("get response: ", response.data)

            })
            .finally(() => setLoading(false))
            .catch((error) => {
                console.error("Error fetching session status:", error);
            });

    }, []);

    // @ts-ignore
    if (loading) return <Box><NavBar /><h3>Verifying your payment...</h3></Box>;

    else if (status === 'open') {
        //TODO: or redirect to book an appointment page with a prop to open the payment form MODAL
        return (
            <Box>
                <NavBar></NavBar>
                {/*<Navigate to="/book-appointment" />*/}
                <h3>Exception Error code 500</h3>
            </Box>
        )
        // @ts-ignore
    } else if (status === 'complete') {
            //TODO: call fulfillment function?? HERE WE WAIT FOR WEBHOOK FLOW AND SHOW STANDARD SUCCESS PAGE
            return (
                // Show success page + use session.payment_status or session.customer_email
                // customize the success page
                <Box>
                    <NavBar></NavBar>
                    <section id="success">
                        <p>
                            We appreciate your business! A confirmation email will be sent to {customerEmail}
                             and we will be in contact with you shortly.
                            <br/>
                            If you have any questions, please email <a
                            href="mailto:sunpengyimin@gmail.com">sunpengyimin@gmail.com</a>.
                        </p>
                    </section>
                </Box>
            )
    } else {
        return (
            <Box>
                <NavBar></NavBar>
                <h3>Exception Error session status: neither complete or open. Please try payment again</h3>
                {/*<Navigate to="/book-appointment" />*/}
            </Box>
        )
    }
}

export default Redirect;