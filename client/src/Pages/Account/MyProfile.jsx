import { Box, Container, Grid, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { EditIcon,DeleteIcon } from "../../Assets/Icons";

const MyProfile = () => {

    const userDetails = useSelector((state) => state.userDetails);

    return (
        <Box disableGutters sx={{
            width: "100%",
            height: "100%",
            maxHeight: "130px",
            marginBottom: "20px",
            padding: "0 4rem"
        }}>
            <Container disableGutters sx={{
                width: "100% !important",
                height: "100%",
                minHeight: "200px",
                maxHeight: "300px",
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

            <Container
                disableGutters
                sx={{
                    width: '90%',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                }}
            >
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        width: '100%',
                    }}
                >
                    <Grid container spacing={3}>

                        {/* Name */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                size="small"
                                defaultValue={userDetails?.name}
                            />
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                size="small"
                                type="email"
                                defaultValue="thomashardison@dayrep.com"
                            />
                        </Grid>

                        {/* Mobile */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                variant="outlined"
                                size="small"
                                type="tel"
                                defaultValue="661-724-7734"
                            />
                        </Grid>

                        {/* Change Password Button */}
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    borderRadius: 2,
                                    py: 1.2,
                                    px: 3,
                                }}
                            >
                                Change Password
                            </Button>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    py: 1.2,
                                    px: 3,
                                    fontWeight: 600,
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>



        </Box>
    );
};

export default MyProfile;