import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// img
import illustration404Img from '~/assets/images/illustration_404.svg';
import HelmetContainer from '~/HOC/HelmetContainer';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export default function Page404() {
  return (
    <HelmetContainer title="Không tìm thấy trang | Student Management">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Không tìm thấy trang
          </Typography>

          <Box component="img" src={illustration404Img} sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Về trang chủ
          </Button>
        </ContentStyle>
      </Container>
    </HelmetContainer>
  );
}
