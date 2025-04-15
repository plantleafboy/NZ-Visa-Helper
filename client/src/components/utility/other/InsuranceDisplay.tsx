import {
    Avatar,
    Box,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardMedia,
    Container, IconButton,
    Link,
    Stack,
    Typography
} from "@mui/material";
import NavBar from "../../NavBar";
import {Delete, Edit} from "@mui/icons-material";
import React from "react";
import { motion } from "motion/react"


// "/images/OrbitProtect-IntStud.png"
// https://quoting.orbitprotect.com/international-student?referrer=297

const InsuranceDisplay = () => {
    return (
        <Box>
            <Container>
                {/*<Typography variant="h4" sx={{ mb: 4, mt: 2}}>Purchase Insurance Here</Typography>*/}
                <motion.div
                    initial={{ x: -100, opacity: 0 }} // Start from left (-100px) and invisible
                    whileInView={{ x: 0, opacity: 1 }} // Animate when in view
                    // animate={{ x: 0, opacity: 1 }} // Move to position (0px) and become visible
                    transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
                    viewport={{ once: true, amount: 0.7 }} // Plays only once when 20% of it is in view
                >
                    <Card sx={{ maxWidth: 400, ml: 4}}>
                        <CardActionArea component="a"
                                        href="https://quoting.orbitprotect.com/international-student?referrer=297"
                        >

                            <CardMedia
                                component={"img"}
                                sx={{ height: 320 }}
                                image= '/images/OrbitProtect-Insurance.jpg'
                                title="purchase insurance - Orbit Protect"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Purchase Insurance
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Click here to purchase insurance with our trusted partner
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    )
}

export default InsuranceDisplay;