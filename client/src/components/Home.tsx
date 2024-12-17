import React from "react";
import NavBar from "./NavBar";
import { Typography } from "@mui/material";
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            <NavBar />
            <Typography variant="h1" sx={{ py: 20, textAlign: "center" }}>
                Petition Site
            </Typography>
            <Footer></Footer>
        </>
    );
};

export default Home;
