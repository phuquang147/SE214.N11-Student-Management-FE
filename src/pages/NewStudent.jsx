// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import StudentForm from '~/components/Students/StudentForm';
import HelmetContainer from '~/HOC/HelmetContainer';

export default function NewStudent() {
  return (
    <HelmetContainer title="Thêm học sinh | Student Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Thêm học sinh
          </Typography>
        </Stack>

        <Card sx={{ padding: 4 }}>
          <StudentForm mode="create" />
        </Card>
      </Container>
    </HelmetContainer>
  );
}
