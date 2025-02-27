import { Box, Grid, Typography, Button, TextField, Card, CardContent, InputAdornment, IconButton } from "@mui/material";
import {
    KeyboardBackspaceSharpIcon,
} from '../Assets/Icons.js'
import { projectImages } from "../Assets/Assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { getBaseUrl, APIConfig } from "../Networking/Configuration/ApiConfig.js";
import { putApiRequestWrapper, } from "../Networking/Services/ApiCalls.js";
import {
    showSuccessToast,
    showErrorToast,
    showWarningToast
} from "../Components/CostomAlert.jsx";
import {
    LockIcon,
    Visibility,
    VisibilityOff,
} from '../Assets/Icons.js'
import { useDispatch } from "react-redux";
import { setOtpVerificationState } from "../Redux/Features/OtpVerificationSlice.js";


const ResetPassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userEmail = localStorage.getItem('userEmail');

    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    function handleFormInput(event) {
        const { name, value } = event.target
        if (name === "newPassword") setNewPassword(value);
        if (name === "confirmNewPassword") setConfirmNewPassword(value);
    }

    async function handleResetPassword() {
        try {

            const BASE_URL = getBaseUrl();
            const RESET_PASSWORD_ENDPOINT = APIConfig.apiPath.resetPassword
            const FINAL_URL = BASE_URL + RESET_PASSWORD_ENDPOINT

            const payload = {
                email: userEmail,
                password: newPassword,
                confirmPassword: confirmNewPassword
            }

            const response = await putApiRequestWrapper(FINAL_URL, payload)

            if (response?.success === true && response?.error === false) {

                localStorage.removeItem('userEmail')
                localStorage.setItem("resetComplete", 'true')

                navigate("/auth/log-in")

                showSuccessToast(response?.message)

                setTimeout(() => {
                    dispatch(setOtpVerificationState(false))
                }, 2000)

                return;
            }

            showErrorToast(response?.message)

            return
        }
        catch (e) {
            console.log("Error", e);
        }
    }

    async function handlePasswordReset() {

        if (newPassword === confirmNewPassword) {

            await handleResetPassword()

            return;
        }

        setNewPassword("")
        setConfirmNewPassword("")
        showWarningToast("Passwords do not match. Please try again.");
    }

    // const isAnyFieldEmpty = Object.values(loginFormData).some(value => value.trim() === "");

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

                <img src={projectImages?.resetPasswordImage} alt="loginImage" className="authenticationImage" />
            </Grid>

            <Grid item
                xs={12}
                sm={6}
                md={5}
                sx={{ backgroundColor: "var(--color-one)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* <AuthForm loginForm = {true}/> */}

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

                    <Card sx={{ width: "100%", maxWidth: 420, boxShadow: 0, borderRadius: 3, backgroundColor: 'transparent' }}>
                        {/* Logo */}
                        <div className='flexBoxCentered margin-bottom-20'>
                            <img src={projectImages.swiftDropLogo} alt="Company Logo" style={{ width: "90px" }} />
                        </div>

                        {/* Title */}
                        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                            Create a New Password
                        </Typography>

                        <CardContent sx={{ padding: "0 25px" }}>

                            <form action="none" onSubmit={(e) => { e.preventDefault(); }}>

                                {/* Password */}
                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    name="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={handleFormInput}
                                    // value={loginFormData.password}
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
                                // error={passwordError}
                                />

                                {/* Email */}
                                <TextField
                                    fullWidth
                                    label="Re-Enter Password"
                                    name="confirmNewPassword"
                                    type="password"
                                    value={confirmNewPassword}
                                    // value={loginFormData.email}
                                    onChange={handleFormInput}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                />

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#388E3C",
                                        color: "white",
                                        borderRadius: "8px",
                                        mb: 3,
                                        "&:hover": { backgroundColor: "#2E7D32" },
                                    }}
                                    type="submit"
                                    onClick={handlePasswordReset}
                                // disabled={isAnyFieldEmpty}
                                >
                                    Reset Password
                                </Button>
                            </form>




                        </CardContent>

                    </Card>
                </Box>
            </Grid>

        </Grid >
    )
}

export default ResetPassword