/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
  const history = useHistory();

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        px: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: '#F5167E' }} />
      <Typography variant="h3" fontWeight="bold" mt={2}>
        404
      </Typography>
      <Typography variant="h6" mb={2}>
        Trang bạn tìm kiếm không tồn tại!
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => history.push('/home')}
      >
        Quay về trang chủ
      </Button>
    </Box>
  );
}
