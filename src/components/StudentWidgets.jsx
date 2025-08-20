import React from 'react';
import { Paper, Typography, Stepper, Step, StepLabel, StepContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { mockData } from '../data/mockData';

const Widget = ({ title, children }) => (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" color="primary" gutterBottom>{title}</Typography>
        {children}
    </Paper>
);

export const LearningPathwayWidget = () => (
    <Widget title="Your Learning Pathway: Algebra">
        <Stepper activeStep={2} orientation="vertical">
            {mockData.student.learningPathway.map((step) => (
                <Step key={step.title} completed={step.completed}>
                    <StepLabel>{step.title}</StepLabel>
                    <StepContent>
                        {step.active && <Button variant="contained" sx={{ mt: 1 }}>Start Lesson</Button>}
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    </Widget>
);

export const SmartNudgesWidget = () => (
     <Widget title="AI Smart Nudges">
        <List>
            {mockData.student.smartNudges.map((nudge, i) => (
                <ListItem key={i}>
                    <ListItemIcon sx={{minWidth: '36px'}}><LightbulbIcon color="secondary"/></ListItemIcon>
                    <ListItemText secondary={nudge} />
                </ListItem>
            ))}
        </List>
    </Widget>
);

export const DeadlinesWidget = () => (
    <Widget title="Upcoming Deadlines">
        <List>
            {mockData.student.upcomingDeadlines.map((item) => (
                <ListItem key={item.id}>
                    <ListItemText primary={item.title} secondary={item.due} />
                </ListItem>
            ))}
        </List>
    </Widget>
);