import { Grid, } from "@mui/material";
import { projectImages } from "../Assets/Assets";
import { Link } from "react-router-dom";
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { useState } from "react";
import { Box, Button, TextField, Typography, Card, CardContent, Divider, InputAdornment, IconButton } from "@mui/material";
import {
    EmailIcon,
    LockIcon,
    Visibility,
    VisibilityOff,
    google
} from '../Assets/Icons.js'

import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { postApiRequestWrapper } from "../Networking/Services/ApiCalls";
import { APIConfig, getBaseUrl } from "../Networking/Configuration/ApiConfig";
import { DotLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Redux/Features/UserDetailsSlice.js";
import { showSuccessToast } from "../Components/CostomAlert.jsx";

const RegisterUser = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const [registrationFormData, setRegistrationFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleRegistrationFormSubmit = async () => {

        if (registrationFormData?.password !== registrationFormData?.confirmPassword) {
            setPasswordError(true)
            return
        }

        await handleRegistration()

        return
    }

    const handleRegistration = async () => {
        try {
            setIsLoading(true)
            const BASE_URL = getBaseUrl();
            const REGISTRATION_URL = APIConfig.apiPath.register
            const FINAL_URL = BASE_URL + REGISTRATION_URL
            const response = await postApiRequestWrapper(FINAL_URL, registrationFormData)

            if (response?.success) {
                setIsLoading(false);
                navigate('/');
                setPasswordError(false);
                console.log(response.message);
                showSuccessToast(`Welcome back, ${response?.data?.name}`);
                dispatch(setUserDetails(response?.data));
            }

            setIsLoading(false)
            setPasswordError(true)
            console.log(response.message);
        }
        catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleFormChange = (e) => {
        setPasswordError(false)
        setRegistrationFormData({ ...registrationFormData, [e.target.name]: e.target.value });
    };

    const isAnyFieldEmpty = Object.values(registrationFormData).some(value => value.trim() === "");

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid
                item
                xs={12}
                sm={6}
                md={7}
                sx={{
                    backgroundImage: "var(--gradient-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                <Link to='/'>
                    <button className="flexBoxCentered backButton">
                        <KeyboardBackspaceSharpIcon />
                    </button>
                </Link>

                {/* <div className="authenticationPage flexBoxCentered"> */}
                <img src={projectImages.registerImage} alt="loginImage" className="authenticationImage" />
                {/* </div> */}
            </Grid>

            <Grid item
                xs={12}
                sm={6}
                md={5}
                sx={{ backgroundColor: "var(--color-one)", display: "flex", alignItems: "center", justifyContent: "center" }}>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Card sx={{ width: "100%", maxWidth: 420, boxShadow: 0, borderRadius: 3, backgroundColor: 'transparent' }}>

                        <div className='flexBoxCentered margin-bottom-20'>
                            <img src={projectImages.swiftDropLogo} alt="Company Logo" style={{ width: "90px" }} />
                        </div>

                        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom  >
                            Create an Account
                        </Typography>

                        <CardContent sx={{ padding: "0 25px" }}>
                            <form action="none" onSubmit={(e) => { e.preventDefault(); }}>
                                {/* Name */}
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    type="name"
                                    value={registrationFormData.name}
                                    onChange={handleFormChange}
                                    sx={{ mb: 4 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                />

                                {/* Email */}
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={registrationFormData.email}
                                    onChange={handleFormChange}
                                    sx={{ mb: 4 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                />

                                {/* Password */}
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    name="password"
                                    onChange={handleFormChange}
                                    value={registrationFormData.password}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                />

                                {/* Confirm Password */}
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    type={"password"}
                                    variant="outlined"
                                    sx={{ mb: passwordError ? 1 : 3 }}
                                    name="confirmPassword"
                                    onChange={handleFormChange}
                                    value={registrationFormData.confirmPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    error={passwordError}
                                    helperText={passwordError ? "Both password fields must be the same" : ""}
                                />

                                {/* Register Button */}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "var(--button-theme-blue)",
                                        color: "white",
                                        borderRadius: "8px",
                                        mb: 2,
                                        "&:hover": { backgroundColor: "var(--button-hover-theme-blue)" },
                                    }}
                                    type="submit"
                                    onClick={handleRegistrationFormSubmit}
                                    disabled={isAnyFieldEmpty}
                                >
                                    {isLoading ? <DotLoader /> : "Register"}
                                </Button>

                                <Typography variant="body2" align="center">
                                    Already have an account?{" "}
                                    <Link
                                        to="/auth/log-in"
                                        sx={{
                                            color: "var(--button-theme-blue)",
                                            fontWeight: "bold",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Log in
                                    </Link>
                                </Typography>

                            </form>

                            <Divider sx={{ my: 2 }}>OR</Divider>

                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                    border: "1px solid #DADCE0",
                                    color: "#5F6368",
                                    fontWeight: "bold",
                                    backgroundColor: "white",
                                    "&:hover": { backgroundColor: "#F1F3F4" },
                                }}
                            >
                                <img src={google} alt="google" width={'25px'} />
                                <span style={{ color: "#5F6368", marginLeft: "10px" }}>Continue with Google</span>
                            </Button>

                        </CardContent>

                    </Card>
                </Box>
            </Grid>
        </Grid >
    )
}

export default RegisterUser