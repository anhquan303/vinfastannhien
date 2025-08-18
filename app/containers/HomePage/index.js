/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useMemo } from 'react';
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
import { changeUsername, fetchNews, fetchProducts } from './actions';
import { makeSelectUsername, makeSelectHome } from './selectors';
import reducer from './reducer';
import saga from './saga';
import BannerSlider from '../../components/BannerSlider';
import './style.css';
import {
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  Container,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
} from '@mui/material';
import { services } from './constants';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../components/Loading';
import evoGrandLiteImg from '../../images/EvoGrandLite.jpg';
import motioImg from '../../images/MotioS.png';
import evoLiteNeoImg from '../../images/EvoLiteNeo.jpg';
import evoNeoImg from '../../images/EvoNeo.png';
//
// import evo200LiteImg from '../../images/Evo200.jpg';
import evo200Img from '../../images/Evo200.jpg';
import evoGrandImg from '../../images/EvoGrand.jpg';
import felizNeoImg from '../../images/FelizNeo.jpg';
import felizSImg from '../../images/FelizS.png';
//
// import klaraS2Img from '../../images/FelizS.png';
import ventoNeoImg from '../../images/VentoNeo.jpg';
import klaraNeoImg from '../../images/KiraNeo.png';
//
// import ventoSImg from '../../images/KiraNeo.png';
import theonSImg from '../../images/TheonS.png';

