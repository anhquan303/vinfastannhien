import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Box, Grid, Typography, Breadcrumbs, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import makeSelectShowroom from './selectors';
import reducer from './reducer';
import saga from './saga';
import logo from '../../images/logo.png';
import { fetchShowrooms } from './actions';
import LoadingScreen from '../../components/Loading';

export function Showroom() {
  useInjectReducer({ key: 'showroom', reducer });
  useInjectSaga({ key: 'showroom', saga });

  const dispatch = useDispatch();
  const showroom = useSelector(makeSelectShowroom());

  const { showrooms, loading } = showroom;

  useEffect(() => {
    dispatch(fetchShowrooms());
  }, [dispatch]);

  return (
    <Container style={{ marginBottom: '2rem' }}>
      <Box
        mb={2}
        sx={{
          marginTop: '2rem',
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ '& a': { textDecoration: 'none', color: 'primary.main' } }}
        >
          <Link to="/home">Trang chủ</Link>
          <Typography color="text.primary" fontWeight={600}>
            Hệ thống cửa hàng
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          px: { xs: 2, md: 10 },
          py: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
      >
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

        {/* Logo */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            mb: { xs: 4, md: 0 },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="VinFast"
            sx={{ maxWidth: '250px' }}
          />
        </Box>
        <Box sx={{ flex: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Hệ thống showroom Xe Máy Điện Vinfast Ecoxe
          </Typography>

          <Grid container spacing={1}>
            {showrooms.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box display="flex" alignItems="flex-start">
                  <HomeIcon fontSize="small" sx={{ mt: '2px', mr: 1 }} />
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  showroom: makeSelectShowroom(),
});

export default compose(
  connect(mapStateToProps),
  memo,
)(Showroom);
