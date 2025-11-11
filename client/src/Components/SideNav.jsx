import { Box, Container, Avatar, Typography, Divider, ListItemIcon, ListItemButton, List, ListItemText } from "@mui/material";
import { ArrowForwardIosIcon, ArrowBackIosNewIcon } from "../Assets/Icons";
import { useState } from "react";
import { projectImages } from "../Assets/Assets.js"
import { LogoutIcon } from "../Assets/Icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SideNav({ accountSideMenu }) {

    const [isSideNavOpen, setIsSideNavOpen] = useState(true);

    function handleSideNavOpen() {
        setIsSideNavOpen(!isSideNavOpen);
    };

    return (
        <Box component="main" position={"relative"} sx={{
            height:"auto",
            minWidth: isSideNavOpen ? "300px" : '50px',
            transition: "all 0.3s ease",
            borderRight: "1px solid var(--border-color)",
            padding: "36px 5px 20px 5px",
            boxShadow: "4px 0 12px rgba(0, 0, 0, 0.0700)",
        }}>

            <Box
                sx={{
                    height: "100% !important",
                    width: "100% !important",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"flex-end",
                    alignItems: "start",

                }}>

                <Container disableGutters sx={{
                    height: "100% !important",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                }}>

                    <BrandLogoBadge isSideNavOpen={isSideNavOpen} />

                    <Divider sx={{ my: 2, borderColor: "var(--border-color)", borderBottomWidth: '1px' }} />

                    <span onClick={handleSideNavOpen} style={{ cursor: "pointer", position: "absolute", top: "10px", left: "5px" }}> {isSideNavOpen ? <ArrowBackIosNewIcon fontSize="8px" /> : <ArrowForwardIosIcon fontSize="8px" />} </span>

                    <MenuOptions accountSideMenu={accountSideMenu} isSideNavOpen={isSideNavOpen} />

                </Container>
                <UserBadge isSideNavOpen={isSideNavOpen} />
            </Box>

        </Box>
    );
};

function UserBadge({ avatar, userName, userEmail, isSideNavOpen }) {

    const userDetails = useSelector((state) => state.userDetails);

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Avatar src={userDetails?.avatar} alt={name} sx={{ width: "45px", height: "45px" }}>
                    {userDetails?.name?.charAt(0).toUpperCase() || '?'}
                </Avatar>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "all 0.4s ease",
                maxWidth: isSideNavOpen ? "300px" : "0px",
                opacity: isSideNavOpen ? 1 : 0,
                whiteSpace: "nowrap",
                marginLeft: isSideNavOpen ? "12px" : "0px",

            }}>
                <Typography sx={{
                    fontSize: "16px",
                }}>
                    {userDetails?.name || " Deepansh Srivastav"}
                </Typography>
                <Typography sx={{
                    fontSize: "12px",
                }}>
                    {userDetails?.email || "deepansh.engineering03@gmail.com"}
                </Typography>
            </Box>

        </Box >
    );
};

export function BrandLogoBadge({ isSideNavOpen }) {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
        }}
            onClick={() => {
                navigate("/")
            }}
        >
            <Box>
                <img src={projectImages?.swiftDropLogo} alt="" width={isSideNavOpen ? "120px" : "50px"} />
            </Box>


            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: "hidden",
                transition: "all 0.4s ease",
                maxWidth: isSideNavOpen ? "300px" : "0px",
                opacity: isSideNavOpen ? 1 : 0,
                whiteSpace: "nowrap",
                marginLeft: isSideNavOpen ? "12px" : "0px",

            }}>
                {/* <Typography sx={{
                    fontSize: "22px",
                    fontWeight: "600"
                }}>
                    Swiftdrop
                </Typography>

                <Typography sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--text-green)",
                    fontFamily: "Edu NSW ACT Cursive, cursive"
                }}>
                    Swift. Simple. Reliable.
                </Typography> */}

            </Box>

        </Box >
    );
};

function MenuOptions({ accountSideMenu, isSideNavOpen, }) {

    const userDetails = useSelector((state) => state.userDetails);

    console.log("This is the user details from side nav", userDetails);

    const navigate = useNavigate();

    function handleClick(path) {
        return navigate(`/my-account/${path}`);
    };

    return (
        <List sx={{ margin: "20px 0" }}>
            {accountSideMenu?.map((menuItem, index) => {
                const Icon = menuItem.icon;
                const userRole = userDetails?.role;

                // Show all items if Admin, else only show items matching User's role
                if (userRole !== "Admin" && menuItem.role !== userRole) return null;

                return (
                    <ListItemButton key={index} onClick={() => handleClick(menuItem?.path)}>
                        <ListItemIcon
                            sx={{
                                display: 'flex',
                                justifyContent: isSideNavOpen ? "start" : "center",
                                alignItems: "center"
                            }}
                        >
                            <Icon />
                        </ListItemIcon>
                        <ListItemText
                            primary={menuItem.label}
                            sx={{
                                transition: "all 0.4s ease",
                                maxWidth: isSideNavOpen ? "300px" : "0px",
                                opacity: isSideNavOpen ? 1 : 0,
                                whiteSpace: "nowrap",
                                marginLeft: isSideNavOpen ? "12px" : "0px",
                            }}
                        />
                    </ListItemButton>
                );
            })}

            <Divider sx={{ my: 4, borderColor: "var(--border-color)", borderBottomWidth: '1px' }} />

            <ListItemButton>
                <ListItemIcon sx={{ display: 'flex', justifyContent: isSideNavOpen ? "start" : "center", alignItems: "center" }}>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{
                    transition: "all 0.4s ease",
                    maxWidth: isSideNavOpen ? "300px" : "0px",
                    opacity: isSideNavOpen ? 1 : 0,
                    whiteSpace: "nowrap",
                    marginLeft: isSideNavOpen ? "12px" : "0px",
                }} />
            </ListItemButton>
        </List>
    );
};