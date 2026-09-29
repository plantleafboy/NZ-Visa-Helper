import {Box, Button} from "@mui/material";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Box>
            {/* <h1>Not Found</h1> */}
            <h3>Exception Error session status: neither complete or open. Please try payment again</h3>
            <Button variant="contained" color="primary" size="large" component={Link} to="/visa-info">
                                    Learn More
            </Button>
        </Box>
    )
}

export default NotFound;