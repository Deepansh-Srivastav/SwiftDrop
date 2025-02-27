import { Box, Grid, Typography, Button, TextField, Card, CardContent, InputAdornment } from "@mui/material";
import {
    EmailIcon,
    VpnKeyIcon,
    KeyboardBackspaceSharpIcon,
} from '../Assets/Icons.js'
import { projectImages } from "../Assets/Assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getBaseUrl, APIConfig } from "../Networking/Configuration/ApiConfig.js";
import { putApiRequestWrapper, } from "../Networking/Services/ApiCalls.js";
import {
    showSuccessToast,
    showErrorToast,
} from "../Components/CostomAlert.jsx";
import { useDispatch } from 'react-redux';
import { setOtpVerificationState } from "../Redux/Features/OtpVerificationSlice.js";


const ForgotPassword = () => {

    const navigate = useNavigate()

    const [emailInputValue, setEmail] = useState("")
    const [otpInputValue, setOtp] = useState("")
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    function handleFormInput(event) {
        const { name, value } = event.target
        if (name === "emailInputValue") setEmail(value);
        if (name === "otpInputValue") setOtp(value);
    }

    async function sendOtp() {
        try {
            setIsLoading(true)
            const BASE_URL = getBaseUrl();
            const RESET_PASSWORD = APIConfig.apiPath.forgotPassword
            const FINAL_URL = BASE_URL + RESET_PASSWORD

            const payload = {
                email: emailInputValue
            }

            const response = await putApiRequestWrapper(FINAL_URL, payload)

            if (response.success === true && response.error === false) {

                showSuccessToast(response?.message)

                setIsLoading(false)

                setIsOtpSent(true)

                console.log(response?.data);

                return
            }

            setIsLoading(false)
        }
        catch (error) {
            console.log(error.message);
        }
    }

    async function verifyOtp() {
        setIsLoading(true)
        const BASE_URL = getBaseUrl();
        const RESET_PASSWORD = APIConfig.apiPath.verifyOtp
        const FINAL_URL = BASE_URL + RESET_PASSWORD

        const payload = {
            email: emailInputValue,
            otp: otpInputValue
        }

        const response = await putApiRequestWrapper(FINAL_URL, payload)

        if (response?.success === true && response?.error === false) {
            showSuccessToast(response?.message)

            localStorage.setItem("userEmail", payload?.email)

            setIsLoading(false)

            dispatch(setOtpVerificationState(true))

            navigate("/auth/reset-password")

            return
        }

        setIsLoading(false)

        showErrorToast(response?.message)
    }

    async function handleFormSubmission() {
        await sendOtp()
    }

    async function handleOtpVerification() {
        await verifyOtp()
    }

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

                <Link to='/auth/log-in'>
                    <button className="flexBoxCentered backButton">
                        <KeyboardBackspaceSharpIcon />
                    </button>
                </Link>

                <img src={projectImages.forgotPasswordImage}
                    alt="loginImage"
                    className="authenticationImage"
                    style={{ maxWidth: '450px' }} />
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
                            Recover Your Account
                        </Typography>

                        <CardContent sx={{ padding: "0 25px", }}>
                            <form action="none" onSubmit={(e) => { e.preventDefault(); }} className="authForms">

                                {/* Email */}
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="emailInputValue"
                                    type="emailInputValue"
                                    value={emailInputValue}
                                    onChange={handleFormInput}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                />

                                {/* OTP */}
                                {isOtpSent && (
                                    <TextField
                                        fullWidth
                                        label="OTP"
                                        type={'text'}
                                        variant="outlined"
                                        sx={{ mb: 3 }}
                                        name="otpInputValue"
                                        onChange={handleFormInput}
                                        // value={otpInputValue}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <VpnKeyIcon color="action" />
                                                </InputAdornment>
                                            ),

                                        }}
                                        required
                                    />
                                )}

                                {
                                    isLoading && (
                                        <Button
                                            sx={{
                                                mb: 2,
                                                width: "100%"

                                            }}
                                            disabled={true}
                                        >
                                            <ClipLoader color="var(--button-color)" size={50} />
                                        </Button>
                                    )
                                }

                                {isOtpSent ?
                                    (
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
                                            onClick={handleOtpVerification}
                                        >
                                            Verify OTP
                                        </Button>
                                    )
                                    :
                                    (
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
                                            onClick={handleFormSubmission}
                                        disabled={isLoading }
                                        >
                                            Get OTP
                                        </Button>
                                    )
                                }
                            </form>
                        </CardContent>

                    </Card>
                </Box>
            </Grid>

        </Grid >
    )
}

export default ForgotPassword