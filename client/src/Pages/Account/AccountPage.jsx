import { Box } from "@mui/material";
import SideNav from "../../Components/SideNav";
import { accountSideMenu } from "../../Constants/menuConfig";
import { Outlet } from "react-router-dom";

const AccountPage = () => {

  return (
    <>
      <Box display="flex" sx={{
        width: "100vw !important",
        minHeight: "100dvh !important",
        overflow: "hidden",
      }} >

        <SideNav accountSideMenu={accountSideMenu} />

        <Box flex={1} sx={{
          height: "100vh",
          width:"100%",
          display:'flex',
          alignItems:"stretch",
          justifyContent:"start",
          flexDirection:"column"
        }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AccountPage;