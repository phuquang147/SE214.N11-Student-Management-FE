import { useLocation } from 'react-router';
// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import TeacherForm from '~/components/Teachers/TeacherForm';
import HelmetContainer from '~/HOC/HelmetContainer';

export default function EditTeacher() {
  const location = useLocation();
  const teacher = location.state;

  return (
    <HelmetContainer title="Chỉnh sửa giáo viên | Student Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chỉnh sửa thông tin giáo viên
          </Typography>
        </Stack>

        <Card sx={{ padding: 4 }}>
          <TeacherForm mode="edit" teacher={teacher} />
        </Card>
      </Container>
    </HelmetContainer>
  );
}
