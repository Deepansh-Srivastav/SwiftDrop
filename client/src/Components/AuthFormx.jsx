import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Card, CardContent, Divider, InputAdornment, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import swiftDropLogo from '../Assets/SwiftDropLogo3.png';
import { useNavigate } from "react-router-dom";
import CustomAlter from "./CustomAlter";
import { getBaseUrl } from "../Networking/Configuration/ApiConfig";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";

const AuthForm = ({ loginForm = false, registrationForm = false }) => {

  const navigate = useNavigate()

  const [showLoginForm, setShowLoginForm] = useState(false);

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {

    setShowLoginForm(loginForm)

    setShowRegisterForm(registrationForm)

  }, [loginForm, registrationForm])

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  console.log("URL Here is ", getBaseUrl());

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const handleLoginFormSubmit = () => {
    handleLogin()
  }

  const handleRegistrationFormSubmit = () => {
    handleRegistration()
  }

  const [registrationFormData, setRegistrationFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

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

  const handleRegistration = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationFormData),
        credentials: "include",
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        navigate("/home");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginFormChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleRegisterFormChange = (e) => {
    setRegistrationFormData({ ...registrationFormData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

      <Card sx={{ width: "100%", maxWidth: 420, padding: 3, boxShadow: 0, borderRadius: 3, backgroundColor: 'transparent' }}>
        {/* Logo */}
        <div className='flexBoxCentered margin-bottom-20'>
          <img src={swiftDropLogo} alt="Company Logo" style={{ width: "100px" }} />
        </div>

        {/* Title */}
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          {showLoginForm ? "Welcome Back" : "Create an Account"}
        </Typography>

        {/* Input Fields */}
        {showLoginForm && (
          <CardContent>

            <form action="none" onSubmit={(e) => { e.preventDefault() }}>
              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={loginFormData.email}
                onChange={handleLoginFormChange}
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

              {/* password */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                sx={{ mb: 3 }}
                name="password"
                onChange={handleLoginFormChange}
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
              />

              {/* LoginButton */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#388E3C", // Green primary color
                  color: "white",
                  borderRadius: "8px",
                  mb: 2,
                  "&:hover": { backgroundColor: "#2E7D32" }, // Darker on hover
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
              <GoogleIcon sx={{ color: "#EA4335" }} />
              <span style={{ color: "#5F6368" }}>Continue with Google</span>
            </Button>

          </CardContent>
        )}

        {showRegisterForm && (
          <CardContent>

            {/* <form action="none" onSubmit={(e) => { e.preventDefault() }}>

              <TextField
                fullWidth
                label="Name"
                name="name"
                type="name"
                value={registrationFormData.name}
                onChange={handleRegisterFormChange}
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

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={registrationFormData.email}
                onChange={handleRegisterFormChange}
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

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                sx={{ mb: 3 }}
                name="password"
                onChange={handleRegisterFormChange}
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
                onClick={handleRegistrationFormSubmit}
              >
                Register
              </Button>
            </form> */}

            <form action="none" onSubmit={(e) => { e.preventDefault(); }}>
              {/* Name */}
              <TextField
                fullWidth
                label="Name"
                name="name"
                type="name"
                value={registrationFormData.name}
                onChange={handleRegisterFormChange}
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
                onChange={handleRegisterFormChange}
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
                onChange={handleRegisterFormChange}
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

              {/* Register Button */}
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
                onClick={handleRegistrationFormSubmit}
              >
                Register
              </Button>

              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Link
                  to="/auth/log-in"
                  sx={{
                    color: "#388E3C",
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
              <GoogleIcon sx={{ color: "#EA4335" }} />
              <span style={{ color: "#5F6368" }}>Continue with Google</span>
            </Button>

          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default AuthForm;