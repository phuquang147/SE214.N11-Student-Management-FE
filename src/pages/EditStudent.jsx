// material
import { Card, Container, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router';
// components
import StudentForm from '~/components/Students/StudentForm';

export default function EditStudent() {
  const params = useParams();
  console.log(params);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa thông tin học sinh
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <StudentForm />
      </Card>
    </Container>
  );
}
