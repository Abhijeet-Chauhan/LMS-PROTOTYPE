import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Tooltip, Menu, MenuItem, Divider, Drawer, useTheme } from '@mui/material'; // Import Drawer
import { ThemeContext } from '../context/ThemeContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Logo from '../assets/logo.svg';

const teacherNav = [ { text: 'Dashboard', icon: <DashboardIcon /> }, { text: 'Study Spaces', icon: <ClassIcon /> }, { text: 'Analytics', icon: <AnalyticsIcon /> }, { text: 'Messages', icon: <MessageIcon /> }, ];
const studentNav = [ { text: 'Dashboard', icon: <DashboardIcon /> }, { text: 'My Courses', icon: <BookIcon /> }, { text: 'Messages', icon: <MessageIcon /> }, ];
const parentNav = [ { text: 'Overview', icon: <DashboardIcon /> }, { text: 'Wellbeing', icon: <EscalatorWarningIcon /> }, { text: 'Messages', icon: <MessageIcon /> }, ];

export default function DashboardSidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed }) {
    const drawerWidth = 250;
    const collapsedWidth = 70;
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const colorMode = useContext(ThemeContext);
    const open = Boolean(anchorEl);

    let navItems = teacherNav;
    if (user?.type === 'student') navItems = studentNav;
    if (user?.type === 'parent') navItems = parentNav;

    const handleSettingsClick = (event) => setAnchorEl(event.currentTarget);
    const handleSettingsClose = () => setAnchorEl(null);
    const handleLogout = () => { handleSettingsClose(); logout(); navigate('/'); };
    const handleProfile = () => { handleSettingsClose(); alert('Profile page coming soon!'); };

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                 <Menu anchorEl={anchorEl} open={open} onClose={handleSettingsClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'bottom', horizontal: 'left' }} PaperProps={{ sx: { borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }}>
                    <MenuItem onClick={handleProfile}> <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon> Profile </MenuItem>
                    <MenuItem onClick={colorMode.toggleColorMode}> <ListItemIcon> {theme.palette.mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />} </ListItemIcon> {theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'} </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}> <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: 'error.main' }}/></ListItemIcon> Logout </MenuItem>
                 </Menu>
            </Box>
        </Box>
    );

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                width: isCollapsed ? collapsedWidth : drawerWidth,
                flexShrink: 0,
                transition: 'width 0.3s ease',
                '& .MuiDrawer-paper': {
                    // THE FIX IS APPLIED HERE
                    width: isCollapsed ? collapsedWidth : drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'transparent', // Make the paper background transparent
                    backdropFilter: 'blur(10px)', // Apply the blur
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    transition: 'width 0.3s ease',
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
}