import React from 'react';
import { Box, useTheme } from '@mui/material';

export default function AuroraBackground({ children }) {
  const theme = useTheme();

  // We translate the Tailwind CSS variables into a format MUI can use.
  // We'll use colors from our MUI theme to ensure consistency.
  const auroraColors = {
    '--blue-500': theme.palette.primary.main,
    '--indigo-300': theme.palette.info.light,
    '--blue-300': theme.palette.primary.light,
    '--violet-200': '#ddd6fe', // A light violet
    '--blue-400': theme.palette.primary.main,
  };

  const backgroundImageUrlLight = `repeating-linear-gradient(100deg, ${auroraColors['--blue-500']} 10%, ${auroraColors['--indigo-300']} 15%, ${auroraColors['--blue-300']} 20%, ${auroraColors['--violet-200']} 25%, ${auroraColors['--blue-400']} 30%)`;
  const backgroundImageUrlDark = `repeating-linear-gradient(100deg, ${auroraColors['--blue-500']} 10%, ${auroraColors['--indigo-300']} 15%, ${auroraColors['--blue-300']} 20%, ${auroraColors['--violet-200']} 25%, ${auroraColors['--blue-400']} 30%)`;

  return (
    <Box
      sx={{
        position: 'relative',
        // Ensure it takes up at least the full screen height
        minHeight: '100vh', 
        // Use theme colors for the base background
        bgcolor: theme.palette.mode === 'light' ? 'zinc.50' : 'background.default',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0, // Sit behind content
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            // Use negative inset to avoid hard edges
            inset: '-10px', 
            opacity: 0.5,
            pointerEvents: 'none',
            backgroundImage: theme.palette.mode === 'light' ? backgroundImageUrlLight : backgroundImageUrlDark,
            backgroundSize: '200% 200%',
            animation: 'aurora 60s linear infinite',
            filter: 'blur(20px)',
            // Invert colors to get the desired effect in light mode
            filter: theme.palette.mode === 'light' ? 'blur(20px) invert(1)' : 'blur(20px)',
            // Mask to fade out the effect at the edges
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
          }}
        />
      </Box>
      {/* Ensure children are rendered on top of the background */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}