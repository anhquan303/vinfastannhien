import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

export default function CartPreview({ onClose }) {
    const [cartItems, setCartItem] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
    //   const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const total = 0

    console.log("cartItems pre: ", cartItems)

    return (
        <Box
            onMouseEnter={onClose}
            sx={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 10px)',
                zIndex: 99,
                bgcolor: '#fff',
                width: 300,
                boxShadow: 3,
                borderRadius: 1,
                p: 2,
            }}
        >
            {!isEmpty(cartItems) && cartItems.map((item, i) => (
                <Box key={i} display="flex" mb={2}>
                    <Box
                        component="img"
                        src={item.img}
                        alt={item.name}
                        sx={{ width: 60, height: 60, objectFit: 'cover', mr: 2 }}
                    />
                    <Box flex={1}>
                        <Typography fontSize={14} fontWeight="bold" color="primary">
                            {item.name}
                        </Typography>
                        <Typography variant="caption">
                            {item.quantityCart} × {item.price.toLocaleString('vi-VN')}₫
                        </Typography>
                    </Box>
                </Box>
            ))}

            <Divider sx={{ my: 1 }} />
            <Typography fontWeight="bold" textAlign="right">
                Tổng số phụ: {total.toLocaleString('vi-VN')}₫
            </Typography>

            <Box mt={2} display="flex" gap={1}>
                <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/cart"
                    sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}
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