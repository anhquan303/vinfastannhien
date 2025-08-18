// /**
//  *
//  * BannerSlider
//  *
//  */

// import React, { memo } from 'react';
// // import PropTypes from 'prop-types';
// // import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './style.css';
// import {
//   Grid,
//   Typography,
//   Stack,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import anhbia1 from '../../images/anhbia1.png';
// import anhbia1_mobile from '../../images/anhbia1_giua.png';
// import anhbia2 from '../../images/anhbia2.png';
// import anhbia2_mobile from '../../images/anhbia2_giua.png';
// import anhbia5 from '../../images/anhbia5.png';
// import anhbia3_mobile from '../../images/anhbia3_giua.png';

// const sliderData = [
//   {
//     image: anhbia5,
//     imageMobile: anhbia1_mobile,
//     title: 'VinFast Motio',
//     description: 'Lựa chọn hoàn hảo cho học sinh',
//     buttonText: 'Khám phá ngay',
//     buttonText1: 'Xem thêm các sản phẩm khác',
//     buttonLink: '/product',
//   },
//   {
//     image: anhbia2,
//     imageMobile: anhbia2_mobile,
//     title: 'Thiết kế hiện đại',
//     description: 'Thân thiện với môi trường, năng động với giới trẻ',
//     buttonText: 'Xem chi tiết',
//     buttonText1: 'Xem thêm các sản phẩm khác',
//     buttonLink: '/product',
//   },
//   {
//     image: anhbia1,
//     imageMobile: anhbia3_mobile,
//     title: 'Thiết kế hiện đại',
//     description: 'Thân thiện với môi trường, năng động với giới trẻ',
//     buttonText: 'Xem chi tiết',
//     buttonText1: 'Xem thêm các sản phẩm khác',
//     buttonLink: '/product',
//   },
// ];

// function BannerSlider() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     arrows: false,
//     appendDots: dots => (
//       <div
//         style={{
//           position: 'absolute',
//           bottom: isMobile ? 12 : 20, // nằm trong khung ảnh
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'center',
//           padding: 0,
//           margin: 0,
//           zIndex: 5,
//         }}
//       >
//         <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
//       </div>
//     ),
//   };

//   return (
//     // <Slider {...settings}>
//     //   {sliderData.map((item, index) => (
//     //     <div className="slide-wrapper">
//     //       <div
//     //         className="slide-background"
//     //         style={{
//     //           backgroundImage: `url(${
//     //             isMobile ? item.imageMobile : item.image
//     //           })`,
//     //           backgroundSize: 'cover',
//     //           backgroundPosition: 'center -100px',
//     //           backgroundRepeat: 'no-repeat',
//     //           height: '600px',
//     //           display: 'flex',
//     //           alignItems: 'center',
//     //           justifyContent: 'flex-end',
//     //           paddingRight: '5%',
//     //           paddingLeft: '5%',
//     //         }}
//     //       >
//     //         <div className="slide-content">
//     //           <Grid
//     //             container
//     //             direction="column"
//     //             justifyContent="center"
//     //             alignItems={{ xs: 'center', md: 'center' }} // mobile & desktop đều center
//     //             sx={{
//     //               textAlign: { xs: 'center', md: 'center' }, // chữ giữa khi mobile
//     //               px: { xs: 2, md: 10, lg: 0 },
//     //               py: { xs: 4, md: 8, lg: 0 },
//     //             }}
//     //           >
//     //             <Grid item>
//     //               <Typography
//     //                 variant="h4"
//     //                 component="h1"
//     //                 fontWeight="bold"
//     //                 gutterBottom
//     //               >
//     //                 {item.title}
//     //               </Typography>
//     //             </Grid>

//     //             <Grid item>
//     //               <Typography variant="body1" mb={4}>
//     //                 {item.description}
//     //               </Typography>
//     //             </Grid>

