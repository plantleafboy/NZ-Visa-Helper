import {Avatar, Box, Button, Card, CardContent, Container, Grid, Typography} from "@mui/material";
import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import InsuranceDisplay from "../utility/InsuranceDisplay";
import MyTestimonials from "../about/MyTestimonials";
import StudyArticles from "../visa_education/StudyArticles";

const About = () => {
    return (

        <Box>
            <NavBar />
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: "url('/images/hiking.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    color: "white",
                    py: 10,
                    textAlign: "center",
                    height: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                    <Container sx={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                    <Typography variant="h3" gutterBottom>
                        Welcome to Your Journey to New Zealand
                    </Typography>
                    <Typography variant="h6" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
                        Our experienced team specializes in helping individuals and families from China migrate to New Zealand with
                        ease and confidence.
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Learn More
                    </Button>
                </Container>
            </Box>

            {/* Info Section */}
            <Box sx={{py: 5, bgcolor: "grey.100", height: '50vh', display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
                <Container>
                    {/*<Typography variant="h4" gutterBottom textAlign="center" sx={{alignSelf: "top"}}>*/}
                    {/*    Why Choose Us?*/}
                    {/*</Typography>*/}
                    <Grid container spacing={10}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h4">Expert Guidance</Typography>
                            <Typography>
                                Our team of immigration experts understands the ins and outs of New Zealand's visa and residency
                                requirements.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h4">Personalized Support</Typography>
                            <Typography>
                                We tailor our services to meet your unique needs and circumstances, ensuring a smooth transition.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h4">Proven Success</Typography>
                            <Typography>
                                Hundreds of successful cases have made us a trusted partner for immigration from China to New Zealand.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <MyTestimonials></MyTestimonials>
            </Container>

            <StudyArticles></StudyArticles>

            <Box sx={{bgcolor: 'grey.100', display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 4, mb: 4, py: 4}}>
                <InsuranceDisplay></InsuranceDisplay>
            </Box>
            {/*<Footer text={"about us page test"}></Footer>*/}
        </Box>
    )
}

export default About;