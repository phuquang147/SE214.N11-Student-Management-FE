// material
import { Card, Container, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router';
// components
import ProfileForm from '~/components/Profile/ProfileForm';

export default function Profile() {
  const location = useLocation();
  const user = location.state;
  console.log(user);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Thông tin tài khoản
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <ProfileForm user={user} />
      </Card>
    </Container>
  );
}
