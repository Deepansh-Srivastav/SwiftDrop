import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled, useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Person4Icon from '@mui/icons-material/Person4';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { projectImages } from '../Assets/Assets.js';
import { searchPlaceholders } from '../Assets/Utils.js';
import TypingAnimation from './TypingAnimation.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { APIConfig } from '../Networking/Configuration/ApiConfig.js';
import { getApiRequestWrapper } from '../Networking/Services/ApiCalls.js';
import { showSuccessToast } from '../Components/CostomAlert.jsx';
import { clearUserDetails } from '../Redux/Features/UserDetailsSlice.js';

// Enhanced styled components with modern design
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    // background: "var(--gradient-primary)",
    background: 'linear-gradient(135deg, #95a1d2ff 0%, #764ba2 100%)',
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
    // boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    }
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '25px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        background: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-1px)',
    },
    '&:focus-within': {
        boxShadow: '0 6px 25px rgba(102, 126, 234, 0.3)',
        border: '1px solid rgba(102, 126, 234, 0.5)',
    },
    width: '100%',
    maxWidth: '500px',
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.8, 2.5),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    [theme.breakpoints.down('lg')]: {
        width: '45%',
        minWidth: '250px'
    },
    [theme.breakpoints.down('md')]: {
        width: '40%',
        minWidth: '200px',
        padding: theme.spacing(0.6, 2)
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
}));

const MobileSearch = styled('div')(({ theme, show }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    padding: theme.spacing(2),
    display: show ? 'flex' : 'none',
    alignItems: 'center',
    zIndex: 1000,
    '& .search-input': {
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: theme.spacing(1, 2),
        width: '100%',
        outline: 'none',
        fontSize: '1rem',
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    marginRight: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[600],
    transition: 'color 0.2s ease',
    [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(1)
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.grey[800],
    flex: 1,
    fontWeight: 500,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.2, 0),
        width: '100%',
        fontSize: '0.95rem',
        '&::placeholder': {
            opacity: 0.7,
            fontWeight: 400,
        },
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1, 0),
            fontSize: '0.9rem',
        },
    },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    '& img': {
        width: '75px',
        [theme.breakpoints.down('md')]: {
            width: '55px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '45px'
        },
    }
}));

const UserSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    padding: theme.spacing(1, 1.5),
    borderRadius: '20px',
    transition: 'all 0.2s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-1px)',
    },
    [theme.breakpoints.down('md')]: {
        gap: theme.spacing(1),
        padding: theme.spacing(0.8, 1),
    },
    [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(0.5),
        padding: theme.spacing(0.5),
    },
}));

const UserName = styled('span')(({ theme }) => ({
    color: 'white',
    fontWeight: 600,
    fontSize: '0.9rem',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const AuthButton = styled('button')(({ theme, variant }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1, 2.5),
    borderRadius: '22px',
    border: variant === 'outlined' ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
    background: variant === 'outlined'
        ? 'transparent'
        : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.9rem',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    boxShadow: variant === 'outlined'
        ? 'none'
        : '0 4px 15px rgba(254, 107, 139, 0.3)',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: variant === 'outlined'
            ? '0 4px 15px rgba(255, 255, 255, 0.2)'
            : '0 6px 20px rgba(254, 107, 139, 0.4)',
        background: variant === 'outlined'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0.8, 2),
        fontSize: '0.85rem',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.7, 1.5),
        fontSize: '0.8rem',
        minWidth: 'auto',
    },
}));

const CartButton = styled('button')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.2, 2),
    borderRadius: '20px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.25)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
    },
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1, 1.5),
        fontSize: '0.85rem',
        gap: theme.spacing(0.8),
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.8, 1),
        fontSize: '0',
        gap: 0,
        minWidth: '44px',
        '& span': {
            display: 'none'
        }
    },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
    color: 'white',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
    },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '16px',
        marginTop: theme.spacing(1),
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        overflow: 'visible',
        [theme.breakpoints.down('sm')]: {
            width: '90vw',
            maxWidth: '320px',
        },
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 20,
            width: 12,
            height: 12,
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: 'none',
            borderBottom: 'none',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: theme.spacing(1.5, 2.5),
    borderRadius: '12px',
    margin: theme.spacing(0.5, 1),
    transition: 'all 0.2s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        transform: 'translateX(4px)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.2, 2),
        fontSize: '0.9rem',
    },
}));

