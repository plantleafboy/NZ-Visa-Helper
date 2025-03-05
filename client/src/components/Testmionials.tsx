import {Paper, Button, Box} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import banner_1 from "../assets/banner_1.jpg";
import banner_2 from "../assets/banner_2.jpg";
import banner_3 from "../assets/banner_3.jpg";

interface ItemProps {
    name: string;
    description: string;
    bannerImage: string;
}

const MyCarousel = () => {
    const items: ItemProps[] = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            bannerImage: '/images/OrbitProtect-Insurance.jpg',
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            bannerImage: '/images/OrbitProtect-Insurance.jpg',
        },
        {
            name: "Random Name #3",
            description: "Another banner here!",
            bannerImage: '/images/OrbitProtect-Insurance.jpg',
        },
    ];

    return (
        <Box sx={{ width: "80%", mx: "auto", p: 2, border: "1px solid #ddd", borderRadius: 2, display: "flex",
            justifyContent: "center",
            alignItems: "center",}}>
            <Carousel autoPlay interval={2000} animation="slide" indicators={false}>
                {/*items.map( (item, i) => <Item key={i} name={item.name} description={item.description} bannerImage={item.bannerImage} /> )*/}
                {items.map((item, i) => (
                    <Item key={i} {...item} />
                ))}
            </Carousel>
        </Box>

    );
};

function Item(props: ItemProps)
{
    return (
        <Paper sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 3,
            width: "100%",
            maxWidth: "600px",
            mx: "auto",
        }}>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <Box
                component="img"
                src={props.bannerImage}
                alt={props.name}
                sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "400px",
                    objectFit: "cover",
                    borderRadius: 2,
                    mt: 2,
                }}
            />
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default MyCarousel;