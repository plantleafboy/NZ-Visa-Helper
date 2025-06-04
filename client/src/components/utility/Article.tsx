import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

interface ArticleProps {
    title: string;
    content: string;
    image: string;
}

const Article = (props: ArticleProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '900px',
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    flexShrink: 0,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box
                    component="img"
                    src={props.image}
                    alt={props.title}
                    sx={{
                        width: '100%',
                        height: 250,
                        objectFit: 'cover',
                    }}
                />
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ px: 3, py: 2 }}
                >
                    {props.title}
                </Typography>
            </Box>

            {/* Scrollable Content */}
            <Box
                sx={{
                    overflowY: 'auto',
                    px: 3,
                    py: 2,
                }}
            >
                <Typography variant="body1" textAlign="center" color="text.secondary" whiteSpace="pre-line">
                    {props.content}
                </Typography>
            </Box>
        </Box>
    )
}

export default Article;