// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import StaffForm from '~/components/Staffs/StaffForm';

export default function NewStaff() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Thêm nhân viên
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <StaffForm />
      </Card>
    </Container>
  );
}
