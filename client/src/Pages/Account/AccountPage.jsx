import { Box } from "@mui/material";
import SideNav from "../../Components/SideNav";
import { accountSideMenu } from "../../Constants/menuConfig";
import { Outlet } from "react-router-dom";

const AccountPage = () => {

  return (
    <Box display="flex" height="100vh">

      <SideNav accountSideMenu={accountSideMenu} />

      <Box flex={1}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AccountPage;