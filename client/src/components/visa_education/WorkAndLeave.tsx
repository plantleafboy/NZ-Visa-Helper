import {Container} from "@mui/material";
import VPCalculator from "../utility/VPCalculator";
import ArticleGridObject from "../utility/ArticleGridObject";

const WorkAndLeave = () => {
    const articles: ArticleObject[] = [
        {
            id: 1,
            title: "Work in New Zealand",
            description:  "There are a vast selection of roles you can apply for coming into New Zealand, with several companies able to provide a working visa, Please enquire to find out more. ",
            text: "here are a vast selection of roles you can apply for coming into New Zealand, with several companies able to provide a working visa, Please enquire to find out more. ",
            image: "/images/hiking.png",
            alt: "Students discussing at a table"
        },
        {
            id: 2,
            title: "Leave in New Zealand",
            description: "New Zealand companies are entitled to provide a standard 4 weeks annual leave with pay (or more) and 10 days sick leave. Public holidays are throughout the year where we celebrate the historic events and national days in our culture. Waitangi day and matariki are enjoyed by many as heritage days.",
            text: "New Zealand companies are entitled to provide a standard 4 weeks annual leave with pay (or more) and 10 days sick leave. Public holidays are throughout the year where we celebrate the historic events and national days in our culture. Waitangi day and matariki are enjoyed by many as heritage days.",
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