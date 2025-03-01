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
import { ClipLoader } from "react-spinners";
import { APIConfig } from "../Networking/Configuration/ApiConfig.js";
import { postApiRequestWrapper, getApiRequestWrapper } from "../Networking/Services/ApiCalls.js";
import {
  showSuccessToast,
  showErrorToast,
} from "../Components/CostomAlert.jsx";
import { useDispatch} from 'react-redux'
import { setUserDetails } from "../Redux/Features/UserDetailsSlice.js"

const LogIn = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginFormSubmit = async () => {
    await handleLogin()
  }

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const LOGIN_URL = APIConfig?.apiPath?.login
      const response = await postApiRequestWrapper(LOGIN_URL, loginFormData)

      if (response?.success === true && response?.error === false) {

        localStorage.setItem('accessToken', response?.data?.accessToken)
        localStorage.setItem('refreshToken', response?.data?.refreshToken)

        const FETCH_USER_DETAILS_ENDPOINT = APIConfig.apiPath.getUserDetails
        
        const userDetails = await getApiRequestWrapper(FETCH_USER_DETAILS_ENDPOINT)

        dispatch(setUserDetails(userDetails?.data))

        setIsLoading(false)
        navigate('/');

        showSuccessToast(`Welcome back, ${userDetails?.data?.name}`)
        return
      }
      setPasswordError(true)
      showErrorToast(response?.message)
      // showWarningToast()

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

        <Link to='/'>
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
                  sx={{ mb: passwordError ? 3 : 3 }}
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
                        width: "100%"
                      }}
                      disabled={true}
                    >
                      <ClipLoader color="var(--button-color)" />
                    </Button>
                  )
                  :
                  (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--button-color)",
                        color: "white",
                        borderRadius: "8px",
                        mb: 2,
                        "&:hover": { backgroundColor: "var(--button-hover-theme-blue)" },
                      }}
                      type="submit"
                      onClick={handleLoginFormSubmit}
                      disabled={isAnyFieldEmpty}
                    >
                      Login
                    </Button>
                  )}
              </form>

              {passwordError && (
                <Typography className="pointer" variant="body2" align="center" sx={{ mb: 3 }}>

                  <Link to={'/auth/forgot-password'}>
                    Forgot Password?
                  </Link>

                </Typography>
              )}

              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link
                  to="/auth/register-user"
                  sx={{
                    color: "var(--button-theme-blue)",
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