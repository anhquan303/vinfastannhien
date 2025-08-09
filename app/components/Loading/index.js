import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import logo from '../../images/logo.png';

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        zIndex: 2000,
      }}
    >
      {/* Logo quay ngang */}
      <Box
        component="img"
        src={logo}
        alt="VinFast Logo"
        sx={{
          width: 80,
          height: 80,
          animation: 'flipHoriz 1.5s linear infinite',
          transformStyle: 'preserve-3d',
          '@keyframes flipHoriz': {
            '0%': { transform: 'rotateY(0deg)' },
            '100%': { transform: 'rotateY(360deg)' },
          },
        }}
      />

      {/* Text */}
      <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
        Đang tải...
      </Typography>
    </Box>
  );
}
