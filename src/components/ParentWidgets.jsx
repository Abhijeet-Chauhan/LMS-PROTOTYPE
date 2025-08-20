import React from 'react';
import { Paper, Typography, Box, LinearProgress, List, ListItem, ListItemText } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockData } from '../data/mockData';

const Widget = ({ title, children }) => (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" color="primary" gutterBottom>{title}</Typography>
        {children}
    </Paper>
);

export const AiDigestWidget = () => (
    <Widget title="Weekly AI Digest for Alex">
        <Typography variant="body1">
            This week, Alex completed <strong>Module 3 on Trigonometry</strong>. He performed well on the quiz (85%) but struggled with problem-solving questions.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Suggested support:</strong> 15 min of daily practice on word problems.
        </Typography>
    </Widget>
);

export const MasteryMapWidget = () => (
    <Widget title="Mastery Map">
        {mockData.parent.masteryMap.map(subject => (
            <Box key={subject.subject} sx={{ mb: 2 }}>
                <Typography variant="body1">{subject.subject}</Typography>
                <LinearProgress variant="determinate" value={subject.progress} color={subject.status} sx={{height: 8, borderRadius: 5}}/>
            </Box>
        ))}
    </Widget>
);

export const WellbeingWidget = () => (
    <Widget title="Wellbeing Insights (Trends)">
        <Typography variant="caption" display="block" gutterBottom>
            This chart shows general engagement trends to protect student privacy.
        </Typography>
         <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockData.parent.wellbeingTrend}>
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Engagement"/>
            </LineChart>
         </ResponsiveContainer>
    </Widget>
);