import React from 'react';
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
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
        </Box>
    );
};

export default Footer;