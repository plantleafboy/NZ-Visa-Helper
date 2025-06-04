import {Container} from "@mui/material";
import VPCalculator from "../utility/VPCalculator";
import ArticleGridObject from "../utility/ArticleGridObject";

const WorkAndLeave = () => {
    const articles: ArticleObject[] = [
        {
            id: 1,
            title: "WORK in NZ",
            description: "default text",
            text: "same texts",
            image: "/images/hiking.png",
            alt: "Students discussing at a table"
        },
        {
            id: 2,
            title: "LEAVE in NZ",
            description: "default text",
            text: "same texts",
            image: "/images/students on laptops.png",
            alt: "Students at a cultural event"
        },
    ];

    return (
        <Container>
            <VPCalculator/>
            <ArticleGridObject articles={articles}/>
        </Container>
    )
}

export default WorkAndLeave;