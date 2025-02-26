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

const LogIn = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const handleLoginFormSubmit = async () => {
    await handleLogin()
  }

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const BASE_URL = getBaseUrl();
      const REGISTRATION_URL = APIConfig?.apiPath?.login
      const FINAL_URL = BASE_URL + REGISTRATION_URL
      const response = await postApiRequestWrapper(FINAL_URL, loginFormData)

      if (response?.success === true && response?.error === false) {
        setIsLoading(false)
        navigate('/home');
      }

      setIsLoading(false)

    }
    catch (error) {
      console.error("Error:", error);
      setIsLoading(false)
    }
  };

  const handleFormChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const isAnyFieldEmpty = Object.values(loginFormData).some(value => value.trim() === "");

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
                  sx={{ mb: passwordError ? 1 : 3 }}
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

                {isLoading ?
                  (
                    <Button
                      sx={{
                        mb: 2,
                      }}
                    >
                      <BarLoader />
                    </Button>
                  )
                  :
                  (
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
                      disabled={isAnyFieldEmpty}
                    >
                      Login
                    </Button>
                  )}
              </form>

              <Typography className="pointer" variant="body2" align="center" sx={{ mb: 3 }}>

                <Link to={'/auth/forgot-password'}>
                  Forgot Password?
                </Link>

              </Typography>

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
                <img src={google} alt="Google" width={"25px"} />
                <span style={{ color: "#5F6368", marginLeft: "10px" }}>Continue with Google</span>
              </Button>

            </CardContent>
          </Card>
        </Box>
      </Grid>

    </Grid >
  )
}

export default LogIn