//     //             <Grid item>
//     //               <Stack
//     //                 direction={{ xs: 'column', sm: 'row' }}
//     //                 spacing={2}
//     //                 justifyContent="center" // căn giữa nút
//     //                 alignItems="center"
//     //               >
//     //                 <a href={item.buttonLink} className="btn-slide">
//     //                   {item.buttonText}
//     //                 </a>
//     //                 <a href={item.buttonLink} className="btn-slide-1">
//     //                   {item.buttonText1}
//     //                 </a>
//     //               </Stack>
//     //             </Grid>
//     //           </Grid>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   ))}
//     // </Slider>

//     <Slider
//       {...settings}
//       style={{ marginTop: 0, paddingTop: 0 }}
//       // (tuỳ chọn) kéo dots xuống chút để không đè nội dung
//       appendDots={dots => (
//         <ul style={{ position: 'relative', marginTop: 16 }}>{dots}</ul>
//       )}
//     >
//       {sliderData.map((item, index) => (
//         <div className="slide-wrapper" key={index} style={{ marginTop: 0 }}>
//           <div
//             className="slide-background"
//             style={{
//               position: 'relative', // ⬅️ để dots bám theo
//               backgroundImage: `url(${
//                 isMobile ? item.imageMobile : item.image
//               })`,
//               backgroundSize: 'cover',
//               backgroundPosition: isMobile ? 'center 40px' : 'center -60px',
//               backgroundRepeat: 'no-repeat',
//               height: isMobile ? '620px' : '600px',
//               display: 'flex',
//               alignItems: isMobile ? 'flex-end' : 'center',
//               justifyContent: isMobile ? 'center' : 'flex-end',
//               padding: isMobile ? '0 16px 24px' : '0 5%',
//             }}
//           >
//             {/* lớp phủ gradient nhẹ toàn màn để tăng tương phản */}
//             <div
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 background: isMobile
//                   ? 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.45) 100%)'
//                   : 'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.35) 100%)',
//                 pointerEvents: 'none',
//                 zIndex: 1,
//               }}
//             />

//             {/* OVERLAY chứa text + button */}
//             <div
//               className="slide-content"
//               style={{
//                 position: 'absolute',
//                 zIndex: 2,
//                 color: '#fff',
//                 textAlign: isMobile ? 'center' : 'right',
//                 left: isMobile ? 16 : 'auto',
//                 right: isMobile ? 16 : '5%',
//                 bottom: isMobile ? 140 : 'auto',
//                 top: isMobile ? 'auto' : '50%',
//                 transform: isMobile ? 'none' : 'translateY(-50%)',
//                 maxWidth: isMobile ? 360 : 500,
//                 // Overlay mờ chỉ cho mobile
//                 background: isMobile ? 'rgba(0,0,0,0.32)' : 'transparent',
//                 backdropFilter: isMobile ? 'blur(3px)' : 'none',
//                 borderRadius: isMobile ? 16 : 0,
//                 padding: isMobile ? '12px 14px' : 0,
//                 boxShadow: isMobile ? '0 8px 24px rgba(0,0,0,0.25)' : 'none',
//               }}
//             >
//               <Grid
//                 container
//                 direction="column"
//                 alignItems={{ xs: 'flex-start', md: 'center' }}
//               >
//                 <Grid item>
//                   <Typography
//                     variant={isMobile ? 'h4' : 'h3'}
//                     component="h1"
//                     fontWeight={800}
//                     gutterBottom
//                     sx={{
//                       lineHeight: { xs: 1.05, md: 1.1 },
//                       textShadow: '0 2px 6px rgba(0,0,0,0.4)',
//                       m: 0,
//                     }}
//                   >
//                     {item.title}
//                   </Typography>
//                 </Grid>

//                 {/* Mobile vẫn cho hiện mô tả trong overlay, dễ đọc hơn */}
//                 <Grid item>
//                   <Typography
//                     variant="body1"
//                     mb={isMobile ? 2 : 3}
//                     sx={{
//                       opacity: 0.95,
//                       textShadow: '0 1px 3px rgba(0,0,0,0.35)',
//                     }}
//                   >
//                     {item.description}
//                   </Typography>
//                 </Grid>

