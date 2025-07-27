import { Box, Container, Typography } from "@mui/material"
import { alignProperty } from "@mui/material/styles/cssUtils"

const PageBanner = ({ heading, closeModal, isModalOpen }) => {
    return (
        <Box sx={{ position: "relative" }}>

            <Container disableGutters sx={{
                width: "100% !important",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                minHeight: "150px",
                maxHeight: "150px",
                background: "var(--gradient-purple)",
                position: 'relative',
                marginBottom: "80px !important",
                borderBottomRightRadius: "50px",
                borderBottomLeftRadius: "50px"
            }}>


                <Typography
                    sx={{
                        color: "#FFFFFF",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: {
                            xs: "1.6rem",
                            sm: "2.4rem",
                            md: "3rem",
                        },
                    }}
                >
                    {heading}
                </Typography>

            </Container>

            {!isModalOpen && (
                <>
                    <Container disableGutters sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <button className="imageUploadButton" onClick={closeModal}>Add Category</button>
                    </Container>
                </>
            )}

        </Box>
    )
}

export default PageBanner
