import React from 'react';
// This import list now contains everything needed for BOTH the dashboard and messages view
import { Avatar, Box, Button, Paper, Typography, useTheme, List, ListItem, ListItemText, ListItemAvatar, Stack, Badge, TextField, InputAdornment, IconButton, ListItemButton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockData } from '../data/mockData';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import GradingIcon from '@mui/icons-material/Grading';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuizIcon from '@mui/icons-material/Quiz';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';

// A styled wrapper for all dashboard widgets
const DashboardWidget = ({ children, sx }) => (
    <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 4, height: '100%', ...sx }}>
        {children}
    </Paper>
);

// --- NEW, REDESIGNED DASHBOARD WIDGETS ---

// KPI Card for big numbers - Redesigned
export const KpiCard = ({ title, value, icon, comparison, color }) => (
    <DashboardWidget>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="text.secondary">{title}</Typography>
            <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 40, height: 40 }}>{icon}</Avatar>
        </Box>
        <Typography variant="h3" fontWeight={700} sx={{ my: 1 }}>{value}</Typography>
        <Typography variant="body2" color="text.secondary">{comparison}</Typography>
    </DashboardWidget>
);

// New, improved class performance chart - Redesigned
export const ClassPerformanceChart = () => {
    const theme = useTheme();
    return (
        <DashboardWidget>
            <Typography variant="h6" fontWeight={600} gutterBottom>Class Performance</Typography>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockData.teacher.classPerformance} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider}/>
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} fontSize={12} />
                    <YAxis stroke={theme.palette.text.secondary} fontSize={12}/>
                    <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: '8px' }} />
                    <Bar dataKey="value" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </DashboardWidget>
    );
};

// New intervention list, inspired by the "Manage Projects" reference
export const InterventionList = () => {
    return (
        <DashboardWidget>
            <Typography variant="h6" fontWeight={600} gutterBottom>Early Intervention Alerts</Typography>
            <List sx={{ p: 0 }}>
                {mockData.teacher.earlyIntervention.map((student) => (
                    <ListItem key={student.id} disablePadding sx={{ my: 1.5 }}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: `${student.status}.light`, color: `${student.status}.dark` }}>{student.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={student.name} secondary={student.reason} />
                        <Box sx={{
                            px: 1.5, py: 0.5,
                            borderRadius: '12px',
                            bgcolor: `${student.status}.light`,
                            color: `${student.status}.dark`,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        }}>
                            {student.status.toUpperCase()}
                        </Box>
                    </ListItem>
                ))}
            </List>
        </DashboardWidget>
    );
};

// New AI Actions widget, inspired by "How can I help you?"
export const AiQuickActions = () => (
    <DashboardWidget>
         <Typography variant="h6" fontWeight={600} gutterBottom>
            <Box component="span" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <AutoFixHighIcon color="secondary" /> AI Co-Pilot
            </Box>
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 2 }}>
            <Button size="large" variant="outlined" startIcon={<QuizIcon />}>Generate Quiz</Button>
            <Button size="large" variant="outlined" startIcon={<TextSnippetIcon />}>Summarize Topic</Button>
            <Button size="large" variant="outlined" startIcon={<LightbulbIcon />}>Suggest Activity</Button>
            <Button size="large" variant="outlined" startIcon={<GradingIcon />}>Grade Assistant</Button>
        </Box>
    </DashboardWidget>
);

// --- MESSAGES VIEW COMPONENT (PREVIOUSLY BUILT) ---

export const MessagesView = () => {
    const theme = useTheme();
    const [selectedConversation, setSelectedConversation] = React.useState(mockData.teacher.conversations[0]);

    const MessageBubble = ({ message }) => (
        <Box sx={{ display: 'flex', justifyContent: message.from === 'teacher' ? 'flex-end' : 'flex-start', mb: 2 }}>
            <Paper
                elevation={0}
                variant={message.from !== 'teacher' ? 'outlined' : 'elevation'}
                sx={{
                    p: 1.5,
                    borderRadius: 4,
                    bgcolor: message.from === 'teacher' ? 'primary.main' : 'background.paper',
                    color: message.from === 'teacher' ? 'primary.contrastText' : 'text.primary',
                    maxWidth: '70%',
                }}
            >
                <Typography variant="body2">{message.text}</Typography>
            </Paper>
        </Box>
    );

    const AiChatSuggestions = () => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button size="small" variant="outlined">Smart Reply</Button>
            <Button size="small" variant="outlined">Tone Adjustment</Button>
            <Button size="small" variant="outlined">Follow-up Suggestions</Button>
            <Button size="small" variant="outlined">Message Summarization</Button>
        </Box>
    );
    
    const getTagColor = (type) => {
        if (type === 'Parent') return { bg: 'warning.light', text: 'warning.dark' };
        return { bg: 'success.light', text: 'success.dark' };
    }

    return (
        <Paper variant="outlined" sx={{ borderRadius: 4, height: 'calc(100vh - 120px)', display: 'flex' }}>
            {/* Conversation List */}
            <Box sx={{ width: 320, borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight={600}>All Messages</Typography>
                </Box>
                <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {mockData.teacher.conversations.map(convo => (
                        <ListItemButton
                            key={convo.id}
                            selected={selectedConversation && selectedConversation.id === convo.id}
                            onClick={() => setSelectedConversation(convo)}
                            sx={{ alignItems: 'flex-start' }}
                        >
                            <ListItemAvatar>
                                <Badge color="secondary" badgeContent={convo.unread} invisible={!convo.unread}>
                                    <Avatar>{convo.avatar}</Avatar>
                                </Badge>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography component="span" variant="body1" fontWeight={500}>{convo.name}</Typography>
                                        <Box sx={{ px: 1, py: 0.25, borderRadius: '6px', fontSize: '0.65rem', fontWeight: 'bold', bgcolor: getTagColor(convo.type).bg, color: getTagColor(convo.type).text }}>
                                            {convo.type.toUpperCase()}
                                        </Box>
                                    </Box>
                                }
                                secondary={convo.lastMessage}
                                secondaryTypographyProps={{ noWrap: true, textOverflow: 'ellipsis', mt: 0.5 }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ml: 1, whiteSpace: 'nowrap'}}>{convo.time}</Typography>
                        </ListItemButton>
                    ))}
                </List>
            </Box>
            
            {/* Chat Window */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {selectedConversation ? (
                    <>
                        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="h6" fontWeight={600}>{selectedConversation.name}</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                            {selectedConversation.messages.map((msg, index) => <MessageBubble key={index} message={msg} />)}
                        </Box>
                        <AiChatSuggestions />
                        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                            <TextField fullWidth variant="outlined" placeholder="Send message..." InputProps={{ endAdornment: ( <InputAdornment position="end"> <IconButton color="primary"><SendIcon /></IconButton> </InputAdornment> ), sx: { borderRadius: 3 } }} />
                        </Box>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', color: 'text.secondary' }}>
                        <ChatBubbleOutlineIcon sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h6">Select a conversation</Typography>
                        <Typography>Start chatting with students and parents.</Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};