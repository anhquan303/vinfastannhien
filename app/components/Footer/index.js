import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Grid, Typography, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { showroomList } from './constants';
import logo from '../../images/logo.png';

function Footer() {
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
        {/* <Box
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
        </Box> */}

        {/* Danh sách showroom */}
        {/* <Box sx={{ flex: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Hệ thống showroom Xe Máy Điện Vinfast Ecoxe
          </Typography>

          <Grid container spacing={1}>
            {showroomList.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box display="flex" alignItems="flex-start">
                  <HomeIcon fontSize="small" sx={{ mt: '2px', mr: 1 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Box>

      <Box
        sx={{
          bgcolor: '#000060',
          color: 'white',
          pt: 6,
          pb: 3,
          px: { xs: 2, md: 10 },
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          XE MÁY ĐIỆN VINFAST AN NHIÊN QUẢNG NINH
        </Typography>

        <Grid container spacing={4}>
          {/* Cột 1: Liên hệ */}

          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold" mb={1}>
              LIÊN HỆ
            </Typography>
            <Box display="flex" gap={1} mb={1}>
              <Typography sx={{ color: '#FF6600', minWidth: 80 }}>
                ĐỊA CHỈ:
              </Typography>
              <Typography>
                Số nhà 954 Hạ Long, Phường Bãi Cháy, Thành phố Hạ Long, Tỉnh Quảng Ninh
              </Typography>
            </Box>

            <Box display="flex" gap={1} mb={1}>
              <Typography sx={{ color: '#FF6600', minWidth: 80 }}>
                ĐIỆN THOẠI:
              </Typography>
              <Typography>0396959876</Typography>
            </Box>

            <Box display="flex" gap={1} mb={1}>
              <Typography sx={{ color: '#FF6600', minWidth: 80 }}>
                EMAIL:
              </Typography>
              <Typography>Annhienbaichay@gmail.com</Typography>
            </Box>

            <Box display="flex" gap={1} mb={1}>
              <Typography sx={{ color: '#FF6600', minWidth: 80 }}>
                WEBSITE:
              </Typography>
              <Link
                href="https://www.vinfastannhien.vn"
                target="_blank"
                rel="noopener"
                underline="hover"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'white',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#ffcc00', // màu khi hover (ví dụ: vàng)
                  },
                }}
              >
                www.vinfastannhien.vn
              </Link>
            </Box>

            <Box display="flex" gap={1} mb={1}>
              <Typography sx={{ color: '#FF6600', minWidth: 80 }}>
                FANPAGE:
              </Typography>
              <Typography
                component="a"
                href="https://www.facebook.com/share/1CS1GFzQsd/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'white',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#ffcc00', // màu khi hover (ví dụ: vàng)
                  },
                }}
              >
                Xe máy điện VinFast An Nhiên - Bãi Cháy
              </Typography>
            </Box>
          </Grid>

          {/* Cột 2: Chính sách */}
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold" mb={1}>
              CHÍNH SÁCH
            </Typography>
            <Typography>Chính sách đổi trả hàng</Typography>
            <Typography>Chính sách bảo hành</Typography>
            <Typography>Hướng dẫn mua hàng</Typography>
            <Typography>Chính sách bảo mật thông tin</Typography>
            <Typography>Chính sách vận chuyển và giao nhận</Typography>
            <Typography>Chính sách xử lý khiếu nại</Typography>
            <Typography>Chính sách kiểm hàng</Typography>
          </Grid>

          {/* Cột 3: Bản đồ */}
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold" mb={1}>
              BẢN ĐỒ ĐỊA CHỈ
            </Typography>
            <Typography variant="body2" mb={1}>
              Xem bản đồ lớn hơn
            </Typography>

            <Box sx={{ width: '100%', height: 300 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.6909093951876!2d107.0200735!3d20.9649243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a58b9b7d21e61%3A0xcda9731e1cb1521d!2zOTU0IEjhuqEgTG9uZywgQsOjaSBDaMOheSwgSOG6oSBMb25nLCBRdeG6o25nIE5pbmg!5e0!3m2!1sen!2s!4v1755093551563!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          mt={5}
          textAlign="center"
          borderTop="1px solid rgba(255,255,255,0.2)"
          pt={2}
        >
          <Typography variant="body2">
            Copyright © 2025 © <strong>XE MÁY ĐIỆN VINFAST AN NHIÊN</strong>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Footer;
