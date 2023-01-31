// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import TeacherForm from '~/components/Teachers/TeacherForm';
import HelmetContainer from '~/HOC/HelmetContainer';

export default function NewTeacher() {
  return (
    <HelmetContainer title="Thêm giáo viên | Student Management">
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
    </HelmetContainer>
  );
}
