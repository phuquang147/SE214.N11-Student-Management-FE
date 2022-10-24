import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Card, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import Filters from '~/components/Students/Filters';
import TableStudents from '~/components/Students/TableStudents';
// mock
import students from '~/_mock/students';

export default function Students() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  return (
    <Container>
      <Typography variant="h4">Quản lý học sinh</Typography>
      <Stack direction="row" alignItems="center" justifyContent="end" mb={5} columnGap={2}>
        <Filters isOpenFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} />
        <Button
          variant="contained"
          component={RouterLink}
          to="/students/new"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Tạo mới học sinh
        </Button>
      </Stack>

      <Card>
        <TableStudents data={students} />
      </Card>
    </Container>
  );
}
