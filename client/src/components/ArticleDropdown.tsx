import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {Accordion, Box} from "@mui/material";
import { motion } from "motion/react"
const ArticleDropdown = () => {

    const MotionAccordion = motion(Accordion);
    const accordionVariants = {hidden: {opacity: 0 }, show: {opacity: 1}}

    return (
        <div>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", mb: 4}}
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
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span">Accordion 1</Typography>
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
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span">Accordion 1</Typography>
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
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span">Accordion 1</Typography>
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
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span">Accordion 1</Typography>
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
        </div>
    )

}

export default ArticleDropdown;