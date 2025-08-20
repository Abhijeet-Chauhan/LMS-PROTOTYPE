import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Stack, useTheme, Button } from '@mui/material';
import DashboardSidebar from '../components/DashboardSidebar';
// Import the new MyCoursesView
import { StudentKpiCard, UpNextWidget, UpcomingDeadlinesWidget, WeeklyActivityChart, RecentScoresChart, AiSmartNudgesWidget, MyCoursesView } from '../components/StudentDashboardComponents';
import { MessagesView } from '../components/TeacherDashboardComponents';
import { mockData } from '../data/mockData';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PlaceholderView = ({ title }) => (
    <Box>
        <Typography variant="h4" fontWeight={700}>{title}</Typography>
        <Typography color="text.secondary">This section is under construction.</Typography>
    </Box>
);

// New, balanced MainStudentDashboardView
const MainStudentDashboardView = () => (
    <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}><StudentKpiCard title="Courses in Progress" value={mockData.student.kpis.coursesInProgress} icon={<MenuBookIcon />} color="info" /></Grid>
                    <Grid item xs={12} sm={4}><StudentKpiCard title="Assignments Due" value={mockData.student.kpis.assignmentsDue} icon={<AssignmentTurnedInIcon />} color="warning" /></Grid>
                    <Grid item xs={12} sm={4}><StudentKpiCard title="Overall Progress" value={`${mockData.student.kpis.overallProgress}%`} icon={<TrendingUpIcon />} progress={mockData.student.kpis.overallProgress} color="success" /></Grid>
                </Grid>
                <RecentScoresChart />
                {/* THE FIX: Weekly Activity Chart is moved here to fill the space */}
                <WeeklyActivityChart />
            </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
                <UpNextWidget />
                <AiSmartNudgesWidget />
                <UpcomingDeadlinesWidget />
            </Stack>
        </Grid>
    </Grid>
);

export default function StudentDashboard() {
    const theme = useTheme();
    const [activeView, setActiveView] = useState('Dashboard');
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const drawerWidth = 250;
    const collapsedWidth = 70;

    const renderContent = () => {
        switch(activeView) {
            case 'Dashboard':
                return <MainStudentDashboardView />;
            // THE FIX: Render the new MyCoursesView
            case 'My Courses':
                return <MyCoursesView />;
            case 'Messages':
                return <MessagesView />;
            default:
                return <MainStudentDashboardView />;
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h4" fontWeight={700}>
                            {activeView === 'Dashboard' ? 'Your Dashboard, Alex' : activeView}
                        </Typography>
                        {activeView === 'Dashboard' && (
                             <Button variant="outlined" sx={{ borderColor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark', color: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark' }}>
                                View Full Report
                            </Button>
                        )}
                    </Box>
                    {renderContent()}
                </Container>
            </Box>
        </Box>
    );
}