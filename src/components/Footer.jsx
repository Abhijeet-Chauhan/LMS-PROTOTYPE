import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import Logo from '../assets/logo.svg';

const FooterLink = ({ children }) => (
    <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mb: 1 }}>
        {children}
    </Link>
);

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img src={Logo} alt="logo" style={{ marginRight: '12px' }}/>
              <Typography variant="h6">BrainFog</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              A smarter, more connected learning ecosystem.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="overline" gutterBottom>Product</Typography>
            <FooterLink>Features</FooterLink>
            <FooterLink>Pricing</FooterLink>
            <FooterLink>Demo</FooterLink>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="overline" gutterBottom>Company</Typography>
            <FooterLink>About Us</FooterLink>
            <FooterLink>Careers</FooterLink>
            <FooterLink>Contact</FooterLink>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="overline" gutterBottom>Resources</Typography>
            <FooterLink>Blog</FooterLink>
            <FooterLink>Help Center</FooterLink>
            <FooterLink>Privacy Policy</FooterLink>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="overline" gutterBottom>Social</Typography>
            <FooterLink>Twitter</FooterLink>
            <FooterLink>LinkedIn</FooterLink>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4, mt: 4, borderTop: 1, borderColor: 'divider' }}>
          © {new Date().getFullYear()} BrainFog. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}