// material
import { Card, Container, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router';
// components
import StaffForm from '~/components/Staffs/StaffForm';

export default function EditStaff() {
  const location = useLocation();
  const staff = location.state;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa thông tin nhân viên
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <StaffForm mode="edit" staff={staff} />
      </Card>
    </Container>
  );
}
