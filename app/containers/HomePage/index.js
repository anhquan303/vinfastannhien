/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import CenteredSection from './CenteredSection';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
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
} from '@mui/material';
import { products, explore_products, services } from './constants';

const key = 'home';

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <article>
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
            {products.map((product, index) => (
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
                    image={product.image}
                    alt={product.name}
                    sx={{
                      height: { xs: 180, sm: 220 },
                      objectFit: 'contain',
                      mt: 2,
                      px: 2,
                    }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" color="text.primary">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                      mt={1}
                    >
                      {product.price}
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
            }}
            className="container"
          >
            {explore_products.map((product, index) => (
              <Box
                key={index}
                sx={{
                  flex: '0 0 auto',
                  width: 250,
                  scrollSnapAlign: 'start',
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    boxShadow: 3,
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      height: 150,
                      objectFit: 'contain',
                      mb: 2,
                    }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="subtitle1">{product.name}</Typography>
                    <Typography variant="h6" fontWeight="bold" mt={1}>
                      {product.price}
                    </Typography>
                    <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                      MUA NGAY
                    </Button>
                  </CardContent>
                </Card>
              </Box>
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
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
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
