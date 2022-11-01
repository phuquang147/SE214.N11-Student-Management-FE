import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Card, Chip, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
import Filters from '~/components/Scores/Filters';
// filters
import { classFilters } from '~/constants/filters';
// mock
import classes from '~/_mock/classes';
import ActionsMenu from '~/components/ActionsMenu';

const columns = [
  {
    field: 'className',
    headerName: 'Tên lớp',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {row.className}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'id',
    headerName: 'Mã lớp',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap>{row.id.slice(0, 8).toUpperCase()}</Typography>
        </Stack>
      );
    },
  },
  {
    field: 'grade',
    headerName: 'Khối',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130,
    renderCell: (params) => {
      const { row } = params;
      let bgColor = 'primary.light';
      let color = 'primary.dark';

      if (row.grade === 10) {
        bgColor = '#c0ca33';
        color = '#f0f4c3';
      }

      if (row.grade === 11) {
        bgColor = '#ff9100';
        color = '#b26500';
      }

      return (
        <Chip
          label={row.grade}
          color="success"
          sx={{
            bgcolor: bgColor,
            color: color,
            fontSize: '13px',
            fontWeight: 'bold',
            width: '60px',
          }}
        />
      );
    },
  },
  {
    field: 'schoolYear',
    headerName: 'Năm học',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
  },
  {
    field: 'quantity',
    headerName: 'Sỉ số',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
  },
  {
    field: 'teacher',
    headerName: 'Giáo viên chủ nhiệm',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
  },
  {
    field: 'Tùy chỉnh',
    headerName: '',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    sortable: false,
    hideable: false,
    filterable: false,
    renderCell: (params) => {
      return <ActionsMenu />;
    },
  },
];

function Classes() {
  return (
    <Container>
      <Typography variant="h4">Quản lý lớp học</Typography>
      <Stack direction="row" alignItems="center" justifyContent="end" mb={5} columnGap={2}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/classes/new"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Tạo mới lớp
        </Button>
      </Stack>

      <Filters filters={classFilters} />

      <Card
        sx={{
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#5e94ca',
            color: 'white',
          },
        }}
      >
        <Table data={classes} columns={columns} />
      </Card>
    </Container>
  );
}

export default Classes;
