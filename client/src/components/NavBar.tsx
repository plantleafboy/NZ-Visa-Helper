import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import axios from "axios";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Avatar, Box, Button, IconButton, MenuItem, MenuList, Typography} from "@mui/material";
import { useUserAuthStateStore } from "../store/";
import {BASE_URL} from "../utility/config";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import MenuIcon from '@mui/icons-material/Menu';


function NavBar(props: AppBarProps) {
    const pages = [
        { name: "About Us", path: "/about" },
        { name: "Visa Info", path: "/visa-info" },
        { name: "Book an Appointment", path: "/book-appointment" },
        { name: "Contact Us", path: "/contact-us" }
    ];

    const redirect = useNavigate();
    const { userId, userAuthToken, authenticated, resetState } = useUserAuthStateStore((state) => ({
        userId: state.userId,
        userAuthToken: state.userAuthToken,
        authenticated: state.authenticated,
        resetState: state.resetState,
    }));
    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
    const openMenu = (event:React.MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorNav(null);
    }

    const [userImage, setUserImage] = React.useState<string>("");
    const [useStateElement, setUseStateElement] = React.useState<null | HTMLElement>(null);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const logState = useUserAuthStateStore((state) => {
        return state
    });
    React.useEffect(() => {
        getUserImage();
    }, []);

    const logoutUser = () => {
        console.log('log here: ', logState);
        axios
            .post(
                "`${BASE_URL}/api/v1/users/logout", {},
                {headers: {'x-authorization': userAuthToken,
                    },
                },
            )
            .then(
                () => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    resetState();
                    redirect("/login");
                },
                (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                },
            );
    };

    const getUserImage = () => {
        axios
            .get(`${BASE_URL}/api/v1/users/${userId}/image`, {
                responseType: "arraybuffer",
            })
            .then(
                (response) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    const imageUrl = URL.createObjectURL(
                        new Blob([response.data], {
                            type: response.headers["content-type"],
                        }),
                    );
                    setUserImage(imageUrl);
                },
                (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                },
            );
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUseStateElement(event.currentTarget);
    };

    const handleClose = () => {
        setUseStateElement(null);
    };

    return (
            <AppBar position="static">
                <Toolbar>
                        <IconButton size='large' edge={'start'} color={'inherit'} aria-label={'logo'} sx={{display: {xs:'none', md: 'flex'}}}>
                            <AirplaneTicketIcon/>
                        </IconButton>
                        <Typography variant='h6' component='div' sx={{flexGrow:1, display: {xs:'none', md: 'flex'}}}> Peng Visa Service </Typography>

                        <Box sx={{display:{xs:'none',md:'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    to={page.path}
                                    sx={{ my: 1, color: "white", display: "block" }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                            {/*<Button*/}
                            {/*    component={Link}*/}
                            {/*    to="/petitions"*/}
                            {/*    sx={{ my: 1, color: "white", display: "block" }}*/}
                            {/*>*/}
                            {/*    Example link*/}
                            {/*</Button>*/}
                            <Button>About us</Button>
                            <Button>Visa Info</Button>
                            <Button>Book an Appointment</Button>
                            <Button>Contact Us</Button>
                        </Box>
                        <Box sx={{display:{xs:'flex',md:'none'}}}>
                            <IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
                                <MenuIcon/>
                            </IconButton>
                            <Menu open={Boolean(anchorNav)} onClose={closeMenu} sx={{display:{xs:'flex',md:'none'}}}>
                                <MenuList>
                                    <MenuItem>About us</MenuItem>
                                    <MenuItem>Visa Info</MenuItem>
                                    <MenuItem>Book an Appointment</MenuItem>
                                    <MenuItem>Contact Us</MenuItem>
                                </MenuList>
                            </Menu>
                            <IconButton size='large' edge={'start'} color={'inherit'} aria-label={'logo'} sx={{display: {xs:'flex', md: 'none'}}}>
                                <AirplaneTicketIcon/>
                            </IconButton>
                            <Typography variant='h6' component='div' sx={{flexGrow:1, display: {xs:'flex', md: 'none'}}}> Peng Visa Service </Typography>
                        </Box>
                        <IconButton
                            size="large"
                            aria-label="profile-options"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar alt="" src={userImage} />
                        </IconButton>

                    {!authenticated && (
                        <Menu
                            id="menu-appbar"
                            anchorEl={useStateElement}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(useStateElement)}
                            onClose={handleClose}
                        >
                            <MenuItem component={Link} to="/login" onClick={handleClose}>
                                Login
                            </MenuItem>
                            <MenuItem component={Link} to="/sign-up" onClick={handleClose}>
                                Register
                            </MenuItem>
                        </Menu>
                    )}

                    {authenticated && (
                        <Menu
                            id="menu-appbar"
                            anchorEl={useStateElement}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(useStateElement)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                component={Link}
                                to={`/profile`}
                                onClick={handleClose}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    logoutUser();
                                    handleClose();
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    )}
                </Toolbar>
            </AppBar>
    );
}

export default NavBar;
