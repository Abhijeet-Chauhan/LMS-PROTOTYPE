import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Paper, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    login(userType);
    navigate(`/${userType}`);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: '100%', mt: 3, textAlign: 'center' }}>
          <Typography component="h1" variant="h4" gutterBottom>
            AI-Powered LMS Portal
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Select your role to sign in
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SchoolIcon />}
              onClick={() => handleLogin('teacher')}
            >
              Sign In as Teacher
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<PersonIcon />}
              onClick={() => handleLogin('student')}
            >
              Sign In as Student
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<FamilyRestroomIcon />}
              onClick={() => handleLogin('parent')}
            >
              Sign In as Parent
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}