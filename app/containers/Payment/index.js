/**
 *
 * Payment
 *
 */

import React, { memo, useEffect, useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
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
  DialogTitle,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  Button,
  Snackbar,
  Alert,
  IconButton,
  DialogContent,
  DialogActions,
  Stack,
  Tooltip,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import {
  clearConfirmStatus,
  confirmPaidRequest,
  fetchDistricts,
  fetchProvinces,
  fetchWards,
  placeOrderRequest,
} from './actions';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export function Payment() {
  useInjectReducer({ key: 'payment', reducer });
  useInjectSaga({ key: 'payment', saga });

  const history = useHistory();
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [method, setMethod] = useState('bank');
  const [toast, setToast] = useState({ open: false, type: 'success', msg: '' });
  const [successOpen, setSuccessOpen] = useState(false);
  const [redirectIn, setRedirectIn] = useState(0);
  const timersRef = useRef({ intervalId: null, timeoutId: null });
  const openToast = (msg, type = 'success') =>
    setToast({ open: true, type, msg });

  const dispatch = useDispatch();
  const payment = useSelector(makeSelectPayment());

  const {
    provinces,
    districts,
    wards,
    placing,
    lastOrder,
    confirming,
    confirmedOrderId,
  } = payment;

  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      dispatch(fetchDistricts(selectedProvince));
    }
  }, [selectedProvince]);

  const onProvinceChange = e => {
    //const province = provinces.find(p => p.code === +e.target.value);
    setSelectedProvince(e.target.value);
    // setDistricts(province?.districts || []);
    // setSelectedDistrict('');
    // setWards([]);
  };

  useEffect(() => {
    if (selectedDistrict) {
      dispatch(fetchWards(selectedDistrict));
    }
  }, [selectedDistrict]);

  const onPlaceOrder = () => {
    if (
      !name ||
      !phone ||
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !address ||
      !email
    ) {
      openToast('Vui lòng nhập đủ thông tin.', 'error');
      return;
    }
    if (!cartItems.length) {
      openToast('Giỏ hàng trống.', 'error');
      return;
    }

    const cityName =
      (provinces || []).find(p => String(p.code) === String(selectedProvince))
        ?.name || '';
    const districtName =
      (districts || []).find(d => String(d.code) === String(selectedDistrict))
        ?.name || '';
    const wardName =
      (wards || []).find(w => String(w.code) === String(selectedWard))?.name ||
      '';

    const shipping = {
      city: cityName,
      district: districtName,
      ward: wardName,
      address: (address || '').trim(),
    };

    dispatch(
      placeOrderRequest({
        method,
        items: cartItems.map(i => ({
          id: i.id,
          name: i.name,
          qty: i.quantityCart,
          price: i.price,
        })),
        amount: totalPrice,
        customer: { name, phone, email /* , email */ },
        shipping,
        note,
      }),
    );
  };

  const onConfirmPaid = () => {
    if (!lastOrder?.orderId) return;
    dispatch(
      confirmPaidRequest({
        orderId: lastOrder.orderId,
        qrUrl: lastOrder.qrUrl,
      }),
    );
    openToast('Đang gửi email xác nhận...', 'info');
  };

  // const qrOpen = Boolean(
  //   lastOrder?.qrUrl && lastOrder?.payment?.method === 'bank',
  // );

  useEffect(() => {
    if (lastOrder?.qrUrl && lastOrder?.payment?.method === 'bank') {
      setQrOpen(true);
    }
  }, [lastOrder]);

  const handleCloseQr = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return; // chặn đóng ngoài ý muốn
    setQrOpen(false);
  };

  useEffect(() => {
    if (!confirmedOrderId) return;

    // đóng QR nếu còn mở
    setQrOpen?.(false);

    // xóa giỏ hàng localStorage
    try {
      localStorage.removeItem('cartItems');
    } catch {}

    // mở popup + đếm ngược 5s
    setSuccessOpen(true);
    setRedirectIn(5);

    // interval đếm ngược
    timersRef.current.intervalId = setInterval(() => {
      setRedirectIn(prev => {
        if (prev <= 1) {
          clearInterval(timersRef.current.intervalId);
          timersRef.current.intervalId = null;
        }
        return Math.max(prev - 1, 0);
      });
    }, 1000);

    // timeout điều hướng
    timersRef.current.timeoutId = setTimeout(() => {
      setSuccessOpen(false);
      history.push('/home'); // v5
      dispatch(clearConfirmStatus()); // dọn cờ
    }, 5000);

    // cleanup
    return () => {
      if (timersRef.current.intervalId)
        clearInterval(timersRef.current.intervalId);
      if (timersRef.current.timeoutId)
        clearTimeout(timersRef.current.timeoutId);
      timersRef.current = { intervalId: null, timeoutId: null };
    };
  }, [confirmedOrderId, history, dispatch]);

  const goHomeNow = () => {
    if (timersRef.current.intervalId)
      clearInterval(timersRef.current.intervalId);
    if (timersRef.current.timeoutId) clearTimeout(timersRef.current.timeoutId);
    timersRef.current = { intervalId: null, timeoutId: null };
    setSuccessOpen(false);
    history.push('/home');
    dispatch(clearConfirmStatus());
  };

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
          <TextField
            label="Họ và tên"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            label="Số điện thoại"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <TextField
                label="Chọn Tỉnh/Thành phố"
                fullWidth
                select
                SelectProps={{ native: true }}
              >
                {provinces.map(p => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField> */}
              <TextField
                select
                label="Chọn Tỉnh/Thành phố"
                value={selectedProvince}
                onChange={onProvinceChange}
                fullWidth
                margin="normal"
              >
                {provinces.map(p => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Chọn Quận/Huyện"
                fullWidth
                select
                value={selectedDistrict}
                SelectProps={{ native: true }}
                disabled={!selectedProvince}
                onChange={e => {
                  setSelectedDistrict(e.target.value);
                }}
              >
                {districts.map(d => (
                  <option key={d.code} value={d.code}>
                    {d.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Chọn Phường/Xã"
                fullWidth
                select
                value={selectedWard}
                SelectProps={{ native: true }}
                disabled={!selectedDistrict}
                onChange={e => {
                  setSelectedWard(e.target.value);
                }}
              >
                {wards.map(w => (
                  <option key={w.code} value={w.code}>
                    {w.name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <TextField
            label="Địa chỉ"
            fullWidth
            required
            sx={{ my: 2 }}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <Typography variant="h6" color="error" fontWeight="bold" gutterBottom>
            THÔNG TIN BỔ SUNG
          </Typography>
          <TextField
            label="Ghi chú đơn hàng"
            fullWidth
            multiline
            rows={3}
            value={note}
            onChange={e => setNote(e.target.value)}
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
                  {item.name} ×{item.quantityCart}
                </Typography>
                <Typography fontWeight="bold">
                  {(item.price * item.quantityCart).toLocaleString('vi-VN')}đ
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

            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
              onClick={onPlaceOrder}
              disabled={placing}
            >
              {placing ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}
            </Button>

            <Typography variant="caption" mt={2} display="block">
              Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, hỗ trợ
              trải nghiệm trên website này, và cho các mục đích khác được mô tả
              trong chính sách riêng tư.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Modal QR */}
      <Dialog open={qrOpen} onClose={handleCloseQr} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ pr: 6 }}>
          Quét mã để thanh toán
          <IconButton
            aria-label="close"
            onClick={() => setQrOpen(false)} // nút X
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ textAlign: 'center' }}>
          <img
            src={lastOrder?.qrUrl}
            alt="QR thanh toán"
            style={{
              width: 'min(320px, 90%)',
              height: 'auto',
              borderRadius: 8,
            }}
          />
          <Stack spacing={1.2} mt={2} alignItems="center">
            <Typography>
              Số tiền: <b>{lastOrder?.amount?.toLocaleString('vi-VN')}đ</b>
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>
                Nội dung: <b>{lastOrder?.payment?.transferContent}</b>
              </Typography>
              <Tooltip title="Sao chép nội dung CK" arrow>
                <IconButton
                  size="small"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      lastOrder?.payment?.transferContent || '',
                    )
                  }
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Vui lòng chuyển đúng số tiền & nội dung để hệ thống tự xác nhận.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button color="inherit" disabled>
            Để sau
          </Button>
          <Button
            variant="contained"
            onClick={onConfirmPaid}
            disabled={confirming}
          >
            {confirming ? 'ĐANG GỬI MAIL...' : 'Tôi đã thanh toán'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast(t => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast(t => ({ ...t, open: false }))}
          severity={toast.type}
          variant="filled"
        >
          {toast.msg}
        </Alert>
      </Snackbar>

      <Dialog
        open={successOpen}
        onClose={(_, reason) => {
          // tránh đóng do bấm nền/Escape để không phá flow
          if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
          goHomeNow();
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 56, color: 'success.main' }}
          />
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center', pb: 0 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Đặt hàng thành công!
          </Typography>
          {confirmedOrderId && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Mã đơn: <b>#{confirmedOrderId}</b>
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 1 }}>
            Tự động trở về Trang chủ sau <b>{redirectIn}s</b>.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" onClick={goHomeNow}>
            Về trang chủ ngay
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Payment.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   payment: makeSelectPayment(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(
//   withConnect,
//   memo,
// )(Payment);

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment(),
});

export default compose(
  connect(mapStateToProps),
  memo,
)(Payment);
