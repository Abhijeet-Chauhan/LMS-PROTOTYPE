import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import DashboardSidebar from '../components/DashboardSidebar';
import { KpiCard, ClassPerformanceChart, InterventionList, AiQuickActions, MessagesView } from '../components/TeacherDashboardComponents';
import { StudentPerformanceTable, ScoreTrendChart, StrugglingTopicsChart, EngagementPieChart } from '../components/AnalyticsComponents';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import GradingIcon from '@mui/icons-material/Grading';

const MainDashboardView = () => (
    <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <KpiCard title="At-Risk Students" value="3" icon={<CrisisAlertIcon />} comparison="+1 from last week" color="error" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <KpiCard title="Assignments Graded" value="86%" icon={<TaskAltIcon />} comparison="92% average" color="success" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <KpiCard title="Grading Queue" value="17" icon={<GradingIcon />} comparison="5 new submissions" color="info" />
                    </Grid>
                </Grid>
                <InterventionList />
            </Stack>
        </Grid>
        <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
                <AiQuickActions />
                <ClassPerformanceChart />
            </Stack>
        </Grid>
    </Grid>
);

const PlaceholderView = ({ title }) => (
    <Box>
        <Typography variant="h4" fontWeight={700}>{title}</Typography>
        <Typography color="text.secondary">This section is under construction.</Typography>
    </Box>
);

const AnalyticsView = () => (
    <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
                <ScoreTrendChart />
                <StudentPerformanceTable />
            </Stack>
        </Grid>
        <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
                <EngagementPieChart />
                <StrugglingTopicsChart />
            </Stack>
        </Grid>
    </Grid>
);

export default function TeacherDashboard() {
    const [activeView, setActiveView] = useState('Dashboard');
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const drawerWidth = 250;
    const collapsedWidth = 70;

    const renderContent = () => {
        switch(activeView) {
            case 'Dashboard':
                return <MainDashboardView />;
            case 'Study Spaces':
                return <PlaceholderView title="Study Spaces" />;
            // THE FIX IS HERE: It now returns the correct AnalyticsView component
            case 'Analytics':
                return <AnalyticsView />; 
            case 'Messages':
                return <MessagesView />;
            default:
                return <MainDashboardView />;
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
            
            <Box component="main" sx={{ 
                flexGrow: 1, 
                ml: {md: isCollapsed ? `${collapsedWidth}px` : `${drawerWidth}px` }, 
                p: 3,
                transition: 'margin-left 0.3s ease',
            }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                        {activeView === 'Dashboard' ? 'Welcome, Teacher!' : activeView}
                    </Typography>
                    {renderContent()}
                </Container>
            </Box>
        </Box>
    );
}