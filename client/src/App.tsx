import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserProfile from "./components/User";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import About from "./components/about/About";
import VisaInfo from "./components/visa_education/VisaInfo";
import BookAppointment from "./components/book_appointment/BookAppointment";
import ContactUs from "./components/contact/ContactUs";
import Redirect from "./components/Redirect";


function App() {
  return (
      <div className="App">
         <Router>
           <div>
             <Routes>
                 <Route path="/" element={<About/>}/>
                 <Route path="/about" element={<About/>}></Route>
                 <Route path="/visa-info" element={<VisaInfo/>}/>
                 <Route path="/book-appointment" element={<BookAppointment/>}/>
                 <Route path="/contact-us" element={<ContactUs/>}/>
                 <Route path="/order-outcome/return" element={<Redirect/>}/>
                 <Route path="/login" element={<Login/>}/>
                 <Route path="/sign-up" element={<SignUp/>}/>
                 <Route path="/profile/" element={<UserProfile />} />
                 {/*<Route path="*" element={<NotFound/>}/>*/}
             </Routes>
           </div>
         </Router>
        </div>
  );
}

export default App;
