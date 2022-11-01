// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components
import ClassForm from '~/components/Classes/ClassForm';

export default function EditClass() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa thông tin học sinh
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <ClassForm />
      </Card>
    </Container>
  );
}
