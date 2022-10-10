// @mui
import { Card, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '~/hooks/useResponsive';
// components
import Logo from '~/components/Logo';
// sections
import LoginForm from '~/components/Login/LoginForm';
// img
import illustrationLoginImg from '~/assets/images/illustration_login.png';
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const mdUp = useResponsive('up', 'md');

  return (
    <RootStyle>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>

      {mdUp && (
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Chào mừng đã quay trở lại
          </Typography>
          <img src={illustrationLoginImg} alt="login" />
        </SectionStyle>
      )}

      <Container maxWidth="sm">
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Đăng Nhập
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>Nhập thông tin đăng nhập để tiếp tục</Typography>

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
