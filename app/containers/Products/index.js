/**
 *
 * Products
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProducts from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  Chip,
  Pagination,
} from '@mui/material';
import { fetchProducts } from './actions';
import { Link } from 'react-router-dom';

export function Products() {
  useInjectReducer({ key: 'products', reducer });
  useInjectSaga({ key: 'products', saga });

  const dispatch = useDispatch();
  const productss = useSelector(makeSelectProducts());
  const PRODUCTS_PER_PAGE = 6;

  const { productLst } = productss;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  //const sortedProducts = [];

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
    <Box px={{ xs: 2, md: 10 }} py={5}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Typography variant="caption" mb={1}>
          TRANG CHỦ / <b>SẢN PHẨM</b>
        </Typography>
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
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                border: index === 0 ? '2px solid #1976d2' : '1px solid #eee',
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
