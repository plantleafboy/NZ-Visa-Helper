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
    // const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
    // const openMenu = (event:React.MouseEvent<HTMLElement>) => {
    //     setAnchorNav(event.currentTarget);
    // };
    // const closeMenu = () => {
    //     setAnchorNav(null);
    // }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [userImage, setUserImage] = React.useState<string>("");
    const [useStateElement, setUseStateElement] = React.useState<null | HTMLElement>(null);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const logState = useUserAuthStateStore((state) => {
        return state
    });
    React.useEffect(() => {
        // getUserImage();
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

    const handleProfileClose = () => {
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
                                    sx={{ my: 1, color: "white", display: "block", fontSize: 16, fontWeight: "medium",
                                        textTransform: "none",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            width: "100%",
                                            transform: "scaleX(0)",
                                            height: "2px",
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: "#FFD700",
                                            transition: "transform 0.25s ease-out",
                                        },
                                        "&:hover::after": {
                                            transform: "scaleX(1)",
                                        },
                                    }}
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
                        </Box>
                        <Box sx={{display:{xs:'flex',md:'none'}}}>
                            <IconButton
                                size='large' edge='start' color='inherit' onClick={handleClick}
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}>
                                <MenuIcon/>
                            </IconButton>

                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        component={Link}
                                        to={page.path}
                                        sx={{ my: 1, color: "Black" }}
                                        onClick={handleClose}
                                    >
                                        {page.name}
                                    </MenuItem>
                                ))}
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
                            onClose={handleProfileClose}
                        >
                            <MenuItem component={Link} to="/login" onClick={handleProfileClose}>
                                Login
                            </MenuItem>
                            <MenuItem component={Link} to="/sign-up" onClick={handleProfileClose}>
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
                            onClose={handleProfileClose}
                        >
                            <MenuItem
                                component={Link}
                                to={`/profile`}
                                onClick={handleProfileClose}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    logoutUser();
                                    handleProfileClose();
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
