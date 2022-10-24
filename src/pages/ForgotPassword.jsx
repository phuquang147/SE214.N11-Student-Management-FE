// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router';
// components
import EmailForm from '~/components/ForgotPassword/EmailForm';
import ResetForm from '~/components/ForgotPassword/ResetForm';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
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

export default function ForgotPassword() {
  const { token } = useParams();

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            {token ? 'Tạo mật khẩu mới' : 'Quên mật khẩu'}
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            {token ? 'Nhập mật khẩu mới' : 'Nhập email để tiếp tục'}
          </Typography>

          {token ? <ResetForm /> : <EmailForm />}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
