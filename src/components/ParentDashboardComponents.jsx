import React from 'react';
import { Box, Paper, Typography, useTheme, List, ListItem, ListItemText, LinearProgress, Button, Avatar, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockData } from '../data/mockData';
import EmailIcon from '@mui/icons-material/Email';

// Re-usable widget wrapper
const DashboardWidget = ({ children, sx }) => (
    <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 4, height: '100%', ...sx }}>
        {children}
    </Paper>
);

// 1. Weekly AI Digest Widget
export const AiDigestWidget = () => (
    <DashboardWidget>
        <Typography variant="h6" fontWeight={600} gutterBottom>Weekly AI Digest for Alex</Typography>
        <Typography variant="body1" paragraph>
            This week, Alex completed <strong>Module 3 on Trigonometry</strong>. He performed well on the quiz (85%) but struggled with problem-solving questions.
        </Typography>
        <Typography variant="body2">
            <strong>Suggested support:</strong> 15 min of daily practice on word problems.
        </Typography>
    </DashboardWidget>
);

// 2. Mastery Map Widget
export const MasteryMapWidget = () => {
    const getStatusColor = (progress) => {
        if (progress > 80) return 'success';
        if (progress > 60) return 'warning';
        return 'error';
    };
    return (
        <DashboardWidget>
            <Typography variant="h6" fontWeight={600} gutterBottom>Mastery Map</Typography>
            <List sx={{ p: 0 }}>
                {mockData.parent.masteryMap.map(subject => (
                    <ListItem key={subject.subject} disablePadding sx={{ my: 1.5 }}>
                        <ListItemText primary={subject.subject} sx={{ m: 0 }}/>
                        <Box sx={{ width: '50%', ml: 2 }}>
                             <LinearProgress variant="determinate" value={subject.progress} color={getStatusColor(subject.progress)} sx={{ height: 8, borderRadius: 5 }} />
                        </Box>
                    </ListItem>
                ))}
            </List>
        </DashboardWidget>
    );
};

// 3. Wellbeing Insights Chart
export const WellbeingChart = () => {
    const theme = useTheme();
    return (
        <DashboardWidget>
            <Typography variant="h6" fontWeight={600}>Wellbeing Insights (Trends)</Typography>
             <Typography variant="caption" display="block" gutterBottom color="text.secondary">
                This chart shows general engagement trends to protect student privacy.
            </Typography>
             <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockData.parent.wellbeingTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                     <XAxis dataKey="name" stroke={theme.palette.text.secondary} fontSize={12} />
                     <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
                     <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}/>
                     <Line type="monotone" dataKey="value" stroke={theme.palette.success.main} strokeWidth={2} name="Engagement"/>
                </LineChart>
             </ResponsiveContainer>
        </DashboardWidget>
    );
};

// 4. Quick Actions Widget
export const ParentActionsWidget = () => (
    <DashboardWidget>
        <Typography variant="h6" fontWeight={600} gutterBottom>Quick Actions</Typography>
        <Button variant="contained" startIcon={<EmailIcon />} fullWidth sx={{mt: 1}}>
            Message a Teacher
        </Button>
    </DashboardWidget>
);