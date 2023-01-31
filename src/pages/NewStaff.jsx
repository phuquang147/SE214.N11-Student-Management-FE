// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import StaffForm from '~/components/Staffs/StaffForm';
import HelmetContainer from '~/HOC/HelmetContainer';

export default function NewStaff() {
  return (
    <HelmetContainer title="Thêm nhân viên | Student Management">
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
    </HelmetContainer>
  );
}
