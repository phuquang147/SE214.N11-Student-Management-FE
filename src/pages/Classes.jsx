import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Card, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
import Filters from '~/components/Filters';
// filters
import * as filters from '~/constants/filters';
// mock
import classes from '~/_mock/classes';

function Classes() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4">Quản lý lớp học</Typography>
      <Stack direction="row" alignItems="center" justifyContent="end" mb={5} columnGap={2}>
        <Filters
          isOpenFilter={openFilter}
          onOpenFilter={handleOpenFilter}
          onCloseFilter={handleCloseFilter}
          filters={filters.classFilters}
        />
        <Button
          variant="contained"
          component={RouterLink}
          to="/classes/new"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Tạo mới lớp
        </Button>
      </Stack>

      <Card>{/* <Table data={classes} co /> */}</Card>
    </Container>
  );
}

export default Classes;
