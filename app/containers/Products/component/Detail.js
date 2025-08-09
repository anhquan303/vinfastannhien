import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isEmpty } from 'lodash';
import { addToCart, fetchProductDetail } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LanguageIcon from '@mui/icons-material/Language';

export default function Detail() {
  const dispatch = useDispatch();
  const [quantityCart, setQuantity] = useState(1);
  const { slug } = useParams();
  const { productDetail, cartItems, loading, error } = useSelector(
    state => state.products || {},
  );

  // useEffect(() => {
  //   console.log('slug:', slug);
  //   dispatch(fetchProductDetail(slug));
  // }, [slug]);

  useEffect(() => {
    if (slug) {
      const timeout = setTimeout(() => {
        dispatch(fetchProductDetail(slug));
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [slug]);

  // const handleAddToCart = () => {
  //   dispatch(addToCart({ ...productDetail, quantityCart }));
  //   //setSnackbarOpen(true);
  // };

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ ...productDetail, quantityCart }));
  }, [dispatch, productDetail, quantityCart]);

  // useEffect(() => {
  //   if (!isEmpty(cartItems)) {
  //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
  //   }
  // }, [cartItems]);

  console.log('productDetail: ', productDetail);

  return (
    <>
      {!isEmpty(productDetail) ? (
        <Box maxWidth="lg" mx="auto" px={{ xs: 2, sm: 4, md: 6, lg: 8 }} py={5}>
          <Typography variant="caption">TRANG CHỦ / SẢN PHẨM</Typography>

          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={productDetail.img}
                // alt={productDetail.name}
                width="80%"
              />
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="h5" fontWeight="bold">
                {productDetail.name}
              </Typography>

              <Typography variant="h6" color="primary" fontWeight="bold" mt={1}>
                {productDetail.price.toLocaleString('vi-VN')} đ
              </Typography>
              <Typography variant="caption" color="gray">
                ({productDetail.vatNote})
              </Typography>

              <Typography mt={1} variant="body2" color="textSecondary">
                👁️ {productDetail.soldCount}+ người đã mua sản phẩm này
              </Typography>

              <Box mt={2}>
                <Typography fontWeight="bold">Tính năng nổi bật:</Typography>
                <ul style={{ paddingLeft: 20 }}>
                  {productDetail.highlights.map((line, i) => (
                    <li key={i}>
                      <Typography variant="body2">{line}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              <Box display="flex" gap={1} my={2}>
                {productDetail.availableColors.map((color, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: '1px solid #ccc',
                    }}
                  />
                ))}
              </Box>

              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography>Số lượng</Typography>
                <IconButton
                  onClick={() => setQuantity(Math.max(1, quantityCart - 1))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{quantityCart}</Typography>
                <IconButton onClick={() => setQuantity(quantityCart + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={handleAddToCart}
              >
                MUA HÀNG
              </Button>
            </Grid>
          </Grid>

          {/* Mô tả */}
          <Box mt={5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              MÔ TẢ
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {productDetail.descriptionIntro}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {productDetail.descriptionBody}
            </Typography>

            <Box my={3}>
              <Box
                component="img"
                src={productDetail.featureImage}
                alt="feature"
                width="100%"
                mb={2}
              />
              {/* <Box
                component="img"
                src={productDetail.imageColor}
                alt="highlight"
                width="100%"
              /> */}
            </Box>

            {/* <Typography
              variant="h6"
              color="error"
              fontWeight="bold"
              gutterBottom
            >
              Điểm nổi bật của VinFast EVO Lite Neo
            </Typography> */}

            <Box maxWidth="md" mx="auto" mt={4} px={2}>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{
                  color: '#f44336',
                  fontWeight: 'bold',
                  marginBottom: '2rem',
                }}
              >
                Điểm nổi bật của VinFast Motio
              </Typography>

              <Grid container spacing={2} border="1px solid #ccc">
                {productDetail.features.map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={index}
                    sx={{
                      borderRight: index % 2 === 0 ? '1px solid #ccc' : 'none',
                      borderBottom: index < 2 ? '1px solid #ccc' : 'none',
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: '#333' }}
                    >
                      {item.title}
                    </Typography>
                    <List dense disablePadding>
                      {item.details.map((line, i) => (
                        <ListItem key={i} sx={{ display: 'list-item', pl: 2 }}>
                          <Typography variant="body2">{line}</Typography>
                        </ListItem>
                      ))}
                      {/* {item.details} */}
                    </List>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Grid container spacing={2} mt={3} justifyContent="center">
              {productDetail.imageGallery.map((img, i) => (
                <Grid item xs={6} sm={3} md={2} key={i}>
                  <Box
                    component="img"
                    src={img}
                    width="100%"
                    alt={`img-${i}`}
                  />
                </Grid>
              ))}
            </Grid>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {productDetail.descriptionBottomIntro}
            </Typography>

            <Typography variant="body2" mt={3}>
              {productDetail.descriptionBottom}
            </Typography>

            <Box px={2} py={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Ưu đãi hấp dẫn đang chờ bạn:
              </Typography>

              <List dense sx={{ pl: 2 }}>
                <ListItem disablePadding>
                  <ListItemText primary="Tặng ngay bộ sạc & ắc quy khi đặt cọc sớm" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Hỗ trợ trả góp lãi suất 0%" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Bảo hành chính hãng lên đến 3 năm" />
                </ListItem>
              </List>

              <Typography variant="h6" fontWeight="bold" mt={3} gutterBottom>
                Đến ngay VinFast An Nhiên – Trải nghiệm thực tế, lái thử miễn
                phí!
              </Typography>

              <Stack spacing={2} mt={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon color="error" />
                  <Typography>
                    <b>Địa chỉ:</b> Đại lý VinFast An Nhiên
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneInTalkIcon color="error" />
                  <Typography>
                    <b>Hotline/Zalo:</b> 084.587.5555
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LanguageIcon color="error" />
                  <Typography>
                    <b>Website:</b> www.vinfastannhien.com
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      ) : (
        <p>lỗi</p>
      )}
    </>
  );
}
