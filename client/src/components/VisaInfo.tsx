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
                //justifyContent: // Centers vertically
                height: "100vh",
            }}>

                <Typography variant="h4" sx={{ mb: 4, mt: 2}}>Visa Info & FAQ</Typography>
                <ArticleDropdown></ArticleDropdown>
                <EducationOptions></EducationOptions>

            </Container>
            <Footer text={"Footer to add"}></Footer>
        </Box>
    )
}

export default VisaInfo;