import { Box, Container, Grid, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { EditIcon, DeleteIcon } from "../Assets/Icons";

const ProfileBanner = () => {
    const userDetails = useSelector((state) => state.userDetails);

    return (
        <Box disableGutters sx={{
            width: "100%",
            height: "100%",
            maxHeight: "200px",
            marginBottom: "5%",
            padding: "0 4rem",
        }}>
            <Container disableGutters sx={{
                width: "100% !important",
                height: "100%",
                background: "var(--gradient-purple)",
                position: 'relative',
                marginBottom: "150px !important",
                borderBottomRightRadius: "50px",
                borderBottomLeftRadius: "50px"
            }}>

                <div className="avatarWrapper">
                    <div className="avatarContainer">
                        <img
                            src={
                                userDetails?.avatar ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            alt="User Avatar"
                        />
                        <div className="edit-profile-image">
                            <span className="edit-profile"><EditIcon /></span>
                            <span className="delete-profile"><DeleteIcon /></span>
                        </div>
                    </div>
                </div>

            </Container>
        </Box>
    );
};

export default ProfileBanner;
