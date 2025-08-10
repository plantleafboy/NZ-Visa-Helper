import {Box, Container, Typography} from "@mui/material";
import NavBar from "../NavBar";
import Footer from "../Footer";
import ArticleDropdown from "../visa_education/ArticleDropdown";
import EducationOptions from "../visa_education/EducationOptions";
import EducationArticles from "./EducationArticles";
import WorkAndLeave from "./WorkAndLeave";
import VisaArticles from "./VisaArticles";

const VisaInfo = () => {
    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", mb: 10 }}>
            <NavBar />
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center"
                height: "100vh",
            }}>

                <EducationOptions></EducationOptions>
                <ArticleDropdown></ArticleDropdown>
                <EducationArticles></EducationArticles>
                <VisaArticles></VisaArticles>
                <WorkAndLeave></WorkAndLeave>
            </Container>
            {/*<Footer text={"Footer to add"}></Footer>*/}
        </Box>
    )
}

export default VisaInfo;