import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Card, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material';
// components
import Filters from '~/components/Filters';
import Iconify from '~/components/Iconify';
// constants
import { studentFilters } from '~/constants/filters';
// services
import ActionsMenu from '~/components/ActionsMenu';
import Table from '~/components/Table';
import { selectClasses } from '~/redux/infor';
import request from '~/services/request';
import { getAllStudents } from '~/services/studentRequests';

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
    field: '_id',
    headerName: 'Mã học sinh',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 120,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap>{row._id.slice(0, 8).toUpperCase()}</Typography>
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
    field: 'birthday',
    headerName: 'Ngày sinh',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
    renderCell: (params) => {
      const { row } = params;
      const birthday = new Date(row.birthday).toLocaleDateString();
      return <Typography>{birthday}</Typography>;
    },
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
      const { name, phone, address, className, email, gender, status, birthday, _id } = params.row;
      const student = { name, phone, address, className, email, gender, status, birthday, _id };

      return <ActionsMenu student={student} onDelete={params.row.handleDelete} />;
    },
  },
];

export default function Students() {
  const classes = useSelector(selectClasses);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      const res = await getAllStudents();
      setStudents(res.students);
    };
    getStudents();
  }, [classes]);

  const handleChangeFilter = async (values) => {
    const { class: _class, schoolYear } = values;
    const updatedStudents = [];

    const formattedClassName = _class.value !== undefined && _class.value !== 'Tất cả' ? `name=${_class.name}` : '';
    const formattedSchoolYear =
      schoolYear !== undefined && schoolYear.value !== 'Tất cả' ? `schoolYear=${schoolYear.value}` : '';

    setLoading(true);
    const res = await request.get(`/classes?${formattedClassName}&${formattedSchoolYear}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const { classes } = res.data;
    classes.forEach((_class) => {
      updatedStudents.push(..._class.students);
    });
    setStudents(updatedStudents);
    setLoading(false);
  };

  const handleDelete = (updatedStudents) => {
    setStudents(updatedStudents);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
        <Typography variant="h4">Học sinh</Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/students/new"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Thêm học sinh
        </Button>
      </Stack>

      <Filters filters={studentFilters} onChangeFilter={handleChangeFilter} />

      {loading ? (
        <Box sx={{ textAlign: 'center', pt: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Card
          sx={{
            width: '100%',
            '& .super-app-theme--header': {
              backgroundColor: '#5e94ca',
              color: 'white',
            },
          }}
        >
          <Table data={students} columns={columns} onDelete={handleDelete} />
        </Card>
      )}
    </Container>
  );
}
