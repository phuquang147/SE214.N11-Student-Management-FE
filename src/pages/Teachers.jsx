import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Card, Chip, Container, Stack, Typography } from '@mui/material';
// components
import ActionsMenu from '~/components/ActionsMenu';
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
import Filters from '~/components/Teachers/Filters';
// mock
import teachers from '~/_mock/teachers';

const columns = [
  {
    field: 'name',
    headerName: 'Tên giáo viên',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {row.name}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'id',
    headerName: 'Mã giáo viên',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 120,
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
    field: 'subject',
    headerName: 'Môn',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 120,
    renderCell: (params) => {
      const { row } = params;
      return row.gender === 'Nam' ? (
        <Chip
          label="Nam"
          color="primary"
          sx={{
            bgcolor: 'primary.light',
            color: 'primary.dark',
            fontSize: '13px',
            fontWeight: 'bold',
            width: '60px',
          }}
        />
      ) : (
        <Chip
          label="Nữ"
          color="error"
          sx={{
            bgcolor: 'error.light',
            color: 'error.dark',
            fontSize: '13px',
            fontWeight: 'bold',
            width: '60px',
          }}
        />
      );
    },
  },

  {
    field: 'birthdate',
    headerName: 'Ngày sinh',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
  },
  {
    field: 'status',
    headerName: 'Tình trạng',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 130,
    renderCell: (params) => {
      const { row } = params;
      if (row.status === 'Đang dạy')
        return (
          <Chip
            label="Đang dạy"
            color="success"
            sx={{
              bgcolor: 'success.light',
              color: 'success.dark',
              fontSize: '13px',
              fontWeight: 'bold',
              width: '130px',
            }}
          />
        );
      else
        return (
          <Chip
            label="Đã nghỉ"
            color="error"
            sx={{
              bgcolor: 'error.light',
              color: 'error.dark',
              fontSize: '13px',
              fontWeight: 'bold',
              width: '130px',
            }}
          />
        );
    },
  },
  {
    field: 'Hành động',
    headerName: '',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    hideable: false,
    filterable: false,
    renderCell: (params) => {
      return <ActionsMenu />;
    },
  },
];

export default function Teachers() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
        <Typography variant="h4">Giáo viên</Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/teachers/new"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Thêm giáo viên
        </Button>
      </Stack>

      <Filters />

      <Card
        sx={{
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#5e94ca',
            color: 'white',
          },
        }}
      >
        <Table data={teachers} columns={columns} />
      </Card>
    </Container>
  );
}
