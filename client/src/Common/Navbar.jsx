import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Person4Icon from '@mui/icons-material/Person4';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import { projectImages } from '../Assets/Assets.js';

import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { APIConfig } from '../Networking/Configuration/ApiConfig.js';
import { getApiRequestWrapper } from '../Networking/Services/ApiCalls.js';
import { showSuccessToast } from '../Components/CostomAlert.jsx';
import { clearUserDetails } from '../Redux/Features/UserDetailsSlice.js';


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

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const userData = useSelector((state) => {
        return state.userDetails
    })

    console.log("UserData is = ", userData);

    async function handleLogout() {

        handleClose()

        const LOGOUT_ENDPOINT = APIConfig.apiPath.logout
        const response = await getApiRequestWrapper(LOGOUT_ENDPOINT)

        if (response?.success === true && response?.error === false) {
            localStorage.clear()

            dispatch(clearUserDetails())

            showSuccessToast(response?.message)
        }
    }

    const isUserLoggedIn = userData && Object.keys(userData).length > 0;


    return (
        <AppBar position="static" sx={{
            backgroundColor: 'var(--color-one)', color: 'black', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '5px 20px'
        }}>
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

                {
                    (isUserLoggedIn ? (
                        <>
                            <div onClick={handleMenu} >
                                <p>{userData?.name}</p>
                                <Avatar
                                    src={userData?.avatar || undefined}
                                    alt="User Avatar"
                                    sx={{ width: 40, height: 40 }}
                                >
                                    {
                                        !userData?.avatar && userData?.name
                                            ?
                                            (userData.name.charAt(0).toUpperCase())
                                            :
                                            (null)
                                    }
                                </Avatar>
                            </div>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: { width: 300, borderRadius: 2, boxShadow: 3, }
                                }}
                            >
                                <MenuItem onClick={handleClose} sx={{ py: 2 }}><Person4Icon sx={{ mr: 1 }} fontSize='medium' /> My account</MenuItem>
                                <Divider />

                                <MenuItem onClick={handleClose} sx={{ py: 2 }}><ShoppingBagIcon sx={{ mr: 1 }} /> Orders</MenuItem>

                                <MenuItem onClick={handleClose} sx={{ py: 2 }}><ShoppingBagIcon sx={{ mr: 1 }} /> Addresses</MenuItem>

                                <Divider />

                                <MenuItem onClick={handleLogout} sx={{ py: 2 }}><LogoutIcon sx={{ mr: 1 }} />Logout</MenuItem>

                            </Menu>
                        </>
                    )
                        :
                        (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', minWidth: "200px" }}>

                                    <Link to="/auth/log-in">
                                        <button className='flexBoxCentered navbarOptions'>
                                            {/* <LoginIcon sx={{ mr: 0.8 }} fontSize='medium' /> */}

                                            Login</button>

                                    </Link>

                                    <Link to="/auth/register-user">
                                        <button className='flexBoxCentered navbarOptions'>
                                            {/* <PersonAddIcon sx={{ mr: 0.5 }} fontSize='medium' /> */}
                                            Signup</button>
                                    </Link>

                                </Box>
                            </>
                        )
                    )
                }

                <button className='flexBoxCentered cartButton'>
                    <Badge badgeContent={1} color="primary">
                        < ShoppingCartIcon />
                    </Badge>
                    <span> Cart</span>
                </button>

            </Toolbar>
        </AppBar>
    );
}