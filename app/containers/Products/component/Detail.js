import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, fetchProductDetail } from '../actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import { isEmpty } from 'lodash';

export default function Detail() {
  useInjectReducer({ key: 'productDetail', reducer });
  useInjectSaga({ key: 'productDetail', saga });

  const dispatch = useDispatch();
  const [quantityCart, setQuantity] = useState(1);
  const { slug } = useParams();
  const { productDetail, cartItems, loading, error } = useSelector(
    state => state.productDetail || {},
  );

  useEffect(() => {
    dispatch(fetchProductDetail(slug));
  }, [slug]);

  const handleAddToCart = () => {
    console.log("quantityCart: ", quantityCart)
    dispatch(addToCart({ ...productDetail, quantityCart }));
    setSnackbarOpen(true);
  };

  // const cartItemss = JSON.parse(localStorage.getItem('cartItems') || '[]');
  // cartItemss.push(cartItems);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  console.log("cartItems: ", cartItems);

  return (
    <>
      {!isEmpty(productDetail) ? (
        <Box px={{ xs: 2, md: 10 }} py={5}>
          <Typography variant="caption">TRANG CHỦ / SẢN PHẨM</Typography>

          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                //src={productDetail.imageMain}
                //alt={productDetail.name}
                width="100%"
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

              <Button variant="contained" color="error" size="large" onClick={handleAddToCart}>
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
              <Box
                component="img"
                src={productDetail.imageColor}
                alt="highlight"
                width="100%"
              />
            </Box>

            <Typography
              variant="h6"
              color="error"
              fontWeight="bold"
              gutterBottom
            >
              Điểm nổi bật của VinFast EVO Lite Neo
            </Typography>

            {/* <Grid container spacing={2}>
          {productDetail.features.map((feature, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box p={2} border="1px solid #ccc" borderRadius={1}>
                <Typography fontWeight="bold" gutterBottom>
                  {i + 1}. {feature.title}
                </Typography>
                <ul style={{ paddingLeft: 20 }}>
                  {feature.details.map((d, j) => (
                    <li key={j}>
                      <Typography variant="body2">{d}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Grid>
          ))}
        </Grid> */}

            {/* <Grid container spacing={2} mt={3}>
          {productDetail.imageGallery.map((img, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Box component="img" src={img} width="100%" alt={`img-${i}`} />
            </Grid>
          ))}
        </Grid> */}

            <Typography variant="body2" mt={3}>
              {productDetail.descriptionBottom}
            </Typography>
          </Box>
        </Box>
      ) : (
        <p>lỗi</p>
      )}
    </>
  );
}
