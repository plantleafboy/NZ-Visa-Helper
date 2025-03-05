import {Avatar, Box, Button, Card, CardContent, Container, Grid, Typography} from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MyCarousel from "./Testmionials";
interface TestimonialProps {
    name: string
    comment: string
    profileImage: string
}
const testimonials: TestimonialProps[] = [
    {
        name: "Li Wei",
        comment: "The team made the immigration process seamless. Highly recommend them!",
        profileImage: "/images/testimonial1.jpg",
    },
    {
        name: "Zhang Hua",
        comment: "Professional and knowledgeable about the NZ visa system. Great service!",
        profileImage: "/images/testimonial2.jpg",
    },
    {
        name: "Chen Mei",
        comment: "Moving to New Zealand was a dream, and they helped make it come true.",
        profileImage: "/images/testimonial3.jpg",
    },
];

const About = () => {
    return (

        <Box>
            <NavBar />
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: "url('/images/brandi-redd-aJTiW00qqtI-unsplash.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    py: 10,
                    textAlign: "center",
                }}
            >
                <Typography variant="h3" gutterBottom color={'black'}>
                    Welcome to Your Journey to New Zealand
                </Typography>
                <Typography variant="h6" color={'black'} sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
                    Our experienced team specializes in helping individuals and families from China migrate to New Zealand with
                    ease and confidence.
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    Learn More
                </Button>
            </Box>

            {/* Info Section */}
            <Container sx={{ py: 5 }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Why Choose Us?
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">Expert Guidance</Typography>
                        <Typography>
                            Our team of immigration experts understands the ins and outs of New Zealand's visa and residency
                            requirements.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">Personalized Support</Typography>
                        <Typography>
                            We tailor our services to meet your unique needs and circumstances, ensuring a smooth transition.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">Proven Success</Typography>
                        <Typography>
                            Hundreds of successful cases have made us a trusted partner for immigration from China to New Zealand.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* Testimonials Section */}
            <Box sx={{ py: 5, bgcolor: "grey.100" }}>
                <Container>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        What Our Clients Say
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            gap: 3,
                            pt: 3,
                            pb: 5,
                        }}
                    >
                        <MyCarousel></MyCarousel>
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} sx={{ minWidth: 300 }}>
                                <CardContent>
                                    <Avatar
                                        src={testimonial.profileImage}
                                        alt={testimonial.name}
                                        sx={{ width: 60, height: 60, mx: "auto", mb: 2 }}
                                    />
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        "{testimonial.comment}"
                                    </Typography>
                                    <Typography variant="subtitle1" textAlign="center" color="primary">
                                        - {testimonial.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>
            <Footer text={"about us page test"}></Footer>
        </Box>
    )
}

export default About;