import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeContextProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


const globalStyles = (
    <GlobalStyles
      styles={(theme) => ({
        // This enables smooth scrolling on the whole page
        'html': {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: theme.palette.mode === 'light' ? '#f4f6f8' : '#121212',
        },
      })}
    />
  );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthProvider>
        <CssBaseline />
        {globalStyles}
        <App />
      </AuthProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);