//                 <Grid item style={{ width: '100%' }}>
//                   <Stack
//                     direction={{ xs: 'column', sm: 'row' }}
//                     spacing={isMobile ? 1.5 : 2}
//                     justifyContent={isMobile ? 'flex-start' : 'center'}
//                     alignItems="center"
//                   >
//                     <a
//                       href={item.buttonLink}
//                       className="btn-slide"
//                       style={{
//                         display: 'inline-block',
//                         padding: isMobile ? '10px 18px' : '12px 24px',
//                         borderRadius: 999,
//                         background: '#ff2c8b',
//                         color: '#fff',
//                         fontWeight: 700,
//                         textDecoration: 'none',
//                         boxShadow: '0 6px 14px rgba(255,44,139,0.35)',
//                       }}
//                     >
//                       {item.buttonText}
//                     </a>

//                     {/* Tuỳ chọn: ẩn nút phụ trên mobile nếu muốn gọn hơn */}
//                     {!isMobile && (
//                       <a
//                         href={item.buttonLink}
//                         className="btn-slide-1"
//                         style={{
//                           display: 'inline-block',
//                           padding: '12px 24px',
//                           borderRadius: 999,
//                           background: 'rgba(255,255,255,0.9)',
//                           color: '#ff2c8b',
//                           fontWeight: 700,
//                           textDecoration: 'none',
//                         }}
//                       >
//                         {item.buttonText1}
//                       </a>
//                     )}
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </div>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// }

// BannerSlider.propTypes = {};

// export default memo(BannerSlider);

