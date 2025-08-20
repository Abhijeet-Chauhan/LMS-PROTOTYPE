import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { motion } from 'framer-motion';

const tiers = [
  { title: 'Basic', price: '12', description: ['Up to 5 classrooms', 'Core AI Tutor', 'Basic Analytics'], buttonText: 'Get Started', buttonVariant: 'outlined' },
  { title: 'Pro', price: '25', description: ['Unlimited classrooms', 'Advanced AI Tutor', 'Predictive Analytics', 'Parent Portal'], buttonText: 'Choose Pro', buttonVariant: 'contained' },
  { title: 'Enterprise', price: 'Contact Us', description: ['Custom Integrations', 'Dedicated Support', 'Advanced Security'], buttonText: 'Contact Sales', buttonVariant: 'outlined' },
];

// Combine motion and Grid into a single component
const MotionGrid = motion(Grid);

export default function PricingSection() {
    const theme = useTheme();
  return (
    <Box id="pricing" sx={{ py: 12, bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
              Flexible plans for every institution
            </Typography>
            <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 8 }}>
              Choose a plan that scales with your needs.
            </Typography>
        </motion.div>
        <Grid container spacing={4} justifyContent="center">
          {tiers.map((tier, index) => (
            // Use the new MotionGrid component directly
            <MotionGrid item xs={12} sm={8} md={4} key={tier.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 * index }}>
                <Card sx={{ 
                    height: '100%', 
                    borderRadius: 4, 
                    border: tier.title === 'Pro' ? '2px solid' : '', 
                    borderColor: 'secondary.main', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[10],
                    },
                }}>
                    <CardHeader title={tier.title} subheader={tier.title === 'Pro' ? 'Most Popular' : ''} sx={{ textAlign: 'center' }} />
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                                {!isNaN(tier.price) && <Typography variant="h4" component="h2">$</Typography>}
                                <Typography variant="h4" component="h2">{tier.price}</Typography>
                                {!isNaN(tier.price) && <Typography variant="h6" color="text.secondary">/mo</Typography>}
                            </Box>
                            <List>
                                {tier.description.map((line) => (
                                <ListItem key={line} disableGutters>
                                    <ListItemIcon sx={{minWidth: 32}}><CheckIcon fontSize="small" color="success" /></ListItemIcon>
                                    <ListItemText primary={line} />
                                </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Button fullWidth variant={tier.buttonVariant} color={tier.title === 'Pro' ? 'secondary' : 'primary'} sx={{mt: 2}}>{tier.buttonText}</Button>
                    </CardContent>
                </Card>
            </MotionGrid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}