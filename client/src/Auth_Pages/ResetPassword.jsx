import { Box, Grid, Typography, Button, TextField, Card, CardContent, Divider, InputAdornment, IconButton } from "@mui/material";
import {
    EmailIcon,
    LockIcon,
    Visibility,
    VisibilityOff,
    KeyboardBackspaceSharpIcon,
    google
} from '../Assets/Icons.js'
import { projectImages } from "../Assets/Assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { getBaseUrl, APIConfig } from "../Networking/Configuration/ApiConfig.js";
import { postApiRequestWrapper, } from "../Networking/Services/ApiCalls.js";
import {
    showSuccessToast,
    showErrorToast,
    showWarningToast
}
    from "../Components/CostomAlert.jsx";

const ResetPassword = () => {

    const navigate = useNavigate()





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

                <Link to='/home'>
                    <button className="flexBoxCentered backButton">
                        <KeyboardBackspaceSharpIcon />
                    </button>
                </Link>

                {/* <div className="authenticationPage flexBoxCentered"> */}
                <img src={projectImages.loginImage} alt="loginImage" className="authenticationImage" />
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
                            Create a New Password
                        </Typography>

                    </Card>
                </Box>
            </Grid>

        </Grid >
    )
}

export default ResetPassword