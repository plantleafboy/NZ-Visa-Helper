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
import NavBar from "./NavBar";
import {Delete, Edit} from "@mui/icons-material";
import React from "react";


// "/images/OrbitProtect_IntStud_300x250_.png"
// https://quoting.orbitprotect.com/international-student?referrer=297

const InsuranceDisplay = () => {
    return (
        <Box>
            <Container>
                {/*<Typography variant="h4" sx={{ mb: 4, mt: 2}}>Purchase Insurance Here</Typography>*/}

                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea component="a"
                                    href="https://quoting.orbitprotect.com/international-student?referrer=297"
                    >

                        <CardMedia
                            component={"img"}
                            sx={{ height: 140 }}
                            image= '/images/brandi-redd-aJTiW00qqtI-unsplash.jpg'
                            // image= '/images/OrbitProtect_IntStud_300x250_.png'
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

            </Container>
        </Box>
    )
}

export default InsuranceDisplay;