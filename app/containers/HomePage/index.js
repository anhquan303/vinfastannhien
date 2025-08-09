/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectRepos, makeSelectError } from 'containers/App/selectors';
import CenteredSection from './CenteredSection';
import { loadRepos } from '../App/actions';
import { changeUsername, fetchProducts } from './actions';
import { makeSelectUsername, makeSelectHome } from './selectors';
import reducer from './reducer';
import saga from './saga';
import BannerSlider from '../../components/BannerSlider';
import './style.css';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { explore_products, services } from './constants';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../components/Loading';

const key = 'home';

export function HomePage({
  username,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const home = useSelector(makeSelectHome());

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const { productLst, loading } = home;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const top3Sold = [...productLst]
    .sort((a, b) => b.sold - a.sold) // sắp xếp giảm dần theo sold
    .slice(0, 3); // lấy 3 item đầu

  const top3New =
    productLst &&
    productLst
      .filter(product => product.isNew) // lọc sản phẩm mới
      .slice(0, 3); // lấy 3 item đầu tiên

  return (
    <article>
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
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <BannerSlider />

          <div className="product-sale">
            <span className="product-sale-text">Sản phẩm bán chạy</span>
          </div>

          <div style={{ marginTop: '20px' }}>
            <span className="product-sale-title">Xe máy điện học sinh</span>
          </div>
        </CenteredSection>

        <Box sx={{ overflowX: 'hidden', px: 2 }} className="container">
          <Grid container spacing={3} justifyContent="center">
            {top3Sold &&
              top3Sold.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.img}
                      alt={product.name}
                      sx={{
                        height: { xs: 180, sm: 220 },
                        objectFit: 'contain',
                        mt: 2,
                        px: 2,
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        component={Link}
                        to={`/products/${product.id ||
                          encodeURIComponent(product.name)}`}
                        sx={{
                          textDecoration: 'none',
                          color: '#1976d2',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="text.primary"
                        mt={1}
                      >
                        {product.price.toLocaleString('vi-VN')} đ
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                          fontSize: { xs: 14, sm: 16 },
                          py: 1.5,
                        }}
                        fullWidth
                      >
                        MUA NGAY
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>

        <CenteredSection style={{ padding: '0 20px' }}>
          <div className="product-sale">
            <span className="product-sale-text">Khám phá</span>
          </div>

          <div style={{ marginTop: '20px' }}>
            <span className="product-sale-title">Xe máy điện cá tính</span>
          </div>

          <Box
            sx={{
              overflowX: 'auto',
              display: 'flex',
              gap: 2,
              px: 2,
              py: 3,
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              padding: '0 20px',
              justifyContent: 'center',
            }}
            className="container"
          >
            {top3New &&
              top3New.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      p: 2,
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': { boxShadow: 3 },
                      width: { xs: '100%', sm: 220, md: 240 }, // responsive width
                      maxWidth: 280,
                    }}
                  >
                    {product.isNew && (
                      <Chip
                        label="NEW"
                        color="error"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          fontWeight: 'bold',
                          '& .MuiChip-label': {
                            fontSize: '1rem',
                          },
                          animation: 'pulseGlow 1.5s infinite',
                          '@keyframes pulseGlow': {
                            '0%': {
                              transform: 'scale(1)',
                              boxShadow: '0 0 0px rgba(255,0,0,0.7)',
                            },
                            '50%': {
                              transform: 'scale(1.1)',
                              boxShadow: '0 0 12px rgba(255,0,0,0.9)',
                            },
                            '100%': {
                              transform: 'scale(1)',
                              boxShadow: '0 0 0px rgba(255,0,0,0.7)',
                            },
                          },
                        }}
                      />
                    )}

                    <Box
                      component="img"
                      src={product.img}
                      alt={product.name}
                      sx={{ width: '100%', height: 'auto', mb: 2 }}
                    />

                    <Typography
                      variant="caption"
                      textTransform="uppercase"
                      color="gray"
                    >
                      Xe máy điện VinFast
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      component={Link}
                      to={`/products/${product.id ||
                        encodeURIComponent(product.name)}`}
                      sx={{
                        textDecoration: 'none',
                        color: '#1976d2',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Box mb={2}>
                      {product.oldPrice && (
                        <Typography
                          variant="body2"
                          sx={{ textDecoration: 'line-through', color: 'gray' }}
                        >
                          {product.oldPrice.toLocaleString('vi-VN')}đ
                        </Typography>
                      )}
                      <Typography fontWeight="bold" fontSize="18px">
                        {product.price.toLocaleString('vi-VN')}đ
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: 'black',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#333',
                        },
                      }}
                    >
                      MUA NGAY &nbsp; &gt;
                    </Button>
                  </Box>
                </Grid>
              ))}
          </Box>

          <Box sx={{ py: 8, px: { xs: 2, md: 10 }, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" mb={1}>
              DỊCH VỤ
            </Typography>
            <Typography variant="h4" fontWeight="bold" mb={6}>
              Dịch vụ chuyên nghiệp tại Vinfast An Nhiên
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box>
                    <Box
                      component="img"
                      src={service.icon}
                      alt={service.title}
                      sx={{ height: 60, mb: 2 }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="error"
                      gutterBottom
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ textAlign: 'justify' }}
                    >
                      {service.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CenteredSection>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
