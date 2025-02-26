import { Box, Grid, Typography, Button, TextField, Card, CardContent, Divider, InputAdornment, IconButton } from "@mui/material";
import {
    EmailIcon,
    VpnKeyIcon,
    KeyboardBackspaceSharpIcon,
} from '../Assets/Icons.js'
import { projectImages } from "../Assets/Assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { getBaseUrl, APIConfig } from "../Networking/Configuration/ApiConfig.js";
import { putApiRequestWrapper, } from "../Networking/Services/ApiCalls.js";


const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [isOtpSent, setIsOtpSent] = useState(false)

    function handleFormInput(event) {
        const { name, value } = event.target
        if (name === "email") setEmail(value);
        if (name === "otp") setOtp(value);
    }

    async function sendOtp() {
        try {
            const BASE_URL = getBaseUrl();
            const RESET_PASSWORD = APIConfig.apiPath.forgotPassword
            const FINAL_URL = BASE_URL + RESET_PASSWORD

            const response = await putApiRequestWrapper(FINAL_URL)

            if (response.success === true && response.error === false) {
                console.log(response);
            }
        } 
        catch (error) {
            console.log(error.message);
        }

    }

    async function handleFormSubmission() {
        await sendOtp()
    }

    return (
        <Grid container sx={{ height: "100vh" }}>

            <Grid
                item
                xs={12}
                sm={6}
                md={7}
                // sx={{
                //   backgroundImage: "linear-gradient(135deg,#9575CD, #D1C4E9 )", // Smooth gradient transition
                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "center"
                // }}
                sx={{
                    backgroundImage: "linear-gradient(100deg, #673AB7, #9575CD, #D1C4E9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                <Link to='/auth/log-in'>
                    <button className="flexBoxCentered backButton">
                        <KeyboardBackspaceSharpIcon />
                    </button>
                </Link>

                {/* <div className="authenticationPage flexBoxCentered"> */}
                <img src={projectImages.forgotPasswordImage} alt="loginImage" className="authenticationImage" />
                {/* </div> */}
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

                        <CardContent sx={{ padding: "0 25px" }}>

                            <form action="none" onSubmit={(e) => { e.preventDefault(); }}>

                                {/* Email */}
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
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
                                        name="otp"
                                        onChange={handleFormInput}
                                        // value={otp}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <VpnKeyIcon color="action" />
                                                </InputAdornment>
                                            ),

                                        }}
                                        required
                                    // error={passwordError}
                                    />
                                )}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#388E3C",
                                        color: "white",
                                        borderRadius: "8px",
                                        mb: 2,
                                        "&:hover": { backgroundColor: "#2E7D32" },
                                    }}
                                    type="submit"
                                    onClick={handleFormSubmission}
                                // disabled={}
                                >
                                    Get OTP
                                </Button>

                            </form>
                        </CardContent>

                    </Card>
                </Box>
            </Grid>

        </Grid >
    )
}

export default ForgotPassword