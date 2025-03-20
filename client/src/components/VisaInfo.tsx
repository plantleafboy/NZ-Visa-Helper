import {Box, Container, Typography} from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ArticleDropdown from "./ArticleDropdown";
import EducationOptions from "./EducationOptions";

const VisaInfo = () => {
    return (
        <Box>
            <NavBar />
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center"
                height: "100vh",
                mb: 10
            }}>
                <EducationOptions></EducationOptions>
                <ArticleDropdown></ArticleDropdown>

            </Container>
            {/*<Footer text={"Footer to add"}></Footer>*/}
        </Box>
    )
}

export default VisaInfo;