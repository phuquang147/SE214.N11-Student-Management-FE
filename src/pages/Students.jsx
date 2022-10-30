import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Card, Container, Stack, Typography, Chip } from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import Filters from '~/components/Scores/Filters';
import Table from '~/components/Table';
// mock
import students from '~/_mock/students';
// filters
import { studentFilters } from '~/constants/filters';
// import { useDispatch } from 'react-redux';
import ActionsMenu from '~/components/ActionsMenu';

const columns = [
  {
    field: 'name',
    headerName: 'Tên học sinh',
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
    headerName: 'Mã học sinh',
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
      switch (row.status) {
        case 'Đang học':
          return (
            <Chip
              label="Đang học"
              color="primary"
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.dark',
                fontSize: '13px',
                fontWeight: 'bold',
                width: '130px',
              }}
            />
          );
        case 'Đã tốt nghiệp':
          return (
            <Chip
              label="Đã tốt nghiệp"
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
        default:
          return (
            <Chip
              label="Đã nghỉ học"
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
      }
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
        <Button
          variant="contained"
          component={RouterLink}
          to="/students/new"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Tạo mới học sinh
        </Button>
      </Stack>

      <Filters filters={studentFilters} />

      <Card
        sx={{
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#5e94ca',
            color: 'white',
          },
        }}
      >
        <Table data={students} columns={columns} />
      </Card>
    </Container>
  );
}
