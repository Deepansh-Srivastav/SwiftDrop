import { useState } from "react";
import { Box, Button, TextField, Typography, Card, CardContent, Divider, InputAdornment, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import swiftDropLogo from '../Assets/SwiftDropLogo3.png'; // Ensure this is the correct path

const AuthForm = ({ formType = "login" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

      <Card sx={{ width: 420, padding: 3, boxShadow: 0, borderRadius: 3, backgroundColor: 'transparent' }}>
        {/* Logo */}
        <div className='flexBoxCentered margin-bottom-20'>
          <img src={swiftDropLogo} alt="Company Logo" style={{ width: "100px" }} />
        </div>

        {/* Title */}
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          {formType === "login" ? "Welcome Back!" : "Create an Account"}
        </Typography>

        {/* Input Fields */}
        <CardContent>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
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
          />

          {/* Login/Register Button */}
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
          >
            {formType === "login" ? "Login" : "Sign Up"}
          </Button>

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
        </CardContent>
      </Card>

    </Box>
  );
};

export default AuthForm;
