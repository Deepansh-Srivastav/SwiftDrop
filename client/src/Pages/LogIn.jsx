import { Box, Grid, Typography } from "@mui/material";
import loginImage from "../Assets/test-image-login-1.png"
// import loginImage from "../Assets/login-image-2.png"
// import loginImage from "../Assets/Sign-up-1.png"
import AuthForm from "../Components/AuthFormx";
import { Link } from "react-router-dom";
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';

const LogIn = () => {

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
        <img src={loginImage} alt="loginImage" className="authenticationImage" />
        {/* </div> */}
      </Grid>


      <Grid item
        xs={12}
        sm={6}
        md={5}
        sx={{ backgroundColor: "var(--color-one)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AuthForm />
      </Grid>

    </Grid >
  )
}

export default LogIn