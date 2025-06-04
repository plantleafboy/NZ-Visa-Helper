import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Rating,
    Stack,
    useTheme,
    useMediaQuery,
    Paper
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// Define types
interface TestimonialItem {
    name: string;
    description: string;
    color: string;
    href: string;
    avatar?: string;
    rating?: number;
    position?: string;
}

interface TestimonialCardProps {
    item: TestimonialItem;
}

const testimonials: TestimonialItem[] = [
    {
        name: "Lear Music Reader",
        description: "A PDF Reader specially designed for musicians. The interface is intuitive and the software performs exactly as expected. I especially love the page turning feature!",
        color: "#f8f9fa",
        href: 'John Smith',
        avatar: '/images/avatar1.jpg',
        rating: 5,
        position: 'Professional Musician'
    },
    {
        name: "Hash Code 2019",
        description: "My experience with this solution for the 2019 Hash Code problem was fantastic. It's efficient, well-documented, and helped me understand the approach thoroughly.",
        color: "#f8f9fa",
        href: 'Maria Rodriguez',
        avatar: '/images/avatar2.jpg',
        rating: 4.5,
        position: 'Software Engineer'
    },
    {
        name: "Terrio",
        description: "Terrio is an addictive mobile game! The graphics are stunning, gameplay is smooth, and it keeps me coming back for more. Definitely worth downloading.",
        color: "#f8f9fa",
        href: 'Alex Johnson',
        avatar: '/images/avatar3.jpg',
        rating: 5,
        position: 'Game Enthusiast'
    },
    {
        name: "React Carousel",
        description: "This React Carousel component is exactly what I needed for my project. Clean code, easy to implement, and highly customizable. It saved me so much development time!",
        color: "#f8f9fa",
        href: 'Sarah Williams',
        avatar: '/images/avatar4.jpg',
        rating: 4.5,
        position: 'Frontend Developer'
    }
];

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => {
    return (
        <Card
            elevation={2}
            sx={{
                maxWidth: 800,
                mx: 'auto',
                borderRadius: 4,
                position: 'relative',
                overflow: 'visible',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8
                }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -5,
                    left: { xs: 'calc(50% - 24px)', sm: 40 },
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    color: 'white',
                    boxShadow: 2
                }}
            >
                <FormatQuoteIcon fontSize="medium" />
            </Box>

            <CardContent sx={{ pt: 4, px: { xs: 3, sm: 5 }, pb: 4 }}>
                <Typography
                    variant="body1"
                    sx={{
                        mb: 0,
                        fontStyle: 'italic',
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                        color: 'text.primary',
                        pl: { xs: 0, sm: 4 }
                    }}
                >
                    {item.description}
                </Typography>

                <Stack
                    spacing={2}
                    alignItems={{ xs: 'center', sm: 'flex-start' }}
                    sx={{
                        mt: 3,
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}
                >
                    {/*<Avatar*/}
                    {/*    src={item.avatar}*/}
                    {/*    alt={item.href}*/}
                    {/*    sx={{*/}
                    {/*        width: 64,*/}
                    {/*        height: 64,*/}
                    {/*        boxShadow: 2,*/}
                    {/*        border: '2px solid white'*/}
                    {/*    }}*/}
                    {/*/>*/}

                    <Stack spacing={0.5}>
                        <Typography variant="h6" fontWeight="bold" textAlign='center'>
                            {item.href}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign='center'
                        >
                            {item.position}
                        </Typography>

                        {/*<Rating*/}
                        {/*    value={item.rating || 5}*/}
                        {/*    precision={0.5}*/}
                        {/*    readOnly*/}
                        {/*    size="small"*/}
                        {/*    sx={{ mt: 0.5 }}*/}
                        {/*/>*/}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

const ModernTestimonials: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            component="section"
            sx={{
                py: 8,
                px: 2,
                backgroundColor: 'background.default',
                borderRadius: 2,
                width: '100%'
            }}
        >
            <Box textAlign="center" mb={4}>
                <Typography
                    variant="overline"
                    color="primary"
                    fontWeight="bold"
                    letterSpacing={1.5}
                >
                    WHAT PEOPLE SAY
                </Typography>
                <Typography
                    variant="h3"
                    component="h2"
                    fontWeight="bold"
                >
                    Testimonials
                </Typography>
            </Box>

            <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                <Carousel
                    autoPlay
                    animation="slide"
                    indicators
                    navButtonsAlwaysVisible={!isMobile}
                    navButtonsWrapperProps={{
                        style: {
                            padding: '0 20px'
                        }
                    }}
                    navButtonsProps={{
                        style: {
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: '50%',
                            opacity: 0.8,
                            padding: '4px'
                        }
                    }}
                    indicatorContainerProps={{
                        style: {
                            marginTop: '24px'
                        }
                    }}
                    indicatorIconButtonProps={{
                        style: {
                            padding: '5px',
                            color: theme.palette.grey[400]
                        }
                    }}
                    activeIndicatorIconButtonProps={{
                        style: {
                            color: theme.palette.primary.main
                        }
                    }}
                    interval={6000}
                    sx={{ py: 4 }}
                >
                    {testimonials.map((item, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                backgroundColor: 'transparent',
                                px: { xs: 1, sm: 4 },
                                py: 2
                            }}
                        >
                            <TestimonialCard item={item} />
                        </Paper>
                    ))}
                </Carousel>
            </Box>
        </Box>
    );
};

export default ModernTestimonials;