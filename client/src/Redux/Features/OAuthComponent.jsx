import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleOAuthApi } from "../../Networking/Services/ApiCalls";
import { setUserDetails } from "./UserDetailsSlice";
import { showSuccessToast } from "../../Components/CostomAlert";
import { useGoogleLogin } from "@react-oauth/google"
import { google } from "../../Assets/Icons";
import { Button } from "@mui/material";

const OAuthComponent = ({ setIsLoading }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleResponse = async (result) => {
    try {
      console.log(result.code);

      try {

        if (!result?.code) {
          return;
        };

        const response = await googleOAuthApi(result?.code);

        if (response?.success === true && response?.error === false) {
          navigate('/');
          setIsLoading(false);
          dispatch(setUserDetails(response?.data));

          showSuccessToast(`Welcome back, ${response?.data?.name}`)
        }
        else {
          console.log("Error in frontend else block");
        }

      } catch (error) {
        setIsLoading(false);
        console.log("Error in hitting google api from frontend ", error);
      }

    }
    catch (e) {
      console.log("Error while getting the code from google - ", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth-code"
  })

  return (
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
      onClick={googleLogin}
    >
      <img src={google} alt="Google" width={"25px"} />
      <span style={{ color: "#5F6368", marginLeft: "10px" }}>Continue with Google</span>
    </Button>
  );
};

export default OAuthComponent;
