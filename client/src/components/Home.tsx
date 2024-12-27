import React from "react";
import NavBar from "./NavBar";
import {Box, Typography} from "@mui/material";
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            <NavBar />
            <Typography variant="h1" sx={{ py: 20, textAlign: "center" }}>
                Petition Site
            </Typography>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>

            </Box>
            <Footer text={"injected props"}></Footer>
        </>
    );
};

export default Home;
