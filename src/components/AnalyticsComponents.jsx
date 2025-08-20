import React from 'react';
import { Box, Paper, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Chip } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockData } from '../data/mockData';

// Re-usable widget wrapper
const AnalyticsWidget = ({ title, children }) => (
    <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 4, height: '100%' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>{title}</Typography>
        {children}
    </Paper>
);

// 1. Student Performance Table
export const StudentPerformanceTable = () => {
    const theme = useTheme();
    return (
        <AnalyticsWidget title="Student Performance Overview">
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Avg. Grade</TableCell>
                            <TableCell align="center">Completion</TableCell>
                            <TableCell align="center">Engagement</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockData.teacher.analytics.students.map((student) => (
                            <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{student.name}</TableCell>
                                <TableCell align="right">{student.avgGrade}%</TableCell>
                                <TableCell align="left">
                                    <LinearProgress variant="determinate" value={student.completion} sx={{height: 8, borderRadius: 5}}/>
                                </TableCell>
                                <TableCell align="center">
                                    <Chip label={`${student.engagement}%`} size="small" color={student.engagement > 80 ? 'success' : student.engagement > 60 ? 'warning' : 'error'} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AnalyticsWidget>
    );
};

// 2. Score Trend Line Chart
export const ScoreTrendChart = () => {
    const theme = useTheme();
    return (
        <AnalyticsWidget title="Average Scores Over Time">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData.teacher.analytics.scoreTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="module" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <Legend />
                    <Line type="monotone" dataKey="averageScore" stroke={theme.palette.primary.main} strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </AnalyticsWidget>
    );
};

// 3. Struggling Topics Bar Chart
export const StrugglingTopicsChart = () => {
    const theme = useTheme();
    return (
        <AnalyticsWidget title="Struggling Topics">
            <ResponsiveContainer width="100%" height={250}>
                <BarChart layout="vertical" data={mockData.teacher.analytics.strugglingTopics} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme.palette.divider} />
                    <XAxis type="number" stroke={theme.palette.text.secondary} />
                    <YAxis dataKey="topic" type="category" width={100} stroke={theme.palette.text.secondary} />
                    <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <Bar dataKey="struggleRate" fill={theme.palette.secondary.main} background={{ fill: theme.palette.background.default }} />
                </BarChart>
            </ResponsiveContainer>
        </AnalyticsWidget>
    );
};

// 4. Engagement Distribution Pie Chart
export const EngagementPieChart = () => {
    const theme = useTheme();
    const data = mockData.teacher.analytics.engagementDistribution;
    return (
        <AnalyticsWidget title="Engagement Distribution">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </AnalyticsWidget>
    );
};