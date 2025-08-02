import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectShowroom from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Box, Grid, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { showroomList } from './constants';
import logo from '../../images/logo.png';
import { fetchShowrooms } from './actions';

export function Showroom() {
  useInjectReducer({ key: 'showroom', reducer });
  useInjectSaga({ key: 'showroom', saga });

  const dispatch = useDispatch();
  const showroom = useSelector(makeSelectShowroom());

  const {showrooms} = showroom

  useEffect(() => {
    dispatch(fetchShowrooms());
  }, [dispatch]);

  return (
    <div>
      <Box
        sx={{
          px: { xs: 2, md: 10 },
          py: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
      >
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
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  showroom: makeSelectShowroom(),
});

export default compose(
  connect(mapStateToProps),
  memo,
)(Showroom);