export default function Navbar() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showMobileSearch, setShowMobileSearch] = React.useState(false);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const location = useLocation();
    const isSearchPage = location.pathname === "/search-product";

    const userData = useSelector((state) => {
        return state.userDetails
    });

    console.log("UserData is = ", userData);

    async function handleLogout() {
        handleClose();

        const LOGOUT_ENDPOINT = APIConfig.apiPath.logout;
        const response = await getApiRequestWrapper(LOGOUT_ENDPOINT);

        if (response?.success === true && response?.error === false) {
            localStorage.clear();
            dispatch(clearUserDetails());
            showSuccessToast(response?.message);
        }
    }

    const isUserLoggedIn = userData && Object.keys(userData).length > 0;

    return (
        <>
            <StyledAppBar position="static">
                <Toolbar sx={{
                    justifyContent: 'space-between',
                    padding: { xs: '8px 42px', sm: '6px 38px 6px 60px', md: '6px 38px 6px 60px' },
                    minHeight: { xs: '56px', sm: '64px', md: '72px' },
                    position: 'relative'
                }}>
                    {/* Left Side - Logo */}
                    <LogoContainer>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <img
                                src={projectImages.swiftDropLogo}
                                alt="SwiftDrop Logo"
                                style={{
                                    cursor: 'pointer',
                                    filter: 'brightness(1.1)',
                                    transition: 'filter 0.2s ease'
                                }}
                            />
                        </Link>
                    </LogoContainer>

                    {/* Center - Enhanced Search Bar (Hidden on mobile) */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon fontSize="medium" />
                        </SearchIconWrapper>
                        {isSearchPage ? (
                            <StyledInputBase
                                placeholder="Search for products..."
                                inputProps={{ 'aria-label': 'search' }}
                                autoFocus
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    cursor: "text"
                                }}
                                onClick={() => {
                                    navigate("/search-product")
                                }}
                            >
                                <StyledInputBase
                                    disabled
                                    placeholder=""
                                    inputProps={{ 'aria-label': 'search', style: { color: "#888" } }}
                                    sx={{ background: "transparent", pointerEvents: "none" }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: 54,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        pointerEvents: "none",
                                        color: "#888",
                                        fontWeight: 400,
                                        fontSize: "0.95rem",
                                        width: "calc(100% - 48px)",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <TypingAnimation
                                        messages={searchPlaceholders}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Search>

                    {/* Right Side - User Actions */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 0.5, sm: 1, md: 2 },
                        flexShrink: 0
                    }}>
                        {/* Mobile Search Toggle */}
                        <MobileMenuButton
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                            sx={{
                                [theme.breakpoints.up('sm')]: {
                                    display: 'none'
                                }
                            }}
                        >
                            {showMobileSearch ? <CloseIcon /> : <SearchIcon />}
                        </MobileMenuButton>

                        {isUserLoggedIn ? (
                            <>
                                <UserSection onClick={handleMenu}>
                                    <UserName>
                                        {userData?.name}
                                    </UserName>
                                    <Avatar src={userData?.avatar} alt={name}>
                                        {userData?.name?.charAt(0).toUpperCase() || '?'}
                                    </Avatar>
                                </UserSection>

                                <StyledMenu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    PaperProps={{
                                        sx: {
                                            width: { xs: 260, sm: 280 },
                                            mt: 1.5
                                        }
                                    }}
                                >
                                    <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                        <Chip
                                            label="Welcome back!"
                                            color="primary"
                                            size="small"
                                            sx={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white'
                                            }}
                                        />
                                    </Box>

                                    <StyledMenuItem onClick={()=>{
                                        navigate("/my-account");
                                        handleClose();
                                    }}>
                                        <Person4Icon sx={{ mr: 2 }} fontSize='medium' />
                                        My Profile
                                    </StyledMenuItem>

                                    <StyledMenuItem onClick={handleClose}>
                                        <ShoppingBagIcon sx={{ mr: 2 }} />
                                        Orders
                                    </StyledMenuItem>

                                    <StyledMenuItem onClick={handleClose}>
                                        <HomeIcon sx={{ mr: 2 }} />
                                        Address
                                    </StyledMenuItem>

                                    <Divider sx={{ my: 1 }} />

                                    <StyledMenuItem
                                        onClick={handleLogout}
                                        sx={{
                                            color: 'error.main',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%) !important',
                                                color: 'white !important'
                                            }
                                        }}
                                    >
                                        <LogoutIcon sx={{ mr: 2 }} />
                                        Logout
                                    </StyledMenuItem>
                                </StyledMenu>
                            </>
                        ) : (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 0.5, sm: 1, md: 1.5 },
                                flexWrap: 'nowrap'
                            }}>
                                <Link to="/auth/log-in" style={{ textDecoration: 'none' }}>
                                    <AuthButton variant="outlined">
                                        Login
                                    </AuthButton>
                                </Link>

                                <Link to="/auth/register-user" style={{ textDecoration: 'none' }}>
                                    <AuthButton>
                                        Sign Up
                                    </AuthButton>
                                </Link>
                            </Box>
                        )}

                        <CartButton>
                            <Badge
                                badgeContent={1}
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        fontWeight: 'bold',
                                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                        minWidth: { xs: '16px', sm: '20px' },
                                        height: { xs: '16px', sm: '20px' }
                                    }
                                }}
                            >
                                <ShoppingCartIcon fontSize={window.innerWidth < 600 ? 'small' : 'medium'} />
                            </Badge>
                        </CartButton>
                    </Box>
                </Toolbar>

                {/* Mobile Search Bar */}
                <MobileSearch show={showMobileSearch} onClick={() => {
                    navigate("/search-product");
                }}>
                    <SearchIcon sx={{ mr: 2, color: 'grey.600' }} />
                    <input
                        className="search-input"
                        placeholder="Search for products..."
                        onBlur={() => setTimeout(() => setShowMobileSearch(false), 200)}
                    />
                </MobileSearch>
            </StyledAppBar>
        </>
    );
};