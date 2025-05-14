import React, { useEffect, useRef } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

// Define the insurance option interface
interface InsuranceOption {
    id: number;
    title: string;
    description: string;
    image: string;
    alt: string;
    link: string;
}

// Sample data that matches your provided code
const insuranceOptions: InsuranceOption[] = [
    {
        id: 1,
        title: "International Student Insurance",
        description: "Click here to purchase insurance with our trusted partner",
        image: "/images/OrbitProtect-Insurance.jpg",
        alt: "purchase insurance - Orbit Protect",
        link: "https://quoting.orbitprotect.com/international-student?referrer=297"
    },
    {
        id: 2,
        title: "All Insurance",
        description: "Click here to purchase insurance with our trusted partner",
        image: "https://affiliates.orbitprotect.com/api/banner/image/5/300250.png",
        alt: "purchase insurance - Orbit Protect",
        link: "https://quoting.orbitprotect.com/all-insurance?referrer=297"
    },
    {
        id: 3,
        title: "Working Holiday Insurance",
        description: "Click here to purchase insurance with our trusted partner",
        image: "https://affiliates.orbitprotect.com/api/banner/image/3/300250.png",
        alt: "purchase insurance - Orbit Protect",
        link: "https://quoting.orbitprotect.com/working-holiday?referrer=297"
    }
];

const InsuranceCard: React.FC<{option: InsuranceOption}> = ({ option }) => {
    const controls = useAnimation();
    const cardRef = useRef(null);

    useEffect(() => {
        // Trigger animation immediately
        controls.start({
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: option.id * 0.2,
            },
        }).then(r => (0));
    }, [controls, option.id]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ x: -50, opacity: 0 }}
            animate={controls}
        >
            <Card sx={{
                height: '100%',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                }
            }}>
                <CardActionArea
                    component="a"
                    href={option.link}
                >
                    <CardMedia
                        component="img"
                        sx={{ height: 320 }}
                        image={option.image}
                        title={option.alt}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {option.title}
                        </Typography>
                        {/*<Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
                        {/*    {option.description}*/}
                        {/*</Typography>*/}
                    </CardContent>
                </CardActionArea>
            </Card>
        </motion.div>
    );
};

const InsuranceDisplay: React.FC = () => {
    return (
        <Box>
            <Container maxWidth="lg" sx={{ py: 4 }}>

                <Grid container spacing={3}>
                    {insuranceOptions.map((option) => (
                        <Grid item xs={12} sm={6} md={4} key={option.id}>
                            <InsuranceCard option={option} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default InsuranceDisplay;