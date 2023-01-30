import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Box, Button, Card, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material';
// components
import ActionsMenu from '~/components/ActionsMenu';
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
// filters
import { classFilters } from '~/constants/filters';
// mock
import Filters from '~/components/Filters';
import Cookies from 'js-cookie';
import request from '~/services/request';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteClass, getClasses } from '~/services/classRequest';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from '~/redux/infor';
import HelmetContainer from '~/HOC/HelmetContainer';
import { SUBJECT_TEACHER } from '~/constants/roles';

const columns = [
  {
    field: 'name',
    headerName: 'Tên lớp',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 100,
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
    headerName: 'Mã lớp',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
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
    field: 'grade',
    headerName: 'Khối',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 100,
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
          label={row.grade.name}
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
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap>{row.students.length}</Typography>
        </Stack>
      );
    },
  },
  {
    field: 'teacher[name]',
    headerName: 'Giáo viên chủ nhiệm',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap>{row.teacher.name}</Typography>
        </Stack>
      );
    },
  },
  {
    field: 'Tùy chỉnh',
    headerName: '',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    sortable: false,
    hideable: false,
    filterable: false,
    flex: 1,
    renderCell: (params) => {
      const { _id, grade, name, teacher, handleDelete } = params.row;
      const _class = {
        _id,
        name,
        grade: { label: grade.name.toString(), value: grade._id },
        teacher: { label: teacher.name, value: teacher._id },
      };

      return <ActionsMenu object={_class} onDelete={handleDelete} />;
    },
  },
];

function Classes() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  let homeroomClass;
  if (user?.role?.name === 'Giáo viên chủ nhiệm') {
    homeroomClass = user.classes[0].name;
  }

  const getAllClasses = async () => {
    setLoading(true);
    const res = await getClasses();
    const { data, status } = res;

    if (status === 200) {
      setSelectedClasses(data.classes);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  const handleChangeFilter = async (values) => {
    const { grade, schoolYear } = values;

    const formattedGrade = grade.label !== undefined && grade.label !== 'Tất cả' ? `grade=${grade.value}` : '';
    const formattedSchoolYear =
      schoolYear.value !== undefined && schoolYear.value !== 'Tất cả' ? `schoolYear=${schoolYear.value}` : '';

    setLoading(true);
    const res = await request.get(`/classes?${formattedGrade}&${formattedSchoolYear}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    if (res.status === 200) {
      const { classes } = res.data;
      setLoading(false);
      setSelectedClasses(classes);
    }
  };

  const handleDelete = async (classId) => {
    try {
      const res = await deleteClass(classId);
      if (res.status === 200) {
        toast.success(res.data.message);
        getAllClasses();
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Đã xảy ra lỗi khi xóa lớp');
    }
  };

  const handleRowClick = (classId, students) => {
    navigate(`/classes/${classId}`, { state: students });
    // console.log(classId, students);
  };

  let filteredColumns = columns;
  if (user?.role?.name === SUBJECT_TEACHER) {
    filteredColumns = columns.filter((column) => column.field !== 'Tùy chỉnh');
  }

  return (
    <HelmetContainer title="Lớp học | Student Management App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
          <Typography variant="h4">Lớp học</Typography>
          {user?.role?.name !== SUBJECT_TEACHER && (
            <Button
              variant="contained"
              component={RouterLink}
              to="/classes/new"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Thêm lớp
            </Button>
          )}
        </Stack>

        <Filters filters={classFilters} onChangeFilter={handleChangeFilter} />

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
            <Table
              data={selectedClasses}
              columns={filteredColumns}
              homeroomClass={homeroomClass}
              onDelete={handleDelete}
              onRowClick={handleRowClick}
            />
          </Card>
        )}
      </Container>
    </HelmetContainer>
  );
}

export default Classes;
