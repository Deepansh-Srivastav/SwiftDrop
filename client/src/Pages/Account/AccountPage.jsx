import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SideNav from "../../Components/SideNav";
import { accountSideMenu } from "../../Constants/menuConfig";
import { Outlet } from "react-router-dom";


const AccountPage = () => {

  return (
    <Box display="flex" minHeight="100vh" sx={{}}>

      <SideNav accountSideMenu={accountSideMenu} />

      {/* Content */}
      <Box flex={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AccountPage;