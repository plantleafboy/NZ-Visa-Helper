import {Box, Button, Container, TextField} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";
import { useUserAuthStateStore } from "../store";
const Login = () => {
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [errorMessage, setErrorMessage] = React.useState("");
    const [formError, setFormError] = React.useState(false);
    const setState = useUserAuthStateStore((state) => state.setState);
    const authenticated :boolean = useUserAuthStateStore((state) :boolean => {
        return state.authenticated;});
    const redirect = useNavigate();


    const [user, setUser] = React.useState<LoginUser>({
        email: "",
        password: "",
    });

    const validateFields = () => {
        const { email, password } = user;
        let hasError = false;
        if (!email || !password) {
            setEmailError(true);
            setPasswordError(true);
            setFormError(true);
            setErrorMessage("Both fields are required");
            hasError = true;
        }
        return !hasError;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };


    const handleLogin = () => {
        axios.post(process.env.APP_URL +`/api/v1/users/login`, user).then(
            (response) => {
                setEmailError(false);
                setPasswordError(false);
                setErrorMessage("");
                setState(response.data.userId, response.data.token, user.password, user.email);
                redirect("/");
            },
            (error) => {
                setFormError(true);
                console.log('login log: ', error.response.status)
                if (error.response.status === 401) {
                    setErrorMessage("Either the email or password does not match")
                } else {
                    setErrorMessage("Either the email or password does not match");
                }
            },
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFields()) {
            handleLogin();
        }
    }

    return (
        <React.Fragment>
            <NavBar />
            <Container component="main">
                {authenticated && (
                    <h1>USER IS LOGGED IN</h1>
                )}
                {!authenticated && (
                    <Box className="login" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                        <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                            <h2>Login Form</h2>
                            <TextField
                                label="Email"
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                                color="secondary"
                                type="email"
                                sx={{mb: 3}}
                                fullWidth
                                name="email"
                                // value={user.email}
                                error={emailError}
                            />
                            <TextField
                                label="Password"
                                onChange={handleInputChange}
                                required
                                name="password"
                                variant="outlined"
                                color="secondary"
                                type="password"
                                // value={user.password}
                                error={passwordError}
                                fullWidth
                                sx={{mb: 3}}
                            />
                            <Button variant="outlined" color="secondary" type="submit">Login</Button>
                            <span>{formError && (<div>{errorMessage}</div>)}</span>
                        </form>
                        <small>Need an account? <Link to="/sign-up">Register here</Link></small>
                    </Box>
                )}
            </Container>

        </React.Fragment>
    );
}


export default Login;