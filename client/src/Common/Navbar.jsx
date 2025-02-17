import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Person4Icon from '@mui/icons-material/Person4';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
// import swiftDropLogo from "../Assets/SwiftDropLogo3.png";
import { projectImages } from '../Assets/Assets.js';

import LoginIcon from '@mui/icons-material/Login';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    width: '40%',
    maxWidth: '500px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 2),
    [theme.breakpoints.down('sm')]: { width: '60%' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    flex: 1,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1),
        width: '100%',
    },
}));

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar position="static" sx={{
            backgroundColor: 'var(--color-one)', color: 'black', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '5px 20px' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left Side - Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <Link to="/">
                        <img src={projectImages.swiftDropLogo} alt="SwiftDrop Logo" style={{ width: '80px', cursor: 'pointer', margin: '5px' }} />
                    </Link>

                </Box>

                {/* Center - Search Bar */}

                <Search sx={{ backgroundColor: '#f0f0f0', color: 'black', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '6px 12px', borderRadius: '8px' }} >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </Search>

                {/* Right Side - Buttons and Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', minWidth: "200px" }}>

                    <Link to="/auth/log-in">
                        <button className='flexBoxCentered navbarOptions'><LoginIcon sx={{ mr: 0.8 }} fontSize='medium' /> Login</button>

                    </Link>

                    <Link to="/auth/register-user">
                        <button className='flexBoxCentered navbarOptions'><PersonAddIcon sx={{ mr: 0.5 }} fontSize='medium' /> Signup</button>
                    </Link>

                    <button className='flexBoxCentered cartButton'>
                        <Badge badgeContent={1} color="primary">
                            < ShoppingCartIcon />
                        </Badge>
                        <span> Cart</span>
                    </button>

                    {/* <div onClick={handleMenu} >
                        <Avatar alt="User Avatar" sx={{ width: 40, height: 40 }} />
                    </div> */}
                </Box>

                {/* Profile Dropdown Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        sx: { width: 300, borderRadius: 2, boxShadow: 3, }
                    }}
                >
                    <MenuItem onClick={handleClose} sx={{ py: 2 }}><Person4Icon sx={{ mr: 1 }} fontSize='medium' /> Profile</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose} sx={{ py: 2 }}>My account</MenuItem>

                    <MenuItem onClick={handleClose} sx={{ py: 2 }}><ShoppingBagIcon sx={{ mr: 1 }} /> Orders</MenuItem>

                    <Divider />

                    <MenuItem onClick={handleClose} sx={{ py: 2 }}><LogoutIcon sx={{ mr: 1 }} />Logout</MenuItem>

                    <MenuItem onClick={handleClose} sx={{ py: 2 }}>Login</MenuItem>

                    <MenuItem onClick={handleClose} sx={{ py: 2 }}>Signup</MenuItem>


                </Menu>
            </Toolbar>
        </AppBar>
    );
}