/**
 *
 * Cart
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useHistory } from 'react-router-dom';
import { initialCartItems } from './constants';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectCart from './selectors';

export function Cart() {
  useInjectReducer({ key: 'cart', reducer });
  useInjectSaga({ key: 'cart', saga });

  // const [cartItems, setCartItems] = useState(initialCartItems);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || [],
  );
  const [discountCode, setDiscountCode] = useState('');
  const history = useHistory();

  useEffect(() => {
    // localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrease = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantityCart: item.quantityCart + 1 }
          : item,
      ),
    );
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const handleDecrease = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantityCart > 1
          ? { ...item, quantityCart: item.quantityCart - 1 }
          : item,
      ),
    );
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const handleRemove = id => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantityCart,
    0,
  );

  const handleCheckout = () => {
    history.push({
      pathname: '/payment',
      state: { cartItems, totalPrice },
    });
  };

  return (
    <Box px={{ xs: 2, md: 8 }} py={4}>
      <Typography variant="body2" mb={2}>
        TRANG CHỦ / <b>SẢN PHẨM</b>
      </Typography>
      <Grid container spacing={4}>
        {/* Cột trái - Sản phẩm */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              pb: 2,
              fontWeight: 'bold',
            }}
          >
            <Grid container>
              <Grid item xs={6}>
                SẢN PHẨM
              </Grid>
              <Grid item xs={2}>
                GIÁ
              </Grid>
              <Grid item xs={2}>
                SỐ LƯỢNG
              </Grid>
              <Grid item xs={2}>
                TẠM TÍNH
              </Grid>
            </Grid>
          </Box>

          {cartItems.map(item => (
            <Grid
              container
              key={item.id}
              alignItems="center"
              spacing={2}
              mb={2}
              sx={{ borderBottom: '1px solid #eee', pb: 2 }}
            >
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleRemove(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <img
                    src={item.img}
                    alt={item.name}
                    width={80}
                    height={60}
                    style={{ objectFit: 'contain', marginRight: 12 }}
                  />
                  <Typography>{item.name}</Typography>
                </Box>
              </Grid>
              <Grid item xs={4} md={2}>
                <Typography fontWeight="bold">
                  {item.price.toLocaleString('vi-VN')}đ
                </Typography>
              </Grid>
              <Grid item xs={4} md={2}>
                <Box display="flex" alignItems="center">
                  <IconButton
                    size="small"
                    onClick={() => handleDecrease(item.id)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography mx={1}>{item.quantityCart}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleIncrease(item.id)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={4} md={2}>
                <Typography fontWeight="bold">
                  {(item.price * item.quantityCart).toLocaleString('vi-VN')}đ
                </Typography>
              </Grid>
            </Grid>
          ))}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
            <Button variant="outlined" color="primary">
              ← Tiếp tục xem sản phẩm
            </Button>
            <Button variant="contained" color="primary">
              Cập nhật giỏ hàng
            </Button>
          </Stack>
        </Grid>

        {/* Cột phải - Tổng kết */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              TỔNG CỘNG GIỎ HÀNG
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tạm tính</Typography>
              <Typography fontWeight="bold">
                {totalPrice.toLocaleString('vi-VN')}đ
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography>Tổng</Typography>
              <Typography fontWeight="bold">
                {totalPrice.toLocaleString('vi-VN')}đ
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleCheckout}
            >
              Tiến hành thanh toán
            </Button>

            <Typography color="error" fontSize={14} mb={1}>
              <ConfirmationNumberIcon fontSize="small" /> Mã ưu đãi
            </Typography>
            <TextField
              placeholder="Nhập mã giảm giá"
              fullWidth
              variant="outlined"
              value={discountCode}
              onChange={e => setDiscountCode(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />
            <Button variant="contained" fullWidth disabled>
              Áp dụng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

Cart.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cart: makeSelectCart(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Cart);
