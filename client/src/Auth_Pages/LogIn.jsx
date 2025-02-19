import { Box, Grid, Typography } from "@mui/material";
// import loginImage from "../Assets/test-image-login-1.png"
// import loginImage from "../Assets/login-image-2.png"
// import loginImage from "../Assets/Sign-up-1.png"
import { projectImages } from "../Assets/Assets";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';

import { Button, TextField, Card, CardContent, Divider, InputAdornment, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { FcGoogle } from "react-icons/fc";

import { DotLoader } from "react-spinners";

const LogIn = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const handleLoginFormSubmit = () => {
    handleLogin()
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
        credentials: "include",

      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        navigate("/home");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

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
              Welcome Back
            </Typography>

            <CardContent sx={{ padding: "0 25px" }}>

              <form action="none" onSubmit={(e) => { e.preventDefault(); }}>

                {/* Email */}
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={loginFormData.email}
                  onChange={handleFormChange}
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

                {/* Password */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  sx={{
                    mb: passwordError ? 1 : 3,
                    borderColor: passwordError ? 'red' : ""
                  }}
                  name="password"
                  onChange={handleFormChange}
                  value={loginFormData.password}
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
                  error={passwordError}
                />

                {/* Login Button */}
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
                  onClick={handleLoginFormSubmit}
                >
                  Login
                </Button>
              </form>

              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link
                  to="/auth/register-user"
                  sx={{
                    color: "#388E3C",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </Typography>

              {/* Divider */}
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
                <FcGoogle size={30} />
                <span style={{ color: "#5F6368" }}>Continue with Google</span>
              </Button>

            </CardContent>

          </Card>
        </Box>
      </Grid>

    </Grid >
  )
}

export default LogIn