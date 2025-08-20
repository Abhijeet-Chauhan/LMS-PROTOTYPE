import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import DashboardSidebar from '../components/DashboardSidebar';
import { AiDigestWidget, MasteryMapWidget, WellbeingChart, ParentActionsWidget } from '../components/ParentDashboardComponents';
import { MessagesView } from '../components/TeacherDashboardComponents'; // Reuse messages view

const PlaceholderView = ({ title }) => (
    <Box>
        <Typography variant="h4" fontWeight={700}>{title}</Typography>
        <Typography color="text.secondary">This section is under construction.</Typography>
    </Box>
);

// The main view for the parent's dashboard
const MainParentDashboardView = () => (
    <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
                <AiDigestWidget />
                <WellbeingChart />
            </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
                <MasteryMapWidget />
                <ParentActionsWidget />
            </Stack>
        </Grid>
    </Grid>
);

export default function ParentDashboard() {
    const [activeView, setActiveView] = useState('Overview');
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const drawerWidth = 250;
    const collapsedWidth = 70;

    const renderContent = () => {
        switch(activeView) {
            case 'Overview':
                return <MainParentDashboardView />;
            case 'Wellbeing':
                return <PlaceholderView title="Wellbeing Details" />;
            case 'Messages':
                return <MessagesView />;
            default:
                return <MainParentDashboardView />;
        }
    };

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            <DashboardSidebar 
                activeView={activeView} 
                setActiveView={setActiveView}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            
            <Box component="main" sx={{ flexGrow: 1, ml: {md: isCollapsed ? `${collapsedWidth}px` : `${drawerWidth}px` }, p: 3, transition: 'margin-left 0.3s ease' }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                        Parent Overview for Alex
                    </Typography>
                    {renderContent()}
                </Container>
            </Box>
        </Box>
    );
}