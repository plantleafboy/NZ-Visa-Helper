import React from 'react';
import {Box, Typography, Link, MenuItem} from "@mui/material";
function Footer() {

    const testLoad = () => {
        console.log("footer loaded");
    }

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >

            <Typography variant="body1" align="center">
                © {new Date().getFullYear()} Your Company Name
            </Typography>
            <Typography variant="body2" align="center">
                Built with <Link href="https://mui.com/" underline="hover">MUI</Link>
            </Typography>
            <MenuItem
                onClick={() => {
                    testLoad();
                }}
            >
                Logout (test)
            </MenuItem>
        </Box>

    );
};

export default Footer;