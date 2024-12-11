import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, IconButton, MenuItem } from "@mui/material";
import { useUserAuthStateStore } from "../store/";
import {BASE_URL} from "../utility/config";

function NavBar(props: AppBarProps) {
    const redirect = useNavigate();
    const { userId, userAuthToken, authenticated, resetState } = useUserAuthStateStore((state) => ({
        userId: state.userId,
        userAuthToken: state.userAuthToken,
        authenticated: state.authenticated,
        resetState: state.resetState,
    }));

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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ display: "flex", flexGrow: 1 }}>

                        <Button
                            component={Link}
                            to="/petitions"
                            sx={{ my: 1, color: "white", display: "block" }}
                        >
                            Petitions
                        </Button>
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
                    </Box>

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
        </Box>
    );
}

export default NavBar;
