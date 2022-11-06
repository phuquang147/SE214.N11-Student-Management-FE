import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Card, Chip, Container, Stack, Typography } from '@mui/material';
// components
import ActionsMenu from '~/components/ActionsMenu';
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
// filters
import { studentFilters } from '~/constants/filters';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectClasses } from '~/redux/infor';
import { useState } from 'react';
import { useEffect } from 'react';
import Filters from '~/components/Filters';

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
  const classes = useSelector(selectClasses);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (classes.length > 0) {
      const updatedStudents = [];

      classes.forEach((_class) => {
        _class.students.forEach((student) => {
          const formatedStudent = {
            id: student._id.slice(0, 8).toUpperCase(),
            name: student.name,
            phone: student.phone,
            email: student.email,
            birthday: student.birthday,
            address: student.address,
            gender: student.gender,
            status: student.status,
          };
          updatedStudents.push(formatedStudent);
        });
      });

      setStudents(updatedStudents);
    }
  }, [classes]);

  const handleChangeFilter = (values) => {
    const { class: className, schoolYear } = values;
    const updatedStudents = [];
    classes.forEach((_class) => {
      if (_class.name === className && _class.schoolYear === +schoolYear) {
        _class.students.forEach((student) => {
          const formatedStudent = {
            id: student._id.slice(0, 8).toUpperCase(),
            name: student.name,
            phone: student.phone,
            email: student.email,
            birthday: student.birthday,
            address: student.address,
            gender: student.gender,
            status: student.status,
          };
          updatedStudents.push(formatedStudent);
        });
      }
    });

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
