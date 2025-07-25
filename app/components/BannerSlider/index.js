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
import xevinImage from 'images/xevin.jpg';
import messages from './messages';
import './style.css';

const sliderData = [
  {
    image: '/images/xevin.jpg',
    title: 'VinFast Motio',
    description: 'Lựa chọn hoàn hảo cho học sinh',
    buttonText: 'Khám phá ngay',
    buttonLink: '#',
  },
  {
    image: '/images/slide2.jpg',
    title: 'Thiết kế hiện đại',
    description: 'Thân thiện với môi trường, năng động với giới trẻ',
    buttonText: 'Xem chi tiết',
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
              backgroundImage: `url(${xevinImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '500px',
              position: 'relative',
            }}
          >
            <div className="slide-content">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <a href={item.buttonLink} className="btn-slide">
                {item.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

BannerSlider.propTypes = {};

export default memo(BannerSlider);
