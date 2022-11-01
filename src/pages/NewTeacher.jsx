// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import TeacherForm from '~/components/Teachers/TeacherForm';

export default function NewTeacher() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Thêm giáo viên
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <TeacherForm />
      </Card>
    </Container>
  );
}
