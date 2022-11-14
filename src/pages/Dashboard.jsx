// @mui
import { Container, Typography } from '@mui/material';
import request from '~/services/request';

export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back
      </Typography>
    </Container>
  );
}
