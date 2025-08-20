import React from 'react';
// THE FIX IS HERE: 'Grid' and 'SchoolIcon' have been added to the import list
import { Box, Paper, Typography, useTheme, List, ListItem, ListItemText, LinearProgress, Button, Avatar, Grid } from '@mui/material';
import { BarChart, Bar, LineChart, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockData } from '../data/mockData';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SchoolIcon from '@mui/icons-material/School'; // Icon for courses

// Re-usable widget wrapper
const DashboardWidget = ({ children, sx }) => (
    <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 4, height: '100%', ...sx }}>
        {children}
    </Paper>
);

// KPI Card with a progress bar inside
export const StudentKpiCard = ({ title, value, icon, progress, color }) => (
    <DashboardWidget sx={{ alignSelf: 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main` }}>{icon}</Avatar>
            <Typography variant="body1" color="text.secondary">{title}</Typography>
        </Box>
        <Typography variant="h4" fontWeight={700} sx={{ my: 1 }}>{value}</Typography>
        {progress !== undefined && <LinearProgress variant="determinate" value={progress} color={color} sx={{ height: 6, borderRadius: 3 }} />}
    </DashboardWidget>
);

// "Up Next" widget for the current lesson
export const UpNextWidget = () => {
    const { course, moduleTitle, progress } = mockData.student.upNext;
    return (
        <DashboardWidget sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" fontWeight={600}>Continue Learning</Typography>
            <Box sx={{ flexGrow: 1, my: 2 }}>
                <Typography color="text.secondary" variant="body2">{course}</Typography>
                <Typography variant="h5" fontWeight={600}>{moduleTitle}</Typography>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, my: 2 }} />
            </Box>
            <Button variant="contained" endIcon={<ArrowForwardIcon />}>Start Lesson</Button>
        </DashboardWidget>
    );
};

// Upcoming Deadlines list
export const UpcomingDeadlinesWidget = () => {
    const getPriorityColor = (priority) => {
        if (priority === 'high') return 'error.main';
        if (priority === 'medium') return 'warning.main';
        return 'success.main';
    };
    return (
        <DashboardWidget>
            <Typography variant="h6" fontWeight={600} gutterBottom>Upcoming Deadlines</Typography>
            <List sx={{ p: 0 }}>
                {mockData.student.upcomingDeadlines.map(item => (
                    <ListItem key={item.id} disablePadding>
                        <Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: getPriorityColor(item.priority), mr: 1.5 }} />
                        <ListItemText primary={item.title} secondary={item.course} />
                        <Typography variant="body2" color="text.secondary">{item.dueDate}</Typography>
                    </ListItem>
                ))}
            </List>
        </DashboardWidget>
    );
};

// Chart for weekly study activity
export const WeeklyActivityChart = () => {
    const theme = useTheme();
    return (
        <DashboardWidget>
            <Typography variant="h6" fontWeight={600} gutterBottom>Weekly Activity</Typography>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockData.student.weeklyActivity} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="day" stroke={theme.palette.text.secondary} fontSize={12} />
                    <YAxis stroke={theme.palette.text.secondary} fontSize={12} unit="h"/>
                    <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <Bar dataKey="hours" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </DashboardWidget>
    );
};

// Chart for recent scores
export const RecentScoresChart = () => {
    const theme = useTheme();
    return (
        <DashboardWidget>
            <Typography variant="h6" fontWeight={600} gutterBottom>Recent Scores</Typography>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={mockData.student.recentScores} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                    <XAxis dataKey="assignment" stroke={theme.palette.text.secondary} fontSize={12}/>
                    <YAxis stroke={theme.palette.text.secondary} fontSize={12} domain={[60, 100]}/>
                    <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="score" stroke={theme.palette.primary.main} fillOpacity={1} fill="url(#scoreGradient)" />
                    <Line type="monotone" dataKey="score" stroke={theme.palette.primary.main} strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </DashboardWidget>
    );
};

export const AiSmartNudgesWidget = () => {
    const nudges = [
      "You've mastered 70% of Module 2, let's finish the last two lessons!",
      "Quiz on Friday! Click here to revise your AI-generated flashcards.",
      "Great job on the last assignment! Let's keep the momentum going."
    ];
    return(
        <DashboardWidget>
            <Typography variant="h6" fontWeight={600} gutterBottom>
                <Box component="span" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <LightbulbIcon color="secondary" /> AI Smart Nudges
                </Box>
            </Typography>
            <List sx={{ p: 0 }}>
                {nudges.map((nudge, i) => (
                    <ListItem key={i} disablePadding sx={{ my: 1 }}>
                        <ListItemText 
                            primary={nudge} 
                            primaryTypographyProps={{ variant: 'body2' }} 
                        />
                    </ListItem>
                ))}
            </List>
            <Button variant="text" size="small" sx={{mt: 1}}>View all suggestions</Button>
        </DashboardWidget>
    );
};

export const MyCoursesView = () => {
    const theme = useTheme();
    return (
        <Grid container spacing={3}>
            {mockData.student.courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <DashboardWidget sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: `${course.color}.light`, color: `${course.color}.main` }}>
                                    <SchoolIcon />
                                </Avatar>
                                <Typography variant="caption" color="text.secondary">Due: {course.nextDueDate}</Typography>
                            </Box>
                            <Typography variant="h6" fontWeight={600}>{course.title}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Taught by {course.teacher}</Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <LinearProgress variant="determinate" value={course.progress} color={course.color} sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} />
                                <Typography variant="body2" fontWeight={600}>{course.progress}%</Typography>
                            </Box>
                        </Box>
                        <Button variant="contained" sx={{ mt: 3 }}>Go to Course</Button>
                    </DashboardWidget>
                </Grid>
            ))}
        </Grid>
    );
};