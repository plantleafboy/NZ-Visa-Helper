// import {useLocation} from "react-router-dom";
// import {useEffect, useState} from "react";
// //import { stripe } from "@/utils/stripe"; //use stripe SDK
//
// const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY
// );
//
// async function getSession(sessionId: string) {
//
//     const session = await stripe.checkout.sessions.retrieve(sessionId!);
//     return session;
// }
//
// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }
//
// export default function Redirect(){
//     const query = useQuery();
//     const sessionId = query.get('session_id');
//     const [session, setSession] = useState(null);
//
//     useEffect(() => {
//         async function fetchSession() {
//             if (sessionId) {
//                 const fetchedSession = await getSession(sessionId);
//                 setSession(fetchedSession);
//             }
//         }
//         fetchSession();
//     }, [sessionId]);
//
//     // @ts-ignore
//     if (session?.status === "open" ) {
//         return <p>Payment unsuccessful</p>
//     }
//
//     // @ts-ignore
//     if (session?.status === "complete") {
//         return (
//             <h3>Thanks you! We will get in touch by email with you shortly <br/> Your stripe customer ID is:
//                 {/*@ts-ignore*/}
//                 {(session.customer as string)}
//             </h3>
//         );
//     }
//
//     return (
//         <h3>Exception Error code 500</h3>
//     )
// }
import NavBar from "./NavBar";
import {Box} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router-dom";


const Redirect = () => {

    //tanstack requires react 18+
    // const query = useQuery();
    // const sessionId = query.get('session_id'); // Get the session_id from the URL
    const { session_id } = useParams();

    try {
        const session = await axios.get(`/session_status?session_id=${session_id}`)
        console.log(session)
    } catch (error: unknown) {
    console.error('Error:', error);
    }

    // @ts-ignore
    if (session.status == 'open') {
        //TODO: or redirect to book an appointment page with a prop to open the payment form MODAL
        return (
            <Box>
                <NavBar></NavBar>
                <h3>Exception Error code 500</h3>
            </Box>
        )    } else { // @ts-ignore
        if (session.status == 'complete') {
            //TODO: call fullfilment function
            return (
                // Show success page
                // Optionally use session.payment_status or session.customer_email
                // to customize the success page
                <Box>
                    <NavBar></NavBar>
                    <h3>Successful payment: code success</h3>
                </Box>
            )

            }
    }

    return (
        <Box>
            <NavBar></NavBar>
            <h3>Exception Error code 500</h3>
        </Box>
    )
}

export default Redirect;