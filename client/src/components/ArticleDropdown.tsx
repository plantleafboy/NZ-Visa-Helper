import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, Box} from "@mui/material";
import { motion } from "motion/react"
const ArticleDropdown = () => {

    const MotionAccordion = motion(Accordion);
    const accordionVariants = {hidden: {opacity: 0 }, show: {opacity: 1}}

    return (
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", width: 0.6}}
            >
                <Typography variant="h3" sx={{mb: 2}}>Info & FAQ</Typography>
                <motion.section
                    variants={{ hidden: {opacity: 0},
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.25,
                                },
                            },
                    }}
                    initial="hidden"
                    animate="show"
                >
                    <MotionAccordion
                        variants={accordionVariants}
                        sx={{backgroundColor: "#f5f5f5"}}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                padding: "12px 24px", // Padding inside the summary
                                fontWeight: "bold", // Makes title bold
                                textAlign: "left", // Aligns text to the left
                                }}
                        >
                            <Typography component="span" sx={{ml: 0.5, textAlign:"right"}}>Accordion test</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </MotionAccordion>
                    <MotionAccordion
                        variants={accordionVariants}
                        sx={{backgroundColor: "#f5f5f5"}}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                padding: "12px 24px", // Padding inside the summary
                                fontWeight: "bold", // Makes title bold
                                textAlign: "left", // Aligns text to the left
                            }}
                        >
                            <Typography component="span" sx={{ml: 0.5, textAlign:"right"}}>Accordion test</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </MotionAccordion><MotionAccordion
                    variants={accordionVariants}
                    sx={{backgroundColor: "#f5f5f5"}}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                            padding: "12px 24px", // Padding inside the summary
                            fontWeight: "bold", // Makes title bold
                            textAlign: "left", // Aligns text to the left
                        }}
                    >
                        <Typography component="span" sx={{ml: 0.5, textAlign:"right"}}>Accordion test</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </MotionAccordion>
                    <MotionAccordion
                        variants={accordionVariants}
                        sx={{backgroundColor: "#f5f5f5"}}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                padding: "12px 24px", // Padding inside the summary
                                fontWeight: "bold", // Makes title bold
                                textAlign: "left", // Aligns text to the left
                            }}
                        >
                            <Typography component="span" sx={{ml: 0.5, textAlign:"right"}}>Accordion test</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </MotionAccordion>
                </motion.section>
            </Box>
    )

}

export default ArticleDropdown;