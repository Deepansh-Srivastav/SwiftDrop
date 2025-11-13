import { Box, Container, Typography } from "@mui/material";

const PageBanner = ({ heading }) => {
    return (
        <Box sx={
            {
                width: "100%",
                height: "100%",
                maxHeight: "130px",
                marginBottom: "20px",
                padding: "0 4rem"
            }
        }>
            <Container maxWidth={false} disableGutters sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                background: "var(--gradient-purple)",
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
        </Box>
    );
};

export default PageBanner;