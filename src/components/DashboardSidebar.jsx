import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Tooltip, Menu, MenuItem, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book'; // Student icon
import Logo from '../assets/logo.svg';import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';


// Define nav items for each role
const teacherNav = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Study Spaces', icon: <ClassIcon /> },
    { text: 'Analytics', icon: <AnalyticsIcon /> },
    { text: 'Messages', icon: <MessageIcon /> },
];

const studentNav = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'My Courses', icon: <BookIcon /> },
    { text: 'Messages', icon: <MessageIcon /> }, // Added for student
];

const parentNav = [
    { text: 'Overview', icon: <DashboardIcon /> },
    { text: 'Wellbeing', icon: <EscalatorWarningIcon /> },
    { text: 'Messages', icon: <MessageIcon /> },
];

export default function DashboardSidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed }) {
    const drawerWidth = 250;
    const collapsedWidth = 70;
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Determine which nav items to show based on user type
    let navItems = teacherNav; // Default to teacher
    if (user?.type === 'student') {
        navItems = studentNav;
    } else if (user?.type === 'parent') {
        navItems = parentNav;
    }

    const handleSettingsClick = (event) => setAnchorEl(event.currentTarget);
    const handleSettingsClose = () => setAnchorEl(null);
    
    const handleLogout = () => {
        handleSettingsClose();
        logout();
        navigate('/');
    };
    const handleProfile = () => {
        handleSettingsClose();
        alert('Profile page coming soon!');
    };

    return (
        <Box
            sx={{
                width: isCollapsed ? collapsedWidth : drawerWidth,
                height: '100vh',
                position: 'fixed',
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                borderRight: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                transition: 'width 0.3s ease',
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider', justifyContent: isCollapsed ? 'center' : 'space-between' }}>
                {!isCollapsed && <img src={Logo} alt="logo" style={{ height: '32px' }}/>}
                {!isCollapsed && <Typography variant="h6" fontWeight={600} noWrap>BrainFog</Typography>}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOpenIcon sx={{ transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </IconButton>
            </Box>

            <List sx={{ flexGrow: 1, p: 1 }}>
                {navItems.map((item) => (
                     <Tooltip key={item.text} title={isCollapsed ? item.text : ''} placement="right" arrow>
                        <ListItem disablePadding>
                            <ListItemButton selected={activeView === item.text} onClick={() => setActiveView(item.text)} sx={{ borderRadius: 2, mb: 0.5, justifyContent: isCollapsed ? 'center' : 'initial' }}>
                                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                                {!isCollapsed && <ListItemText primary={item.text} sx={{ ml: 2, opacity: isCollapsed ? 0 : 1, transition: 'opacity 0.3s' }} />}
                            </ListItemButton>
                        </ListItem>
                     </Tooltip>
                ))}
            </List>
            
            <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                 <Tooltip title={isCollapsed ? "Settings" : ''} placement="right" arrow>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleSettingsClick} sx={{ borderRadius: 2, justifyContent: isCollapsed ? 'center' : 'initial' }}>
                            <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}><SettingsIcon /></ListItemIcon>
                             {!isCollapsed && <ListItemText primary="Settings" sx={{ ml: 2, opacity: isCollapsed ? 0 : 1, transition: 'opacity 0.3s' }} />}
                        </ListItemButton>
                    </ListItem>
                 </Tooltip>
                 <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleSettingsClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    PaperProps={{ sx: { borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }}
                 >
                    <MenuItem onClick={handleProfile}>
                        <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                        Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                        <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: 'error.main' }}/></ListItemIcon>
                        Logout
                    </MenuItem>
                 </Menu>
            </Box>
        </Box>
    );
}