import React, { useEffect } from 'react';
import { Box, Container, Typography, Stack, Breadcrumbs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchNewsDetail } from '../actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/Loading';

const NewsDetail = () => {
  useInjectReducer({ key: 'news', reducer });
  useInjectSaga({ key: 'news', saga });
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { loading, error, newDetail } = useSelector(state => state.news || {});

  useEffect(() => {
    if (slug) {
      dispatch(fetchNewsDetail(slug));
    }
  }, [slug]);

  return (
    <Container maxWidth="md">
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
      <Box py={4}>
        {/* Đường dẫn breadcrumb */}
        <Box mb={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ '& a': { textDecoration: 'none', color: 'primary.main' } }}
          >
            <Link to="/home">Trang chủ</Link>
            <Typography color="text.primary" fontWeight={600}>
              Tin tức
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Tiêu đề */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {newDetail && newDetail.title}
        </Typography>

        {/* Ngày đăng */}
        <Typography variant="caption" color="textSecondary" gutterBottom>
          🗓️ {newDetail && newDetail.date}
        </Typography>

        {/* Nội dung */}
        <Box mt={3}>
          {/* Ảnh đầu tiên (ảnh banner) */}
          <Box
            component="img"
            src={newDetail && newDetail.img}
            width="100%"
            alt="main visual"
            mb={3}
          />

          {/* Các đoạn văn */}
          {newDetail &&
            newDetail.paragraphs.map((para, i) => (
              <Typography
                key={i}
                variant="body1"
                paragraph
                sx={{ textAlign: 'justify' }}
              >
                {para}
              </Typography>
            ))}

          {/* Ảnh giữa bài */}
          {newDetail && newDetail.middleImage && (
            <Box
              component="img"
              src={newDetail.middleImage}
              width="100%"
              mt={3}
              alt="highlight"
            />
          )}

          {/* Các đoạn kết */}
          {newDetail &&
            newDetail.paragraphsEnd.map((para, i) => (
              <Typography
                key={i}
                variant="body1"
                paragraph
                sx={{ textAlign: 'justify' }}
              >
                {para}
              </Typography>
            ))}
        </Box>
      </Box>
    </Container>
  );
};

export default NewsDetail;
