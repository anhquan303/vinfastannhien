/**
 *
 * Products
 *
 */

import React, { memo, useState, useEffect, useMemo } from 'react';
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
  Select,
  MenuItem,
  Button,
  Chip,
  Pagination,
  Container,
  Breadcrumbs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import makeSelectProducts from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchProducts } from './actions';
import LoadingScreen from '../../components/Loading';

export function Products({ perPageMap }) {
  useInjectReducer({ key: 'products', reducer });
  useInjectSaga({ key: 'products', saga });
  const theme = useTheme();
  const dispatch = useDispatch();
  const productss = useSelector(makeSelectProducts());
  const upSM = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const upMD = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const upLG = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
  const upXL = useMediaQuery(theme.breakpoints.up('xl'), { noSsr: true });

  // Mapping mặc định (đổi theo layout của bạn)
  const cfg = { xs: 4, sm: 6, md: 8, lg: 12, xl: 12, ...(perPageMap || {}) };

  // Tính PRODUCTS_PER_PAGE ngay trong file
  const PRODUCTS_PER_PAGE = useMemo(() => {
    if (upXL) return cfg.xl;
    if (upLG) return cfg.lg;
    if (upMD) return cfg.md;
    if (upSM) return cfg.sm;
    return cfg.xs;
  }, [upXL, upLG, upMD, upSM, cfg]);

  const { productLst, loading } = productss;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // const sortedProducts = [];

  const sortedProducts = [...productLst].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0;
  });

  // Tính tổng số trang
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  // Cắt sản phẩm theo trang
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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

        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          flexWrap="wrap"
        >
          <Box mb={2}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ '& a': { textDecoration: 'none', color: 'primary.main' } }}
            >
              <Link to="/home">Trang chủ</Link>
              <Typography color="text.primary" fontWeight={600}>
                Sản phẩm
              </Typography>
            </Breadcrumbs>
          </Box>
          <Typography variant="body2" mb={1}>
            {/* Hiển thị được {products.length} sản phẩm */}
          </Typography>
          <Select
            value={sort}
            onChange={e => {
              setSort(e.target.value);
              setCurrentPage(1); // reset lại về trang 1 khi thay đổi sort
            }}
            size="small"
            sx={{ minWidth: 220, mb: 3 }}
          >
            <MenuItem value="default">Thứ tự mặc định</MenuItem>
            <MenuItem value="price-asc">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="price-desc">Giá: Cao xuống thấp</MenuItem>
          </Select>
        </Box>

        {/* Grid sản phẩm */}
        <Grid container spacing={3}>
          {paginatedProducts.map((product, index) => (
            <Grid
              item
              xs={6} // mobile: 2 sp / hàng
              sm={5} // tablet: 3 sp / hàng
              md={4} // desktop: 4 sp / hàng
              lg={4} // large: 4 sp / hàng
              xl={3}
              key={index}
            >
              <Box
                sx={{
                  border: '1px solid #eee',
                  borderRadius: 2,
                  p: 2,
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '&:hover': { boxShadow: 3 },
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
                  component={Link}
                  to={`/products/${product.id ||
                    encodeURIComponent(product.name)}`}
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
        </Grid>

        {/* Pagination */}
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
}

// Products.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   products: makeSelectProducts(),
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
// )(Products);

const mapStateToProps = createStructuredSelector({
  productss: makeSelectProducts(),
});

export default compose(
  connect(mapStateToProps),
  memo,
)(Products);