import React, { memo, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Grid,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import anhbia1 from '../../images/anhbia1.png';
import anhbia1_mobile from '../../images/anhbia1_giua.png';
import anhbia2 from '../../images/anhbia2.png';
import anhbia2_mobile from '../../images/anhbia2_giua.png';
import anhbia5 from '../../images/anhbia5.png';
import anhbia3_mobile from '../../images/anhbia3_giua.png';

const sliderData = [
  {
    image: anhbia1,
    imageMobile: anhbia3_mobile,
    title: 'VINFAST EVO GRAND',
    description: 'VinFast Evo Grand – không chỉ là phương tiện, mà là phong cách sống. Một lựa chọn dành cho những ai yêu sự nhẹ nhàng, hiện đại và tự do. Hãy cùng khám phá xem lựa chọn thông minh cho một cuộc sống hiện đại.',
    buttonText: 'Xem chi tiết',
    buttonText1: 'Xem thêm các sản phẩm khác',
    buttonLink: '/product',
  },
  {
    image: anhbia2,
    imageMobile: anhbia2_mobile,
    title: 'VINFAST VENTO S',
    description: 'Không chỉ là một chiếc xe máy điện, Vento S là tuyên ngôn cá tính. Thiết kế mạnh mẽ, đường nét thể thao, tạo nên phong cách riêng biệt trên mọi cung đường. Cùng khám phá xem Vento S mang lại điểm gì nổi bật.',
    buttonText: 'Xem chi tiết',
    buttonText1: 'Xem thêm các sản phẩm khác',
    buttonLink: '/product',
  },
    {
    image: anhbia5,
    imageMobile: anhbia1_mobile,
    title: 'VinFast Motio',
    description: 'VinFast Motio là một sự lựa chọn nổi bật với thiết kế trẻ trung, tính năng vượt trội và giá cả phải chăng. Hãy cùng khám phá lý do tại sao xe máy điện VinFast Motio lại trở thành chiếc xe cho học sinh lý tưởng.',
    buttonText: 'Khám chi tiết',
    buttonText1: 'Xem thêm các sản phẩm khác',
    buttonLink: '/product',
  },
];

function BannerSlider() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const slider = host.querySelector('.slick-slider');
    if (slider) {
      slider.style.position = 'relative';
      slider.style.margin = '0';
      slider.style.padding = '0';
      slider.style.overflow = 'visible';
    }

    const list = host.querySelector('.slick-list');
    if (list) {
      list.style.margin = '0';
      list.style.padding = '0';
    }

    const dots = host.querySelector('.slick-dots');
    if (dots) {
      dots.style.position = 'absolute';
      dots.style.left = '0';
      dots.style.right = '0';
      dots.style.bottom = isMobile ? '12px' : '20px';
      dots.style.margin = '0';
      dots.style.padding = '0';
      dots.style.pointerEvents = 'auto';
    }
  }, [isMobile]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  const MOBILE_BG_EXTRA = 100;

  return (
    <div ref={hostRef} style={{ position: 'relative' }}>
      <Slider {...settings} style={{ margin: 0, padding: 0 }}>
        {sliderData.map((item, index) => (
          <div className="slide-wrapper" key={index} style={{ margin: 0 }}>
            <div
              className="slide-background"
              style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${
                  isMobile ? item.imageMobile : item.image
                })`,
                ...(isMobile
                  ? {
                      backgroundSize: `auto calc(100% + ${MOBILE_BG_EXTRA}px)`,
                      backgroundPosition: 'center top',
                    }
                  : {
                      backgroundSize: 'cover',
                      backgroundPosition: 'center -50px',
                    }),
                backgroundRepeat: 'no-repeat',
                height: isMobile ? '620px' : '600px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: isMobile
                    ? 'transparent'
                    : 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 85%, rgba(0,0,0,0.25) 100%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* CONTENT */}
              <div
                className="slide-content"
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  color: '#fff',
                  textAlign: isMobile ? 'center' : 'center',

                  top: isMobile ? '50%' : '50%',
                  left: isMobile ? '50%' : 'auto',
                  right: isMobile ? 'auto' : '5%',
                  transform: isMobile
                    ? 'translate(-50%, -50%)'
                    : 'translateY(-50%)',

                  width: isMobile ? 'calc(100% - 32px)' : 'auto',
                  maxWidth: isMobile ? 360 : 520,
                  background: isMobile ? 'rgba(0,0,0,0.32)' : 'transparent',
                  backdropFilter: isMobile ? 'blur(3px)' : 'none',
                  borderRadius: isMobile ? 16 : 0,
                  padding: isMobile ? '12px 14px' : 0,
                  //boxShadow: isMobile ? '0 8px 24px rgba(0,0,0,0.25)' : 'none',
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems={{ xs: 'center', md: 'center' }}
                >
                  <Grid item>
                    <Typography
                      variant={isMobile ? 'h4' : 'h3'}
                      component="h1"
                      fontWeight={800}
                      gutterBottom
                      sx={{
                        lineHeight: { xs: 1.05, md: 1.1 },
                        //textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                        m: 0,
                        color: index == 2 && !isMobile && '#3C3C3C'  
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="body1"
                      mb={isMobile ? 2 : 3}
                      sx={{
                        opacity: 0.95,
                        //textShadow: '0 1px 3px rgba(0,0,0,0.35)',
                        color: index == 2 && !isMobile && '#3C3C3C' 
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Grid>

                  <Grid item style={{ width: '100%' }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={isMobile ? 1.5 : 2}
                      justifyContent={isMobile ? 'center' : 'center'}
                      alignItems="center"
                    >
                      <a
                        href={item.buttonLink}
                        className="btn-slide"
                        style={{
                          display: 'inline-block',
                          padding: isMobile ? '10px 18px' : '12px 24px',
                          borderRadius: 999,
                          background: '#ff2c8b',
                          color: '#fff',
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 6px 14px rgba(255,44,139,0.35)',
                        }}
                      >
                        {item.buttonText}
                      </a>

                      {!isMobile && (
                        <a
                          href={item.buttonLink}
                          className="btn-slide-1"
                          style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            borderRadius: 999,
                            background: 'rgba(255,255,255,0.9)',
                            color: '#ff2c8b',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          {item.buttonText1}
                        </a>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default memo(BannerSlider);
