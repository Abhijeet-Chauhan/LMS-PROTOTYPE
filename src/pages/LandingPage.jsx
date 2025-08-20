import React, { useRef } from 'react';
import { Box, Button, Container, Paper, SvgIcon, Typography, GlobalStyles } from '@mui/material';
import Header from '../components/Header';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer'; // Import the new Footer
import Draggable from 'react-draggable';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SchoolIcon from '@mui/icons-material/School';

const floatAnimation = `@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }`;

const DraggableFloatingIcon = ({ icon, color, sx, duration = '6s', delay = '0s' }) => {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef}> 
      <Paper
        ref={nodeRef} 
        elevation={4}
        sx={{
          position: 'absolute',
          p: 1.5,
          borderRadius: '12px',
          display: 'inline-flex',
          backgroundColor: color,
          animation: `float ${duration} ease-in-out infinite`,
          animationDelay: delay,
          zIndex: 1,
          cursor: 'move',
          ...sx,
        }}
      >
        <SvgIcon component={icon} sx={{ color: '#fff' }}/>
      </Paper>
    </Draggable>
  );
};

export default function LandingPage() {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden', position: 'relative' }}>
      <GlobalStyles styles={floatAnimation} />
      <Header />
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative' }}>
        <DraggableFloatingIcon icon={SchoolIcon} color="#ffab91" sx={{ top: '20%', left: '15%' }} duration="5s" />
        <DraggableFloatingIcon icon={FamilyRestroomIcon} color="#80cbc4" sx={{ top: '60%', left: '10%' }} duration="7s" delay="1s"/>
        <DraggableFloatingIcon icon={BarChartIcon} color="#ce93d8" sx={{ top: '15%', right: '15%' }} duration="6s" delay="0.5s"/>
        <DraggableFloatingIcon icon={BookIcon} color="#90caf9" sx={{ top: '65%', right: '12%' }} duration="8s" />
        
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h2" component="h1" fontWeight={700} sx={{ mb: 2 }}>
              A Smarter, More Connected Learning Ecosystem
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
              Our AI-powered platform connects teachers, students, and parents to create a personalized, supportive, and effective educational journey.
            </Typography>
            <Button variant="contained" size="large" color="secondary" href="#features">
              Explore Features
            </Button>
          </Box>
        </Container>
      </Box>

      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      {/* THE FOOTER IS ADDED HERE */}
      <Footer />
    </Box>
  );
}