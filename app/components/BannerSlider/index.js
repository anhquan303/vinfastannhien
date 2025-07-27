/**
 *
 * BannerSlider
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import { Grid, Typography, Stack } from '@mui/material';
import anhbia1 from '../../images/anhbia1.png';
import anhbia2 from '../../images/anhbia2.png';

const sliderData = [
  {
    image: anhbia1,
    title: 'VinFast Motio',
    description: 'Lựa chọn hoàn hảo cho học sinh',
    buttonText: 'Khám phá ngay',
    buttonText1: 'Xem thêm các sản phẩm khác',
    buttonLink: '#',
  },
  {
    image: anhbia2,
    title: 'Thiết kế hiện đại',
    description: 'Thân thiện với môi trường, năng động với giới trẻ',
    buttonText: 'Xem chi tiết',
    buttonText1: 'Xem thêm các sản phẩm khác',
    buttonLink: '#',
  },
];

function BannerSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {sliderData.map((item, index) => (
        <div className="slide-wrapper">
          <div
            className="slide-background"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '500px',
              position: 'relative',
            }}
          >
            <div className="slide-content">
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                sx={{
                  textAlign: { xs: 'left', md: 'center' },
                  px: { xs: 2, md: 10, lg: 0 },
                  py: { xs: 4, md: 8, lg: 0 },
                }}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {item.title}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1" mb={4}>
                    {item.description}
                  </Typography>
                </Grid>

                <Grid item>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent={{ xs: 'flex-start', md: 'center' }}
                    alignItems="center"
                  >
                    <a href={item.buttonLink} className="btn-slide">
                      {item.buttonText}
                    </a>
                    <a href={item.buttonLink} className="btn-slide-1">
                      {item.buttonText1}
                    </a>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

BannerSlider.propTypes = {};

export default memo(BannerSlider);
