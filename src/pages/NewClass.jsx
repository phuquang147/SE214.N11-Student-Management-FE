// material
import { Card, Container, Stack, Typography } from '@mui/material';
import ClassForm from '~/components/Classes/ClassForm';
// components

export default function NewClass() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Tạo mới lớp
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <ClassForm />
      </Card>
    </Container>
  );
}
