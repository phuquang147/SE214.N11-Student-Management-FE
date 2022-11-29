// material
import { Card, Container, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router';
// components
import ClassForm from '~/components/Classes/ClassForm';

export default function EditClass() {
  const location = useLocation();
  const _class = location.state;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa thông tin lớp
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <ClassForm mode="edit" _class={_class} />
      </Card>
    </Container>
  );
}
