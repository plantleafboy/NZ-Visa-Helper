import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {
    Paper,
    Alert, Avatar,
    Button, CardActions,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, IconButton, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useUserAuthStateStore} from "../store";
import NavBar from "./NavBar";
import {Delete, Edit } from "@mui/icons-material";
import PetitionListObject from "./utility/other/PetitionListObject";
import Pagination from "./utility/other/Pagination";
import CSS from "csstype";
import { BASE_URL } from "../utility/config";
import Footer from "./Footer";

    const UserProfile = () => {
        const {userId, userAuthToken, authenticated, resetState, userPassword, userEmail} = useUserAuthStateStore((state) => ({
            userId: state.userId,
            userAuthToken: state.userAuthToken,
            authenticated: state.authenticated,
            resetState: state.resetState,
            userPassword: state.password,
            userEmail: state.userEmail
        }));
        const [user, setUser] = React.useState<User>({firstName: "", lastName: "", email: ""});
        const [errorFlag, setErrorFlag] = React.useState(false);
        const [errorMessage, setErrorMessage] = React.useState("");
        const [profileImage, setProfileImage] = React.useState<string>("");
        const [petitions, setPetitions] = React.useState<Array<Petition>>([]);
        const [emailError, setEmailError] = useState(false)
        const [passwordError, setPasswordError] = useState(false)
        const [changePasswordError, setChangePasswordError] = useState(false)

        const [fieldErrors, setFieldErrors] = React.useState<FieldError>({
            email: "",
            password: "",
            changePassword: ""
        });
        const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

        const [openEditDialog, setOpenEditDialog] = React.useState(false);
        const [userPatch, setUserPatch] = React.useState<PatchUser>({
            firstName: "",
            lastName: "",
            email: "",
            oldPassword: "",
            newPassword: "",
        });

        const card: CSS.Properties = {
            padding: "10px",
            margin: "auto",
            display: "block",
            width: "fit-content"
        };

        const [snackOpen, setSnackOpen] = React.useState(false)
        const [snackMessage, setSnackMessage] = React.useState("")
        const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }
            setSnackOpen(false);
        };

        const getUser = () => {
            axios
                .get(`${BASE_URL}/api/v1/users/${userId}`, {
                    headers: { "x-authorization": userAuthToken },
                })

                .then(
                    (response) => {
                        setErrorFlag(false);
                        setErrorMessage("");
                        // console.log('log here: ', response.data);
                        setUser(response.data);
                    },
                    (e) => {
                        setErrorFlag(true);
                        setErrorMessage(e.toString());
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
                        setProfileImage(imageUrl);
                    },
                    (error) => {
                        setErrorFlag(true);
                        setErrorMessage(error.toString());
                    },
                );
        };

        const handleProfileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                const r = new FileReader();
                r.onload = (c) => {
                    if (c.target?.result) {
                        const arrayBuffer = c.target.result as ArrayBuffer;
                        axios.put(`${BASE_URL}/api/v1/users/${userId}/image`, arrayBuffer,
                            {
                                headers: {
                                    'x-authorization': userAuthToken,
                                    'content-type': file.type,
                                }, responseType: 'arraybuffer',
                            },).then(
                            () => {
                                getUserImage();
                                setErrorFlag(false);
                                setErrorMessage("");
                            }, (e) => {
                                if (e.response.status === 413) {
                                    setErrorMessage("Payload too big")
                                } else {
                                    setErrorMessage(e.response.statusText || e.toString() );
                                }
                                setErrorFlag(true)
                            },
                        );

                    }
                }; r.readAsArrayBuffer(file);
            }
        };

        const deleteProfilePicture= () => {
            axios
                .delete(`${BASE_URL}/api/v1/users/${userId}/image`, {
                    headers: { "x-authorization": userAuthToken },
                })
                .then(
                    (response) => {
                        setErrorFlag(false);
                        setErrorMessage("");
                        setProfileImage("");
                    },
                    (error) => {
                        setErrorMessage(error.toString());
                        setErrorFlag(true);
                    },
                );
        };

        const handleDeleteDialogOpen = () => {
            setOpenDeleteDialog(true);
        };
        const handleDeleteDialogClose = () => {
            setOpenDeleteDialog(false);
        };

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setUserPatch({ ...userPatch, [name]: value });
        };

        const handleEditDialogOpen = () => {
            setUserPatch({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                oldPassword: "",
                newPassword: "",
            });
            setOpenEditDialog(true);
        };

        const handleEditDialogClose = () => {
            setUserPatch({
                firstName: "",
                lastName: "",
                email: "",
                oldPassword: "",
                newPassword: "",
            });
            setOpenEditDialog(false);
        };

        React.useEffect(() => {
            getPetitions()
            getUser();
            getUserImage();
        }, [userId]);

        const validateFields = (editedUser :PatchUser) => {
            const { firstName, lastName, email, oldPassword, newPassword } = userPatch;
            const currFieldErrors :FieldError = {
                email: "",
                password: "",
                changePassword: ""
            }
            let hasError :boolean = false;

            if (!/\S+@\S+\.\S+/.test(email)) {
                setEmailError(true);
                currFieldErrors.email = "Invalid email address, requires format: jane@doe.nz";
                hasError = true;
                setFieldErrors(currFieldErrors)
                // console.log('error occur0', fieldErrors);
                return !hasError;
            } else setEmailError(false);

            if (!oldPassword && !newPassword) {
                return true;
            }

            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if ((newPassword.length < 6) || !expression.test(newPassword)) {

                setPasswordError(true);
                currFieldErrors.changePassword = "Password requires at least 6 characters long and must include at least one: Uppercase character, number and special character";
                hasError = true;
                setFieldErrors(currFieldErrors)

                // console.log('error occur1', fieldErrors)
                return !hasError;
            } else setPasswordError(false);


        if (!(oldPassword === userPassword)) {
            // console.log('error occur2')
                setChangePasswordError(true);
                currFieldErrors.password = "old Password does not match";
                hasError = true;
                setFieldErrors(currFieldErrors)
                return !hasError;
            } else setPasswordError(false);

            setFieldErrors(currFieldErrors)
            return !hasError;

        };
        const editUserInfo = (passedUser: PatchUser) => {
            // console.log('current log: ', passedUser);
            // console.log('proper pass current log: ', userPatch);
            const editedUser: PatchUser = { ...passedUser };

            Object.keys(editedUser).forEach((key) => {
                if (editedUser[key as keyof PatchUser] === "") {
                    delete editedUser[key as keyof PatchUser];
                }
            });

            // } console.log('out if')
            axios
                .patch(`${BASE_URL}/api/v1/users/${userId}`, editedUser, {
                    headers: { "x-authorization": userAuthToken },
                })
                .then(
                    (response) => {
                        setErrorFlag(false);
                        setErrorMessage("");
                        setUser(response.data);
                    },
                    (error) => {
                        setErrorFlag(true);
                        setErrorMessage(error.response.statusText);
                    },
                )
                .finally(() => {
                    getUser();
                });
        };
        const getPetitions = () => {
            axios.get(`${BASE_URL}/api/v1/petitions?ownerId=${userId}`, {
                })
                .then((response) => {
                    console.log("API Response: ", response.data);
                    setErrorFlag(false);
                    setErrorMessage("");
                    setPetitions(response.data.petitions);
                }, (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.response.statusText)
                });
        }

        const petition_rows = () => petitions.map((petition: Petition) => <PetitionListObject key={petition.petitionId + petition.title} petition={petition}/>);

        // const getPetitions = () => {
        //     axios.get(`${BASE_URL}/api/v1/petitions?ownerId=${userId}`)
        //         .then(
        //             axios.spread((data1, data2) => {
        //                 setPetitions([...data1.data.petitions, ...data2.data.petitions]);
        //             }),
        //         );
        // };

        if (errorFlag) {
            return (
                <div>
                    <h1>Error</h1>
                    <div style={{color: "red"}}>
                        {errorMessage}
                    </div>
                    <Link to={"/profile"}>Back to profile</Link>
                </div>
            );
        } else {
            // @ts-ignore
            return (
                <div>
                    <NavBar/>
                    <CardActions
                        sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h1>{user.firstName} {user.lastName}</h1>
                        <h2>Email: {userEmail}</h2>
                        <Avatar alt="" src={profileImage} sx={{width: "200px", height: "200px", objectFit: "cover"}}/>
                        <div>
                            <IconButton color="primary" component="label" size="small">
                                <Edit/>
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleProfileInput}
                                />
                            </IconButton>
                            {profileImage && (
                                <IconButton
                                    color="error"
                                    onClick={handleDeleteDialogOpen}
                                    size="small"
                                >
                                    <Delete/>
                                </IconButton>
                            )}
                        </div>
                        <Dialog
                            open={openDeleteDialog}
                            onClose={handleDeleteDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Delete Image?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this image?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        deleteProfilePicture();
                                        handleDeleteDialogClose();
                                    }}
                                    autoFocus
                                >
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button
                            variant="outlined"
                            endIcon={<EditIcon />}
                            onClick={handleEditDialogOpen}
                            size={"medium"}
                        >
                            Edit Profile
                        </Button>
                        <Dialog
                            open={openEditDialog}
                            onClose={handleEditDialogClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} py={1}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            variant="outlined"
                                            size={"small"}
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            value={userPatch.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            size={"small"}
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            value={userPatch.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            size={"small"}
                                            fullWidth
                                            id="editEmail"
                                            label="Email Address"
                                            name="email"
                                            value={userPatch.email}
                                            onChange={handleInputChange}
                                        /> <span>{emailError && (<div>{fieldErrors.email}</div>)}</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            size={"small"}
                                            fullWidth
                                            name="oldPassword"
                                            label="Current Password"
                                            type="password"
                                            id="current-password"
                                            value={userPatch.oldPassword}
                                            onChange={handleInputChange}
                                        /> <span>{passwordError && (<div>old Password does not match</div>)}</span>
                                        {/*<span>{passwordError && (<div>{fieldErrors.password}</div>)}</span>*/}
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                            variant="outlined"
                                            size={"small"}
                                            fullWidth
                                            name="newPassword"
                                            label="New Password"
                                            type="password"
                                            id="new-password"
                                            value={userPatch.newPassword}
                                            onChange={handleInputChange}
                                        /> <span>{passwordError && (<div>Password requires at least 6 characters long and must include at least one: Uppercase character, number and special character</div>)}</span>
                                        {/*<span>{changePasswordError && (*/}
                                        {/*<div>{fieldErrors.changePassword}</div>)}</span>*/}
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleEditDialogClose} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                        if (!validateFields(userPatch)) {
                                            //console.log('here if')
                                            return;
                                        }
                                        editUserInfo(userPatch);
                                        handleEditDialogClose();
                                    }}
                                    autoFocus
                                    disabled={
                                        !userPatch.firstName &&
                                        !userPatch.lastName &&
                                        !userPatch.email &&
                                        (!userPatch.newPassword || !userPatch.oldPassword)
                                    }
                                >
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar
                            autoHideDuration={6000}
                            open={snackOpen}
                            onClose={handleSnackClose}
                            key={snackMessage}
                        >
                            <Alert onClose={handleSnackClose} severity="success" sx={{
                                width: '100%'
                            }}>
                                {snackMessage}
                            </Alert>
                        </Snackbar>
                    </CardActions>
                    <Paper elevation={3} style={card} sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', mt: 4 }}>
                        <Typography
                            sx={{ mt: 6, mb: 2 }}
                            variant={"h4"}
                            fontWeight={"bold"}
                        >
                            Owned Petitions
                        </Typography>
                            {petition_rows()}
                    </Paper>
                </div>
            );
        }
    };
export default UserProfile;

