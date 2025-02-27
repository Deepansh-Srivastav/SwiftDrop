import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { projectImages } from '../Assets/Assets';

const PageNotFound = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                p: 2,
            }}
        >
            <Box
                component="img"
                src={projectImages?.pageNotFoundImage}
                alt="Page Not Found"
                sx={{ width: '80%', maxWidth: 400 }}
            />

            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                }}
            >
                404
            </Typography>

            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                }}
            >
                Oops! The page you're looking for doesn't exist.
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    mb: 4,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                }}
            >
                It might have been removed, renamed, or did not exist in the first place.
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="contained"
                sx={{
                    backgroundColor: "var(--purple-theme)",
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                }}
            >
                Go Back Home
            </Button>
        </Container>
    );
};

export default PageNotFound;