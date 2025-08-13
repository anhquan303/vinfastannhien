/**
 *
 * News
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
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
  Card,
  CardMedia,
  CardContent,
  Divider,
  Pagination,
  Tooltip,
  Breadcrumbs,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import makeSelectNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { products } from './constants';
import { fetchNews, fetchProducts } from './actions';
import LoadingScreen from '../../components/Loading';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export function News() {
  useInjectReducer({ key: 'news', reducer });
  useInjectSaga({ key: 'news', saga });

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const newss = useSelector(makeSelectNews());
  const NEWS_PER_PAGE = 6;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const { news, productLst, loading } = newss;

  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalPages = Math.ceil(news.length / NEWS_PER_PAGE);
  const paginatedNews = news.slice(
    (currentPage - 1) * NEWS_PER_PAGE,
    currentPage * NEWS_PER_PAGE,
  );

  const newsNew = news && news.filter(item => item.isNew).slice(0, 3);

  return (
    <Container
      maxWidth="lg" // thay "xl" -> hẹp hơn
      sx={{
        px: { xs: 2, sm: 3, md: 4 }, // padding 2 bên
      }}
    >
      <Box px={{ xs: 2, md: 10 }} py={5}>
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: 1300,
              bgcolor: 'rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(1px)',
            }}
          >
            <LoadingScreen />
          </Box>
        )}
        {/* <Typography variant="caption">TRANG CHỦ / TIN TỨC</Typography> */}

        <Box mb={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ '& a': { textDecoration: 'none', color: 'primary.main' } }}
          >
            <Link to="/home">Trang chủ</Link>
            <Typography color="text.primary" fontWeight={600}>
              Tin tức
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* <Typography variant="h5" fontWeight="bold" mt={1} mb={3}>
          TIN TỨC
        </Typography> */}

        <Grid container spacing={4}>
          {/* Cột trái */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {paginatedNews.map((item, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
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
                        component={Link}
                        to={`/new/${item.id || encodeURIComponent(item.name)}`}
                        sx={{
                          textDecoration: 'none',
                          color: '#1976d2',
                          '&:hover': { textDecoration: 'underline' },
                        }}
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

            {/* <Box textAlign="center" mt={4}>
            <Button variant="outlined" color="error">
              Xem thêm
            </Button>
          </Box> */}
            {/* Pagination */}
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Grid>

          {/* Cột phải */}
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                SẢN PHẨM MỚI
              </Typography>

              {productLst
                .filter(product => product.isNew === true)
                .map((item, index) => (
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

                    {index !== products.length - 1 && (
                      <Divider sx={{ mt: 1.5 }} />
                    )}
                  </Box>
                ))}
            </Box>

            {/* <Box>
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
          </Box> */}

            <Box mt={4}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                BÀI VIẾT MỚI
              </Typography>

              {newsNew &&
                newsNew.map((item, index) => (
                  <Grid
                    container
                    spacing={1}
                    key={index}
                    mb={2}
                    alignItems="center"
                    wrap="nowrap"
                  >
                    <Grid item xs={4}>
                      <Box
                        component="img"
                        src={item.img}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: 56, // cố định chiều cao để thẳng hàng
                          borderRadius: 1,
                          objectFit: 'cover',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Tooltip title={item.title} arrow>
                        <Typography
                          component={Link}
                          to={`/new/${item.id ||
                            encodeURIComponent(item.name)}`}
                          variant="body2"
                          fontWeight="bold"
                          sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: '-webkit-box',
                            WebkitLineClamp: 2, // cắt sau 2 dòng
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  newss: makeSelectNews(),
});

export default compose(
  connect(mapStateToProps),
  memo,
)(News);
