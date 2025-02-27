import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

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
            }}
        >
            <Box
                component="img"
                src="/images/404_placeholder.svg" // Replace with your image
                alt="Page Not Found"
                sx={{ width: '80%', maxWidth: 400, mb: 4 }}
            />

            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                404
            </Typography>

            <Typography variant="h5" gutterBottom>
                Oops! The page you're looking for doesn't exist.
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                It might have been removed, renamed, or did not exist in the first place.
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                sx={{ borderRadius: '8px', textTransform: 'none' }}
            >
                Go Back Home
            </Button>
        </Container>
    );
};

export default PageNotFound;