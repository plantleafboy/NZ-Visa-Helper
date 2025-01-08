import {Box, Container} from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ArticleDropdown from "./ArticleDropdown";

const VisaInfo = () => {
    return (
        <Box>
            <NavBar />
            <Container>
                <ArticleDropdown></ArticleDropdown>
            </Container>
            <Footer text={"Footer to add"}></Footer>
        </Box>
    )
}

export default VisaInfo;