import ProductStripFullWidthV5 from '../../components/HorizontalImageStrip';
import { Link as RouterLink } from 'react-router-dom';
import { isEmpty } from 'lodash';

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
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const { productLst, loading, news } = home;

  const [featured, ...restNews] = news || [];
  const sideNews = restNews.slice(0, 2);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchNews());
  }, [dispatch]);

  //const top3Sold = [...productLst].sort((a, b) => b.sold - a.sold).slice(0, 3); //
  const top3Sold = (productLst || []).filter(p => (p.price ?? 0) < 20_000_000);

  // const top3New =
  //   productLst && productLst.filter(product => product.isNew).slice(0, 3);

  const top3New = (productLst || []).filter(p => (p.price ?? 0) > 30_000_000); //lọc trên 30m

  const top3News = useMemo(() => {
    return (news || [])
      .filter(n => n?.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  }, [news]);

  const DateBadge = ({ date }) => {
    const { day, mon } = formatBadge(date);
    return (
      <Box
        sx={{
          width: 64,
          borderRadius: 2.5,
          bgcolor: '#F5167E',
          color: '#fff',
          textAlign: 'center',
          lineHeight: 1.1,
          fontWeight: 800,
          p: '10px 8px',
          boxShadow: '0 8px 24px rgba(255,44,44,.35)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.2 }}>
          {day}
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 800 }}>
          {mon}
        </Typography>
      </Box>
    );
  };

  const formatBadge = date => {
    const coerce = v => {
      if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
      if (typeof v === 'number') {
        const d = new Date(v);
        return isNaN(d.getTime()) ? null : d;
      }
      const s = String(v || '').trim();
      if (!s) return null;

      // ISO / yyyy-mm-dd / yyyy/mm/dd
      let t = Date.parse(s);
      if (!Number.isNaN(t)) return new Date(t);

      // dd/mm/yyyy hoặc dd-mm-yyyy
      let m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
      if (m) {
        const [, dd, mm, yyyy] = m.map(Number);
        const d = new Date(yyyy, mm - 1, dd);
        return isNaN(d.getTime()) ? null : d;
      }

      // yyyy/mm/dd hoặc yyyy-mm-dd (không Date.parse được trên 1 số trình duyệt cũ)
      m = s.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
      if (m) {
        const [, yyyy, mm, dd] = m.map(Number);
        const d = new Date(yyyy, mm - 1, dd);
        return isNaN(d.getTime()) ? null : d;
      }
      return null;
    };

    const d = coerce(date);
    if (!d) return { day: null, mon: null, isValid: false };

    return {
      day: String(d.getDate()).padStart(2, '0'),
      mon: `TH${d.getMonth() + 1}`,
      isValid: true,
    };
  };

  console.log('news: ', news);
  console.log('top3News: ', top3News);

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

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            overflowX: { xs: 'hidden', sm: 'auto' },
            gap: 2,
            px: 2,
            py: 3,
            scrollSnapType: { xs: 'none', sm: 'x mandatory' },
            WebkitOverflowScrolling: 'touch',
            padding: '0 20px',
            justifyContent: { xs: 'stretch', sm: 'center' },
            alignItems: { xs: 'stretch', sm: 'unset' },
          }}
        >
          {top3Sold &&
            top3Sold.map((product, index) => (
              <Grid
                item
                xs={12}
                sm="auto"
                md="auto"
                key={index}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    p: 2,
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': { boxShadow: 3 },
                    width: { xs: '100%', sm: 220, md: 240 },
                    maxWidth: { xs: '100%', sm: 280 },
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
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              overflowX: { xs: 'hidden', sm: 'auto' },
              gap: 2,
              px: 2,
              py: 3,
              scrollSnapType: { xs: 'none', sm: 'x mandatory' },
              WebkitOverflowScrolling: 'touch',
              padding: '0 20px',
              justifyContent: { xs: 'stretch', sm: 'center' },
              alignItems: { xs: 'stretch', sm: 'unset' },
            }}
          >
            {top3New &&
              top3New.map((product, index) => (
                <Grid
                  item
                  xs={12}
                  sm="auto"
                  md="auto"
                  key={index}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      p: 2,
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': { boxShadow: 3 },
                      width: { xs: '100%', sm: 220, md: 240 },
                      maxWidth: { xs: '100%', sm: 280 },
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
          </Box>

          <Box sx={{ py: 8, px: { xs: 2, md: 10 }, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" mb={1}>
              DỊCH VỤ
            </Typography>
            <Typography variant="h4" fontWeight="bold" mb={6}>
              Dịch vụ chuyên nghiệp tại Vinfast An Nhiên
            </Typography>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              style={{ marginBottom: '2rem' }}
            >
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

            <ProductStripFullWidthV5
              products={[
                { id: '1', slug: '1', image: motioImg, name: 'Motio' },
                { id: '2', image: evoLiteNeoImg, name: 'EVO Lite Neo' },
                { id: '3', image: evoNeoImg, name: 'EVO Neo' },
                // { id: '4', image: evo200LiteImg, name: 'Evo200 Lite' },
                { id: '5', image: evo200Img, name: 'EVO 200' },
                { id: '6', image: evoGrandLiteImg, name: 'EVO Grand Lite' },
                { id: '7', image: evoGrandImg, name: 'Evo Grand' },
                { id: '8', image: felizNeoImg, name: 'Feliz Neo' },
                { id: '9', image: felizSImg, name: 'Feliz S' },
                // { id: '10', image: klaraS2Img, name: 'Klara S2' },
                { id: '11', image: ventoNeoImg, name: 'Vento Neo' },
                { id: '12', image: klaraNeoImg, name: 'Klara Neo' },
                // { id: '13', image: ventoSImg, name: 'Vento S' },
                { id: '14', image: theonSImg, name: 'Theon S' },
              ]}
            />

            {/* tin tức */}
            <Box sx={{ bgcolor: '#f7f7f8', py: { xs: 5, md: 7 } }}>
              <Container maxWidth="lg">
                <Box textAlign="center" mb={3}>
                  <Typography
                    variant="overline"
                    sx={{ letterSpacing: 2, color: 'text.secondary' }}
                  >
                    TIN TỨC XE MÁY ĐIỆN VINFAST
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 900, color: '#e63946', mt: 1 }}
                  >
                    Tin tức nổi bật
                  </Typography>
                </Box>

                <Grid container spacing={2.5}>
                  {/* Bài lớn bên trái */}
                  <Grid item xs={12} md={8}>
                    {top3News && (
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          boxShadow: '0 16px 40px rgba(0,0,0,.10)',
                          bgcolor: '#fff',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={!isEmpty(top3News) && top3News[0].img}
                          alt={!isEmpty(top3News) && top3News[0].title}
                          sx={{
                            height: { xs: 200, sm: 260, md: 320 },
                            objectFit: 'cover',
                          }}
                        />
                        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="flex-start"
                          >
                            <DateBadge
                              date={!isEmpty(top3News) && top3News[0].date}
                            />
                            <Box flex={1}>
                              <Typography
                                component={RouterLink}
                                to={
                                  (!isEmpty(top3News) && top3News[0].href) ||
                                  `/new/${encodeURIComponent(
                                    !isEmpty(top3News) ? top3News[0].slug : '',
                                  )}`
                                }
                                variant="h6"
                                sx={{
                                  textDecoration: 'none',
                                  color: 'text.primary',
                                  fontWeight: 900,
                                  lineHeight: 1.2,
                                  mb: 1,
                                  '&:hover': { color: 'primary.main' },
                                  display: 'block',
                                  textAlign: 'left',
                                  alignSelf: 'flex-start',
                                  mx: 0,
                                }}
                              >
                                {!isEmpty(top3News) && top3News[0].title}
                              </Typography>
                              <Typography
                                color="text.secondary"
                                mb={2}
                                sx={{
                                  display: 'block',
                                  textAlign: 'left',
                                  alignSelf: 'flex-start',
                                  mx: 0,
                                }}
                              >
                                {!isEmpty(top3News) && top3News[0].description}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>

                  {/* 2 bài nhỏ bên phải */}
                  <Grid item xs={12} md={4}>
                    <Stack spacing={2.5}>
                      {(top3News || []).slice(1).map(n => (
                        <Card
                          key={n.id ?? n.slug}
                          elevation={0}
                          sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,.08)',
                            bgcolor: '#fff',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={n.img}
                            alt={n.title}
                            sx={{ height: 140, objectFit: 'cover' }}
                          />
                          <CardContent sx={{ p: 2.25 }}>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="flex-start"
                            >
                              <DateBadge date={n.date} />
                              <Box flex={1}>
                                <Tooltip
                                  title={n.title}
                                  arrow
                                  enterDelay={400}
                                  disableInteractive
                                  componentsProps={{
                                    tooltip: { sx: { fontSize: 12 } },
                                  }} // tuỳ chọn
                                  placement="top"
                                >
                                  <Box
                                    component={RouterLink}
                                    to={
                                      n.href ||
                                      `/new/${encodeURIComponent(n.slug)}`
                                    }
                                    sx={{
                                      textDecoration: 'none',
                                      color: 'inherit',
                                      display: 'block',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1" // (h7 không tồn tại)
                                      sx={{
                                        fontWeight: 900,
                                        lineHeight: 1.2,
                                        mb: 1,
                                        '&:hover': { color: 'primary.main' },

                                        // clamp 2 dòng + ellipsis
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',

                                        display: 'block',
                                        textAlign: 'left',
                                        alignSelf: 'flex-start',
                                        mx: 0,
                                      }}
                                    >
                                      {n.title}
                                    </Typography>
                                  </Box>
                                </Tooltip>
                                <Tooltip
                                  title={n?.description || ''}
                                  arrow
                                  enterDelay={400}
                                  placement="top-start"
                                  disableInteractive
                                  componentsProps={{
                                    tooltip: {
                                      sx: {
                                        maxWidth: 480,
                                        fontSize: 12,
                                        whiteSpace: 'pre-wrap',
                                      }, // xuống dòng đúng theo mô tả gốc
                                    },
                                  }}
                                >
                                  <Typography
                                    color="text.secondary"
                                    mb={2}
                                    sx={{
                                      // ⬇️ ép căn trái
                                      textAlign: 'left',
                                      alignSelf: 'stretch', // nếu nằm trong Stack/Grid đang alignItems="center"
                                      width: '100%', // chiếm full chiều ngang để không bị center theo cha

                                      // clamp 2 dòng + ellipsis
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'normal',
                                      wordBreak: 'break-word',
                                    }}
                                    title={n?.description || ''}
                                  >
                                    {n?.description}
                                  </Typography>
                                </Tooltip>
                              </Box>
                            </Stack>
                            {/* <Typography
                              component={RouterLink}
                              to={
                                n.href ||
                                `/news/${encodeURIComponent(
                                  n.id ?? n.slug ?? '',
                                )}`
                              }
                              variant="subtitle1"
                              sx={{
                                color: 'text.primary',
                                textDecoration: 'none',
                                fontWeight: 800,
                                lineHeight: 1.2,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                mb: 0.75,
                                '&:hover': { color: 'primary.main' },
                              }}
                            >
                              {n.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {n.description}
                            </Typography> */}
                          </CardContent>
                        </Card>

                        // <Card
                        //   key={n.id ?? n.slug}
                        //   elevation={0}
                        //   sx={{
                        //     borderRadius: 3,
                        //     overflow: 'hidden',
                        //     boxShadow: '0 10px 30px rgba(0,0,0,.08)',
                        //     bgcolor: '#fff',
                        //   }}
                        // >
                        //   <CardMedia
                        //     component="img"
                        //     image={n.img}
                        //     alt={n.title}
                        //     sx={{ height: 140, objectFit: 'cover' }}
                        //   />
                        //   <CardContent sx={{ p: 2.25 }}>
                        //     <Stack
                        //       direction="row"
                        //       alignItems="center"
                        //       spacing={1}
                        //       mb={0.5}
                        //     >
                        //       <DateBadge date={n.date} />
                        //       <Box flex={1}>
                        //         <Typography
                        //           component={RouterLink}
                        //           to={
                        //             n.href ||
                        //             `/new/${encodeURIComponent(n.slug)}`
                        //           }
                        //           variant="h6"
                        //           sx={{
                        //             textDecoration: 'none',
                        //             color: 'text.primary',
                        //             fontWeight: 900,
                        //             lineHeight: 1.2,
                        //             mb: 1,
                        //             '&:hover': { color: 'primary.main' },
                        //           }}
                        //         >
                        //           {n.title}
                        //         </Typography>
                        //         <Typography color="text.secondary" mb={2}>
                        //           {n.description}
                        //         </Typography>
                        //       </Box>
                        //     </Stack>
                        //   </CardContent>
                        // </Card>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>

                {/* nút xem thêm */}
                <Box textAlign="center" mt={3.5}>
                  <Button
                    component={RouterLink}
                    to="/news"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#ff2c8b',
                      color: '#ff2c8b',
                      px: 4,
                      borderRadius: 999,
                      fontWeight: 800,
                      '&:hover': {
                        borderColor: '#ff2c8b',
                        bgcolor: 'rgba(255,44,139,.06)',
                      },
                    }}
                  >
                    Xem thêm
                  </Button>
                </Box>
              </Container>
            </Box>
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
