import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel,
    Stack,
    TextField
} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useUserAuthStateStore} from "../store";
import NavBar from "./NavBar";
import {BASE_URL} from "../utility/config";
import VPCalculator from "./utility/VPCalculator";
import Agreement from "./Agreement";
const SignUp = () => {
    const [fieldErrors, setFieldErrors] = React.useState<FieldError>({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [formError, setFormError] = React.useState(false);
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);

    const setState = useUserAuthStateStore((state) => state.setState);
    const authenticated: boolean = useUserAuthStateStore((state): boolean => {
        return state.authenticated;
    });
    const redirect = useNavigate();
    const [newUserDetails, setNewUserDetails] = React.useState<NewUserDetails>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [user, setUser] = React.useState<LoginUser>({
        email: "",
        password: "",
    });

    const handleLogin = () => {
        axios
            .post(`${BASE_URL}/api/v1/users/login`, {
                email: newUserDetails.email,
                password: newUserDetails.password,
            })
            .then(
                (response) => {
                    setFormError(false);
                    setErrorMessage("");
                    setState(response.data.userId, response.data.token, newUserDetails.password, newUserDetails.email);
                    console.log('checking here: ', useUserAuthStateStore);
                    redirect("/");
                },
                (error) => {
                    setFormError(true);
                    setErrorMessage(error.response.data.message || error.toString());
                },
            );
    };
    const handleRegister = () => {
        console.log("In handleRegister block")
        axios.post(`${BASE_URL}/api/v1/users/register`, newUserDetails)
            .then((response) => {
                setFormError(false);
                setErrorMessage("");
                setNewUserDetails(response.data);
                handleLogin();
            })
            .catch((e) => {
                // Improved error handling
                if (e.response) {
                    if (e.response.status === 403) {
                        setErrorMessage("This email is already in use!");
                    } else {
                        setErrorMessage(e.response.statusText);
                    }
                } else if (e.request) {
                    setErrorMessage("No response received from the server.");
                } else {
                    setErrorMessage("Error occurred while making the request.");
                }
                setFormError(true);
            });
    };

    // const handleRegister = () => {
    //     console.log("In handleRegister block")
    //     axios.post(`${BASE_URL}/api/v1/users/register`, newUserDetails)
    //         .then((response) => {
    //             setFormError(false);
    //             setErrorMessage("");
    //             setNewUserDetails(response.data);
    //             handleLogin();
    //         },
    //         (e) => {
    //             if (e.response.status === 403) {
    //                 setErrorMessage("This email is already in use!");
    //
    //             } else setErrorMessage(e.response.statusText);
    //             setFormError(true);
    //
    //         },
    //     );
    // };
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewUserDetails({...newUserDetails, [name]: value});
    };

    const validateFields = () => {
        if (!checked) {
            setError(true);
            return false;
        } else {
            setChecked(true);
            setError(false);
        }
        const {firstName, lastName, email, password} = newUserDetails;
        const currFieldErrors: FieldError = {
            email: "",
            password: "",
        }
        let hasError: boolean = false;
        if (!firstName || !lastName || !email || !password) {
            setFormError(true);
            setErrorMessage("All fields are required");
            console.log("All fields are required")
            hasError = true;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            // setFieldErrors({ ...fieldErrors, [email]:  "Invalid email address format, requires jane@doe.nz"})
            currFieldErrors.email = "Invalid email address format, requires jane@doe.nz";
            console.log("Invalid email address format, requires jane@doe.nz")

            hasError = true;
        } else setEmailError(false);

        const expression: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/
        if ((password.length < 6) || !expression.test(password)) {
            setPasswordError(true);
            currFieldErrors.changePassword = "Password requires at least 6 characters and must include atl least one: Uppercase character, number and special character";
            hasError = true;
            console.log("Password requires at least 6 characters and must include atl least one: Uppercase character, number and special character")

        } else setPasswordError(false);

        setFieldErrors(currFieldErrors)
        return !hasError;

    };

    const handleSubmit = (e: React.FormEvent) => {
        console.log("In handlesubmit function")
        e.preventDefault();

        const validationError: Boolean = validateFields()
        if (validationError) {
            handleRegister();
        }
    };

    return (
        <React.Fragment>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <script
                src="https://www.google.com/recaptcha/enterprise.js?render=6LdB4xgrAAAAAI2m9KS7D3f2_GaXXorPgPv5D0HF"></script>

            <NavBar/>
            <Container component="main">
                {authenticated && (
                    <h1>ALREADY LOGGED IN</h1>
                )}
                {!authenticated && (
                    <Box className="sign-up"
                         sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4}}>
                        <h1>Sign Up Form</h1>
                        {/*action="https://httpbin.org/post" method="post"*/}
                        <form  onSubmit={handleSubmit} id="sign-up-form" noValidate>
                            <Stack spacing={2} direction="row" sx={{marginBottom: 4, width: '100%'}}>
                                <FormControl margin="normal">
                                    <FormLabel>First Name</FormLabel>
                                    <TextField
                                        // label="First Name"
                                        type="text"
                                        onChange={handleInputChange}
                                        name="firstName"
                                        placeholder="Jane"
                                        value={newUserDetails.firstName}
                                        required
                                    />
                                </FormControl>
                                <FormControl margin="normal">
                                    <FormLabel>Last Name</FormLabel>
                                    <TextField
                                        type="text"
                                        onChange={handleInputChange}
                                        name="lastName"
                                        placeholder="Doe"
                                        value={newUserDetails.lastName}
                                        required
                                    />
                                </FormControl>
                            </Stack>
                            <Stack spacing={2} direction="column" sx={{marginBottom: 4, width: '100%'}}>
                                <FormControl margin="dense">
                                    <FormLabel>Email</FormLabel>
                                    <TextField
                                        type="email"
                                        onChange={handleInputChange}
                                        name="email"
                                        placeholder="example@email.com"
                                        value={newUserDetails.email}
                                        error={emailError}
                                        required
                                    /> <span>{emailError && (<div>{fieldErrors.email}</div>)}</span>

                                </FormControl>
                                <FormControl margin="dense">
                                    <FormLabel>Profile Picture</FormLabel>
                                    <input
                                        type="file"
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal">
                                    <FormLabel>Password</FormLabel>
                                    <TextField
                                        type="password"
                                        onChange={handleInputChange}
                                        name="password"
                                        value={newUserDetails.password}
                                        error={passwordError}
                                        required
                                    /> <span>{passwordError && (<div>{fieldErrors.password}</div>)}</span>
                                </FormControl>

                                <Agreement></Agreement>


                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                            name="terms"
                                        />
                                    }
                                    label="I agree to the terms and conditions"
                                />
                                {error && <FormHelperText>You must agree before submitting.</FormHelperText>}



                                <span>{formError && (<div>{errorMessage}</div>)}</span>
                                <html>
                                <body>
                                {/*<form action="?" method="POST">*/}
                                {/*    <div className="g-recaptcha" data-sitekey="your_site_key"></div>*/}
                                {/*    <br/>*/}
                                {/*    <input type="submit" value="Submit"/>*/}
                                {/*</form>*/}
                                </body>
                                </html>

                                <Button type="submit" form="sign-up-form" variant="contained" color="primary">
                                    Sign Up
                                </Button>
                                <div className="g-recaptcha" data-sitekey="6LfD_RgrAAAAAPDimzqDZ51WH_MWcvqGg2tP_YR_"></div>
                                {/*<button className="g-recaptcha"*/}
                                {/*        data-sitekey="6LdB4xgrAAAAAI2m9KS7D3f2_GaXXorPgPv5D0HF"*/}
                                {/*        data-callback='onSubmit'*/}
                                {/*        data-action='submit'>*/}
                                {/*    Submit*/}
                                {/*</button>*/}
                            </Stack>
                        </form>
                        <Button
                            variant="outlined"
                            href="/forms/Applicant Info form.docx"
                            download
                            sx={{ mt: 2 }}
                        > Download Visa Info (DOCX)
                        </Button>
                        <VPCalculator></VPCalculator>
                        <small>Already have an account? <Link to="/login">Login</Link></small>
                    </Box>
                )}
            </Container>
        </React.Fragment>
    )
}

export default SignUp;