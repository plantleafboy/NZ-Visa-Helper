import React from 'react';
import {
    Container,
    Box,
    Typography,

} from '@mui/material';

import ArticleGridObject from "../utility/ArticleGridObject";


const articles: ArticleObject[] = [
    {
        id: 1,
        title: "Education in New Zealand",
        description: "Discover our internationally-renowned education system and unbeatable lifestyle.",
        text: "same texts",
        image: "/images/hiking.png",
        alt: "Students discussing at a table"
    },
    {
        id: 2,
        title: "Scholarships",
        description: "Many New Zealand education providers offer scholarships to international students.",
        text: "same texts",
        image: "/images/students on laptops.png",
        alt: "Students at a cultural event"
    },
    {
        id: 3,
        title: "Education system",
        description: "Find out about the New Zealand Qualifications Framework, and the different types of schools and education providers.",
        text: "same texts",
        image: "/images/university group discussion.png",
        alt: "Student in a laboratory"
    },
    {
        id: 4,
        title: "Student visas",
        description: "Explore the visa options that allow you to study in New Zealand.",
        text: "same texts",
        image: "/images/classroom-snapshot.jpg",
        alt: "Two students walking together"
    },
    {
        id: 5,
        title: "Higher education",
        description: "New Zealand's higher education system offers a wide range of programmes and education providers to choose from, in any region of the country.",
        text: "same texts",
        image: "/images/friends-group.jpg",
        alt: "Graduation ceremony"
    },
    {
        id: 6,
        title: "Information for parents",
        description: "New Zealand offers a high standard of living and is a safe place for your child to build their independence and confidence.",
        text: "same texts",
        image: "/images/hobbit-land.jpg",
        alt: "Students sitting outdoors"
    }
];

const EducationArticles = () => {

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box mb={6}>
                <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                    Explore the Education Options
                </Typography>
            </Box>
            <ArticleGridObject articles={articles}/>

        </Container>
    );
};

export default EducationArticles;