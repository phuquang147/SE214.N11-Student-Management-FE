import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Card, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material';
// components
import ActionsMenu from '~/components/ActionsMenu';
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
import Filters from '~/components/Filters';
// mock
// import teachers from '~/_mock/teachers';
import { teacherFilters } from '~/constants/filters';
import { toast } from 'react-toastify';
import { deleteTeacher, getTeachers, getTeachersBySubjectAndClass } from '~/services/teacherRequest';
import { useState } from 'react';
import { useEffect } from 'react';
import HelmetContainer from '~/HOC/HelmetContainer';

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
          <Typography noWrap>{row._id.slice(0, 8).toUpperCase()}</Typography>
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
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap>{row.subject.name}</Typography>
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
      const { name, phone, address, email, gender, birthday, status, subject, role, _id, handleDelete } = params.row;
      const teacher = {
        name,
        phone,
        address,
        email,
        gender,
        status,
        subject,
        role,
        birthday,
        _id,
      };
      return <ActionsMenu object={teacher} onDelete={handleDelete} />;
    },
  },
];

export default function Teachers() {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);

  const getAllTeachers = async () => {
    try {
      setLoading(true);
      const res = await getTeachers();
      if (res.status === 200) {
        setTeachers(res.data.teachers);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  const handleChangeFilter = async (values) => {
    console.log(values);
    const { subject, class: _class } = values;
    try {
      const formattedSubject = subject.value !== 'Tất cả' ? `subject=${subject.value}` : '';
      const formattedClass = _class.value !== 'Tất cả' ? `class=${_class.value}` : '';

      setLoading(true);
      const res = await getTeachersBySubjectAndClass(formattedSubject, formattedClass);
      if (res.status === 200) {
        setTeachers(res.data.teachers);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Đã xảy ra lỗi khi tìm giáo viên');
    }
  };

  const handleDelete = async (teacherId) => {
    try {
      const res = await deleteTeacher(teacherId);
      if (res.status === 200) {
        toast.success(res.data.message);
        await getAllTeachers();
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại');
    }
  };

  return (
    <HelmetContainer title="Giáo viên | Student Management App">
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

        <Filters filters={teacherFilters} onChangeFilter={handleChangeFilter} />

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
            <Table data={teachers} columns={columns} onDelete={handleDelete} />
          </Card>
        )}
      </Container>
    </HelmetContainer>
  );
}
