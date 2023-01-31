// material
import { Card, Container, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router';
// components
import StudentForm from '~/components/Students/StudentForm';
import HelmetContainer from '~/HOC/HelmetContainer';

export default function EditStudent() {
  const location = useLocation();
  const student = location.state;

  const formattedStudent = {
    ...student,
    class: student.className.name,
  };

  return (
    <HelmetContainer title="Chỉnh sửa học sinh | Student Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chỉnh sửa thông tin học sinh
          </Typography>
        </Stack>

        <Card sx={{ padding: 4 }}>
          <StudentForm mode="edit" student={formattedStudent} />
        </Card>
      </Container>
    </HelmetContainer>
  );
}
