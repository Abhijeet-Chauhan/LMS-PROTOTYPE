import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography, IconButton, useTheme, styled } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Logo from '../assets/logo.svg';
import { ThemeContext } from '../context/ThemeContext';

// Create a custom styled Menu component
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 8,
    marginTop: theme.spacing(1),
    minWidth: 180,
    border: '1px solid',
    borderColor: theme.palette.divider,
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

export default function Header() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogin = (userType) => {
    login(userType);
    handleMenuClose();
    navigate(`/${userType}`);
  };

  const navTextColor = theme.palette.mode === 'light' ? 'text.primary' : 'inherit';

  return (
    <AppBar position="fixed" elevation={0} sx={{ top: 16, left: '50%', transform: 'translateX(-50%)', width: '95%', maxWidth: '1100px', borderRadius: '12px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid', borderColor: (theme) => theme.palette.divider, }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="logo" style={{ marginRight: '12px' }}/>
          <Typography variant="h6" sx={{ flexGrow: 1, color: navTextColor }}>BrainFog</Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button color="inherit" href="#features" sx={{ color: navTextColor }}>Features</Button>
            <Button color="inherit" href="#pricing" sx={{ color: navTextColor }}>Pricing</Button>
            <Button color="inherit" href="#resources" sx={{ color: navTextColor }}>Resources</Button>
          </Box>
          <IconButton sx={{ ml: 1, color: navTextColor }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Box sx={{ ml: 1 }}>
            <Button onClick={handleMenuClick} variant="outlined" sx={{ color: navTextColor, borderColor: 'currentColor' }}>Login</Button>
            {/* THE FIX IS HERE: We are using our new StyledMenu */}
            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleLogin('teacher')}><SchoolIcon /> Teacher</MenuItem>
              <MenuItem onClick={() => handleLogin('student')}><PersonIcon /> Student</MenuItem>
              <MenuItem onClick={() => handleLogin('parent')}><FamilyRestroomIcon /> Parent</MenuItem>
            </StyledMenu>
          </Box>
          <Button variant="contained" sx={{ ml: 2, bgcolor: theme.palette.mode === 'light' ? 'common.black' : 'common.white', color: theme.palette.mode === 'light' ? 'common.white' : 'common.black', '&:hover': { bgcolor: theme.palette.mode === 'light' ? '#333' : '#eee', } }}>Request a Demo</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}