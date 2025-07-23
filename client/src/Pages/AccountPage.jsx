import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

// Dummy Pages
const Profile = () => <Typography variant="h6">Profile Page</Typography>;
const Orders = () => <Typography variant="h6">Orders Page</Typography>;
const Address = () => <Typography variant="h6">Saved Addresses</Typography>;

// SideNav Items
const menuItems = [
  { label: "Profile", value: "profile" },
  { label: "Orders", value: "orders" },
  { label: "Address", value: "address" },
];

const AccountPage = () => {
  const [activePage, setActivePage] = useState("profile");


  return (
    <Box display="flex" minHeight="80vh" sx={{ backgroundColor: "#f9f9f9" }}>
      {/* SideNav */}
      <Box
        sx={{
          width: 200,
          borderRight: "1px solid #ddd",
          padding: 2,
          backgroundColor: "#fff",
        }}
      >
        {menuItems.map((item) => (
          <Button
            key={item.value}
            variant={activePage === item.value ? "contained" : "text"}
            fullWidth
            onClick={() => setActivePage(item.value)}
            sx={{ justifyContent: "flex-start", mb: 1 }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      {/* Content */}
      <Box flex={1} p={3}>
        
      </Box>
    </Box>
  );
};

export default AccountPage;