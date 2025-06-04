import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Dialog,
    Grid,
    styled,
    Typography
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, {useState} from "react";
import Article from "./Article";

interface ArticleGridObjectProps {
    articles: ArticleObject[];
}

const ArticleGridObject = (props:ArticleGridObjectProps) => {
    const [selectedArticle, setSelectedArticle] = useState<ArticleObject | null>(null);

    const handleOpen = (article: ArticleObject) => {
        setSelectedArticle(article);
    };

    const handleClose = () => {
        setSelectedArticle(null);
    };

    return (
        <Container>
            <Grid container spacing={4}>
                {props.articles.map((article) => (
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

        <Dialog
            open={!!selectedArticle}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            {selectedArticle && (
                <Article
                    title={selectedArticle.title}
                    content={selectedArticle.text}
                    image={selectedArticle.image}
                />
            )}
        </Dialog>
    </Container>
    )
}

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

export default ArticleGridObject;