import {Button, Container, Typography, Box} from "@mui/material";
import { motion } from "motion/react"
import React from "react";

const EducationOptions = () => {
    const MotionButton = motion(Button);

    return (
        <Box
            sx={{display: "flex", flexDirection: "column", justifyContent: "center",
                alignItems: "center", height: "100%", textAlign: "center", mb: 4, minHeight: "100vh",
                // backgroundImage: "url('/images/students on laptops.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"}}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            >
                {/*<Typography*/}
                {/*    sx={{ mt: 4 }}*/}
                {/*    variant="h2" gutterBottom>*/}
                {/*    Education Options*/}
                {/*</Typography>*/}
                <Typography variant="h2" gutterBottom>
                    New Zealand has a vast range of schools and universities to choose from. Explore the various options
                    and find the <b>perfect</b> choice <i>for your family</i>.
                </Typography>
                <MotionButton
                    size="large"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.studywithnewzealand.govt.nz/cn"
                >
                   Explore Options
                </MotionButton>
            </motion.div>

        </Box>
    )
}

export default EducationOptions;