// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import StudentForm from '~/components/Students/StudentForm';

export default function NewStudent() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Thêm học sinh
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <StudentForm />
      </Card>
    </Container>
  );
}
