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


export default function Redirect(){
    return (
        <h3>Exception Error code 500</h3>
    )
}