import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";

interface ArticleProps {
    title: string;
    content: string;
    image: string;
}

const Article = (props: ArticleProps) => {
    return (
        <Box>{props.content}</Box>
    )
}

export default Article;