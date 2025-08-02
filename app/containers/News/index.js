/**
 *
 * News
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from '@mui/material';
import { newsList, products } from './constants';
import { fetchNews } from './actions';

export function News() {
  useInjectReducer({ key: 'news', reducer });
  useInjectSaga({ key: 'news', saga });

  const dispatch = useDispatch();
  const newss = useSelector(makeSelectNews());

  const { news } = newss;

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <Box px={{ xs: 2, md: 10 }} py={5}>
      <Typography variant="caption">TRANG CHỦ / TIN TỨC</Typography>
      <Typography variant="h5" fontWeight="bold" mt={1} mb={3}>
        TIN TỨC
      </Typography>

      <Grid container spacing={4}>
        {/* Cột trái */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {news.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.title}
                    height="180"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      📅 {item.date} &nbsp;&nbsp; 👁 {item.views}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button variant="outlined" color="error">
              Xem thêm
            </Button>
          </Box>
        </Grid>

        {/* Cột phải */}
        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              SẢN PHẨM MỚI
            </Typography>

            {products.map((item, index) => (
              <Box key={index} mb={2}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Box
                      component="img"
                      src={item.img}
                      alt={item.name}
                      sx={{ width: '100%', borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" fontWeight="500">
                      {item.name}
                    </Typography>
                    <Typography fontWeight="bold" mt={0.5}>
                      {item.price.toLocaleString('vi-VN')} đ
                    </Typography>
                  </Grid>
                </Grid>

                {index !== products.length - 1 && <Divider sx={{ mt: 1.5 }} />}
              </Box>
            ))}
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              BÀI VIẾT MỚI
            </Typography>

            {news.map((item, index) => (
              <Grid container spacing={1} key={index} mb={2}>
                <Grid item xs={4}>
                  <Box
                    component="img"
                    src={item.img}
                    alt="Xe máy điện Vinfast"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ lineHeight: 1.3 }}
                  >
                    {item.title}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const mapStateToProps = createStructuredSelector({
  newss: makeSelectNews(),
});

export default compose(
  connect(mapStateToProps),
  memo,
)(News);
