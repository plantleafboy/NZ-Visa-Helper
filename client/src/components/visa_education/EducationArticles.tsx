import React, {useState} from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    styled, Dialog
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Article from "../utility/Article";

// Define the article interface
interface EducationArticle {
    id: number;
    title: string;
    description: string;
    text: string;
    image: string;
    alt: string;
}

// Sample data that matches the image
const articles: EducationArticle[] = [
    {
        id: 1,
        title: "Study in New Zealand",
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

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[1],
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
    }
}));

// Define StyledCardMedia with proper typing
const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: 200,
})) as typeof CardMedia;

const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
    padding: '16px',
});

const StyledCircleButton = styled(Button)(({ theme }) => ({
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: '50%',
    padding: 0,
    marginLeft: 'auto',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[300]}`,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        border: `1px solid ${theme.palette.primary.main}`,
    }
}));

const EducationArticles: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<null | typeof articles[0]>(null);

    const handleOpen = (article: EducationArticle) => {
        setSelectedArticle(article);
    };

    const handleClose = () => {
        setSelectedArticle(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box mb={6}>
                <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                    Explore the options
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {articles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article.id}>
                        <StyledCard>
                            <CardMedia
                                component="img"
                                image={article.image}
                                alt={article.alt}
                                sx={{ height: 200 }}
                            />
                            <StyledCardContent>
                                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                                    {article.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {article.description}
                                </Typography>
                            </StyledCardContent>
                            <CardActions sx={{ p: 2, pt: 0 }}>
                                <StyledCircleButton onClick={(e) => { e.preventDefault(); handleOpen(article); }} aria-label={`Learn more about ${article.title}`}>
                                    <ArrowForwardIcon fontSize="small" />
                                </StyledCircleButton>
                            </CardActions>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            {selectedArticle && (
                <Dialog open={true} onClose={handleClose} fullWidth maxWidth="md">
                    <Article
                        title={selectedArticle.title}
                        content={selectedArticle.text}
                        image={selectedArticle.image}
                    />
                </Dialog>
            )}
        </Container>
    );
};

export default EducationArticles;