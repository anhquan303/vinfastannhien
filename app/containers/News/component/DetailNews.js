import React, { useEffect } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchNewsDetail } from '../actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';

const NewsDetail = () => {
  useInjectReducer({ key: 'news', reducer });
  useInjectSaga({ key: 'news', saga });
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { loading, error, newDetail } = useSelector(state => state.news || {});

  useEffect(() => {
    console.log('slug1: ', slug);
    if (slug) {
      console.log('slug2: ', slug);
      dispatch(fetchNewsDetail(slug));
    }
  }, [slug]);

  console.log('newDetail: ', newDetail);

  return (
    <Container maxWidth="md">
      <Box py={4}>
        {/* Đường dẫn breadcrumb */}
        <Typography variant="caption" display="block" gutterBottom>
          TRANG CHỦ / TIN TỨC
        </Typography>

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
