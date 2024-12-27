import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserProfile from "./components/User";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Petitions from "./components/Petitions";
import SignUp from "./components/SignUp";
import PetitionList from "./components/PetitionLists";
import Home from "./components/Home";
import PetitionView from "./components/PetitionView";


function App() {
  return (
      <div className="App">
         <Router>
           <div>
             <Routes>
                 <Route path="/login" element={<Login/>}/>
                 <Route path="/sign-up" element={<SignUp/>}/>
                 <Route path="/petitions" element={<PetitionList/>}/>
                 <Route path="/petitions-list" element={<Petitions/>}/>
                 <Route path="/petitions/:id" element={<PetitionView />} />
                 <Route path="/" element={<Home/>}/>
                 <Route path="/profile/" element={<UserProfile />} />
                 {/*<Route path="*" element={<NotFound/>}/>*/}
             </Routes>
           </div>
         </Router>
        </div>
  );
}

export default App;
