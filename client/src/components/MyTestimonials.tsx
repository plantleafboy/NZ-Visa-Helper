import React, {useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper, Button, Box, Typography} from '@mui/material'

interface ItemProps {
    name: string;
    description: string;
    // bannerImage: string;
}
const MyTestimonials = () =>
{
    return (
        <Box component="div" sx={{mt: 2, color: "#494949", display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}} >
            <Typography variant='h4'>Testimonials</Typography>
            <br/>
            <Carousel
                className="SecondExample"
                autoPlay={true}
                animation="slide"
                indicators={true}
                duration={500}
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={false}
                cycleNavigation={true}
                fullHeightHover={true}
                swipe={true}
                sx={{width: '70%', height: '100%'}}
            >
                {
                    items.map((item, index) => {
                        return <Project item={item} key={index}/>
                    })
                }
            </Carousel>
            <br/>
        </Box>

    )
}

type Item = {
    name: string,
    description: string,
    color: string,
    href: string
}

interface ProjectProps
{
    item: Item
}

function Project({item}: ProjectProps) {
    return (
        <Paper
            className="Project"
            sx={{
                backgroundColor: item.color,
                width: '80%',  // Adjust width as needed (e.g., '80%', '500px', etc.)
                maxWidth: '800px',
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // <-- Centers content inside
                textAlign: "center", // Centers text content
                margin: "auto" // <-- Ensures each item is centered
            }}
            elevation={10}
        >
            <Typography variant='h5'>{item.name}</Typography>
            <br/>
            <Typography>{item.description}</Typography>
        </Paper>
    )
}

const items: Item[] = [
    {
        name: "Lear Music Reader",
        description: "A PDF Reader specially designed for musicians.",
        color: "#64ACC8",
        href: 'https://github.com/Learus/Lear-Music-Reader'
    },
    {
        name: "Hash Code 2019",
        description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
        color: "#7D85B1",
        href: 'https://github.com/Learus/HashCode2019'
    },
    {
        name: "Terrio",
        description: "A exciting mobile game game made in the Unity Engine.",
        color: "#CE7E78",
        href: 'https://play.google.com/store/apps/details?id=com.Brewery.Terrio'
    },
    {
        name: "React Carousel",
        description: "A Generic carousel UI component for React using material ui.",
        color: "#C9A27E",
        href: 'https://github.com/Learus/react-material-ui-carousel'
    }
]
// https://learus.github.io/react-material-ui-carousel/

export default MyTestimonials;