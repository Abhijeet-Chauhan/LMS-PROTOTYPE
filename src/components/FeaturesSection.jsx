import React from 'react';
import { Box, Container, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import TeacherMockup from '../assets/mocks/mock-teacher.svg';
import StudentMockup from '../assets/mocks/mock-student.svg';
import ParentMockup from '../assets/mocks/mock-parent.svg';

const FeatureCard = ({ icon, title, description, mockup, iconColor }) => {
    const theme = useTheme();
    return(
        <Paper 
            variant="outlined" 
            sx={{ 
                p: 3, 
                borderRadius: 4, 
                height: '100%', 
                textAlign: 'left',
                bgcolor: theme.palette.mode === 'light' ? '#fff' : 'background.paper',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[10],
                },
            }}
        >
            <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                <Box component="img" src={mockup} alt={`${title} mockup`} sx={{ width: '100%', display: 'block' }} />
            </Box>

            <Typography variant="h6" fontWeight={600} gutterBottom>
                <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ display: 'inline-flex', p: 1, mr: 1.5, borderRadius: '8px', bgcolor: iconColor, color: '#fff' }}>
                        {icon}
                    </Box>
                    {title}
                </Box>
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
        </Paper>
    );
};

export default function FeaturesSection() {
  return (
    <Box id="features" sx={{ py: 12, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
            Built for everyone in the learning journey
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 8, maxWidth: '600px', mx: 'auto' }}>
            Powerful, AI-driven tools tailored for the unique needs of teachers, students, and parents.
          </Typography>
        </motion.div>
        
        {/* THE NEW LAYOUT: Using a simple Flexbox Box instead of Grid */}
        <Box 
            sx={{
                display: 'flex',
                // On mobile (xs), stack them vertically (column). On desktop (md), align them in a row.
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4, // This creates space between the items
            }}
        >
            {/* Each child Box now acts as a column */}
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <FeatureCard icon={<SchoolIcon />} title="For Teachers" description="Automate administrative tasks, gain deep insights into student performance, and create personalized learning paths." mockup={TeacherMockup} iconColor="#ffab91" />
                </motion.div>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                    <FeatureCard icon={<PersonIcon />} title="For Students" description="Receive 24/7 AI-tutoring, follow an adaptive study plan, and get instant feedback to accelerate your learning." mockup={StudentMockup} iconColor="#90caf9"/>
                </motion.div>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }}>
                    <FeatureCard icon={<FamilyRestroomIcon />} title="For Parents" description="Stay informed with clear progress reports, wellbeing insights, and seamless communication channels." mockup={ParentMockup} iconColor="#80cbc4"/>
                </motion.div>
            </Box>
        </Box>
      </Container>
    </Box>
  );
}