/**
 *
 * Introduce
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectIntroduce from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Container, Grid, Typography } from '@mui/material';
import introduce1 from '../../images/introduce1.png';
import introduce2 from '../../images/introduce2.png';
import introduce3 from '../../images/introduce3.png';
import introduce4 from '../../images/introduce4.png';
import { COMMITMENTS } from './constants';

export function Introduce() {
  useInjectReducer({ key: 'introduce', reducer });
  useInjectSaga({ key: 'introduce', saga });

  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4A00E0, #8E2DE2)',
          color: '#fff',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          GIỚI THIỆU
        </Typography>
      </Box>

      <Container sx={{ py: 6 }}>
        {/* Section 1 */}
        <Grid container spacing={4} alignItems="top">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                my: 4,
                textAlign: {
                  xs: 'center', // màn hình nhỏ căn giữa
                  md: 'left', // màn hình vừa trở lên căn trái
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{
                  display: 'inline-block',
                  position: 'relative',
                  pb: 1.5,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: '5px',
                    width: '100%',
                    backgroundColor: '#E74C3C', // đỏ đậm
                    borderRadius: '5px',
                  },
                }}
              >
                VINFAST AN NHIÊN
              </Typography>
            </Box>
            <Typography>
              <strong>
                "Đại lý chính thức xe máy điện VinFast, đồng hành cùng lối sống
                xanh"
              </strong>
            </Typography>
            <Typography mt={2}>
              Chào mừng bạn đến với VinFast An Nhiên – Địa chỉ tin cậy cho những
              ai yêu thích xe máy điện VinFast tại Việt Nam. Chúng tôi là đối
              tác chiến lược của VinFast, mang đến cho khách hàng những dòng xe
              điện hiện đại, chất lượng, góp phần thay đổi thói quen di chuyển,
              hướng tới một cuộc sống tiện nghi và thân thiện với môi trường.
            </Typography>
            <Typography mt={2}>
              <strong>Sứ Mệnh và Giá Trị Cốt Lõi</strong>
            </Typography>
            <Typography mt={2}>
              Tại VinFast An Nhiên, chúng tôi không chỉ bán xe, mà còn trao gửi
              giải pháp di chuyển bền vững cho cộng đồng. Chúng tôi cam kết mang
              đến những dòng xe điện an toàn, tiết kiệm và công nghệ tiên tiến,
              giúp bạn di chuyển thuận tiện mà vẫn giữ trọn giá trị bảo vệ môi
              trường. VinFast An Nhiên đồng hành cùng bạn tạo nên một tương lai
              xanh, nơi những hành trình không còn khói bụi, chỉ còn sự an nhiên
              trên từng cung đường.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={introduce1}
              alt="Vinfast girl on bike"
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          </Grid>
        </Grid>

        {/* Section 2 */}
        <Box mt={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ my: 4 }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                display: 'inline-block',
                position: 'relative',
                pb: 1.5,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '5px',
                  width: '100%',
                  backgroundColor: '#E74C3C', // đỏ đậm
                  borderRadius: '5px',
                },
              }}
            >
              CÁC DÒNG SẢN PHẨM NỔI BẬT
            </Typography>
          </Box>
          <Typography>
            <strong>
              VinFast An Nhiên hân hạnh giới thiệu các dòng xe máy điện VinFast
              hiện đại, đáp ứng nhu cầu di chuyển thông minh...
            </strong>
          </Typography>
          <Typography mt={2}>
            Kiểu dáng trẻ trung, hiện đại Thiết kế tinh tế, phù hợp với phong
            cách sống năng động, cá tính của thế hệ mới. Công nghệ tiên
            tiến Trang bị động cơ điện mạnh mẽ, pin Lithium bền bỉ, giúp xe vận
            hành êm ái, tiết kiệm chi phí và thân thiện với môi trường. An toàn
            tối ưu Hệ thống phanh ABS chống bó cứng, công nghệ chống trượt, mang
            lại cảm giác lái an tâm trên mọi hành trình. Sống xanh mỗi ngày Sử
            dụng xe điện VinFast giúp giảm thiểu khí thải, góp phần làm sạch
            không khí và xây dựng lối sống bền vững cho cộng đồng.
          </Typography>
          <Box mt={2}>
            <img
              src={introduce2}
              alt="Sản phẩm nổi bật"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          </Box>
        </Box>

        {/* Section 3 */}
        <Box mt={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ my: 4 }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                display: 'inline-block',
                position: 'relative',
                pb: 1.5,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '5px',
                  width: '100%',
                  backgroundColor: '#E74C3C', // đỏ đậm
                  borderRadius: '5px',
                },
              }}
            >
              CAM KẾT TỪ VINFAST AN NHIÊN
            </Typography>
          </Box>
          <Typography>
            “Tại VinFast An Nhiên, sự tin tưởng và đồng hành của khách hàng
            chính là động lực lớn nhất để chúng tôi phát triển mỗi ngày. Chúng
            tôi cam kết mang đến không chỉ sản phẩm chất lượng, mà còn là dịch
            vụ tận tâm và trải nghiệm đáng giá.“
          </Typography>
          <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
            <Grid container spacing={4}>
              {/* Cột hình ảnh */}
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={introduce3}
                  alt="Vinfast image"
                  sx={{ width: '100%', mb: 2 }}
                />
                <Box
                  component="img"
                  src={introduce4}
                  alt="Vinfast image"
                  sx={{ width: '100%' }}
                />
              </Grid>

              {/* Cột nội dung */}
              <Grid item xs={12} md={6}>
                {COMMITMENTS.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography fontWeight="bold" gutterBottom>
                      ✓ {item.title}
                    </Typography>
                    <Typography color="text.secondary">{item.desc}</Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

Introduce.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  introduce: makeSelectIntroduce(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Introduce);
