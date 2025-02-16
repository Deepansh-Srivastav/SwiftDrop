import { useState } from "react";
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

const AuthForm = ({ formType = "login" }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  console.log("URL Here is ",getBaseUrl());

  const [loginFormInput, setLoginFormInput] = useState({
    email: '',
    password: '',
    name:"Deepansh"
  })

  const handleLoginFormSubmit = () => {
    console.log("Data is = ", loginFormInput.email, loginFormInput.password)
    handleLogin()
  }


  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormInput),
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


  const handleLoginFormChange = (e) => {
    setLoginFormInput({ ...loginFormInput, [e.target.name]: e.target.value });
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
          {formType === "login" ? "Welcome Back" : "Create an Account"}
        </Typography>

        {/* Input Fields */}
        <CardContent>

          <form action="none" onSubmit={(e) => { e.preventDefault() }}>
            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={loginFormInput.email}
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
              value={loginFormInput.password}
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

          {/* Divider */}
          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* Google Login Button with Original Colors */}
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

          {/* <CustomAlter openSnackBar={true} /> */}
        </CardContent>
      </Card>

    </Box>
  );
};

export default AuthForm;
