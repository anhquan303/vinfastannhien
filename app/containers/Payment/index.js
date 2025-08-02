/**
 *
 * Payment
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

export function Payment() {
  useInjectReducer({ key: 'payment', reducer });
  useInjectSaga({ key: 'payment', saga });

  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  return (
    <Box px={{ xs: 2, md: 8 }} py={4}>
      <Typography variant="body2" mb={2}>
        TRANG CHỦ / SẢN PHẨM / <b>THANH TOÁN</b>
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Typography variant="h6" color="error" fontWeight="bold" gutterBottom>
            THÔNG TIN THANH TOÁN
          </Typography>
          <TextField label="Họ và tên" fullWidth required sx={{ mb: 2 }} />
          <TextField label="Số điện thoại" fullWidth required sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Chọn Quận/Huyện"
                fullWidth
                select
                SelectProps={{ native: true }}
              >
                <option value="">Chọn Quận/Huyện</option>
                <option value="q1">Quận 1</option>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Chọn Phường/Xã"
                fullWidth
                select
                SelectProps={{ native: true }}
              >
                <option value="">Chọn Phường/Xã</option>
                <option value="px1">Phường A</option>
              </TextField>
            </Grid>
          </Grid>
          <TextField label="Địa chỉ" fullWidth required sx={{ my: 2 }} />

          <Typography variant="h6" color="error" fontWeight="bold" gutterBottom>
            THÔNG TIN BỔ SUNG
          </Typography>
          <TextField
            label="Ghi chú đơn hàng"
            fullWidth
            multiline
            rows={3}
            placeholder="Ghi chú về đơn hàng, ví dụ thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Box border="1px solid #ddd" borderRadius={2} p={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              ĐƠN HÀNG CỦA BẠN
            </Typography>
            {cartItems.map(item => (
              <Box
                key={item.id}
                display="flex"
                justifyContent="space-between"
                mb={1}
              >
                <Typography>
                  {item.name} ×{item.quantity}
                </Typography>
                <Typography fontWeight="bold">
                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </Typography>
              </Box>
            ))}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography>Tạm tính</Typography>
              <Typography fontWeight="bold">
                {totalPrice.toLocaleString('vi-VN')}đ
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Tổng</Typography>
              <Typography fontWeight="bold">
                {totalPrice.toLocaleString('vi-VN')}đ
              </Typography>
            </Box>

            <RadioGroup defaultValue="cod">
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label="Chuyển khoản ngân hàng"
              />
              <Typography variant="body2" ml={3} mb={1}>
                Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi.
                Đơn hàng sẽ được giao sau khi tiền đã chuyển.
              </Typography>
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Trả tiền mặt khi nhận hàng"
              />
            </RadioGroup>

            <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
              ĐẶT HÀNG
            </Button>

            <Typography variant="caption" mt={2} display="block">
              Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, hỗ trợ
              trải nghiệm trên website này, và cho các mục đích khác được mô tả
              trong chính sách riêng tư.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

Payment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment(),
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
)(Payment);
