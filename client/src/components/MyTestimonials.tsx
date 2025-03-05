import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper, Button, Box} from '@mui/material'
interface ItemProps {
    name: string;
    description: string;
    // bannerImage: string;
}
const MyTestimonials = () =>
{
    const items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ];

    return (
        <Box>
            <Carousel>
                {
                    items.map( (item, i) => <Item key={i} name={item.name} description={item.description}  /> )
                }
            </Carousel>
        </Box>

    )
}

function Item(props:ItemProps)
{
    return (
        <Paper>
            <h2>{props.name}</h2>
            <p>{props.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default MyTestimonials;