import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton } from '@mui/material';

export default function CartPreview({ onClose }) {
  const [cartItems, setCartItem] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || [],
  );
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantityCart * item.price,
    0,
  );

  const handleRemoveItem = id => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItem(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <Box
      //onMouseEnter={onClose}
      sx={{
        position: 'absolute',
        right: 0,
        //top: 'calc(100% + 10px)',
        top: '100%',
        zIndex: 99,
        bgcolor: '#fff',
        width: 300,
        boxShadow: 3,
        borderRadius: 1,
        p: 2,
      }}
    >
      {!isEmpty(cartItems) &&
        cartItems.map((item, i) => (
          <Box key={i} display="flex" mb={2}>
            <Box
              component="img"
              src={item.img}
              alt={item.name}
              sx={{ maxWidth: 50, maxHeight: 50, objectFit: 'contain', mr: 2 }}
            />
            <Box flex={1}>
              <Typography fontSize={14} fontWeight="bold" color="primary">
                {item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#000' }}>
                {item.quantityCart} × {item.price.toLocaleString('vi-VN')}₫
              </Typography>
            </Box>
            <IconButton
              onClick={() => handleRemoveItem(item.id)}
              size="small"
              color="error"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        ))}

      <Divider sx={{ my: 1 }} />
      <Typography fontWeight="bold" textAlign="right" sx={{ color: '#000' }}>
        Tổng số phụ: {total.toLocaleString('vi-VN')}₫
      </Typography>

      <Box mt={2} display="block" gap={1}>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to="/cart"
          sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' }, my: 1 }}
        >
          Xem giỏ hàng
        </Button>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to="/payment"
          sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#9a0007' } }}
        >
          Thanh toán
        </Button>
      </Box>
    </Box>
  );
}
