import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Card, Container, Skeleton, Stack, Typography } from '@mui/material';
// components
import Filters from '~/components/Filters';
import Iconify from '~/components/Iconify';
// constants
import { studentFilters } from '~/constants/filters';
// services
import Table from '~/components/Table';
import { selectClasses, selectUser } from '~/redux/infor';
import request from '~/services/request';
import { deleteStudent, getAllStudents } from '~/services/studentRequests';
import { toast } from 'react-toastify';
import { studentColumns } from '~/constants/columns';
import HelmetContainer from '~/HOC/HelmetContainer';
import { SUBJECT_TEACHER } from '~/constants/roles';

export default function Students() {
  const classes = useSelector(selectClasses);
  const [students, setStudents] = useState([]);
  const user = useSelector(selectUser);
  const [loaded, setLoaded] = useState(user.hasOwnProperty());

  useEffect(() => {
    const getStudents = async () => {
      const res = await getAllStudents();
      console.log(res);
      if (res.status === 200) {
        setStudents(res.data.students);
        setLoaded(true);
      }
    };
    getStudents();
  }, [classes]);

  const handleChangeFilter = async (values) => {
    const { class: _class, schoolYear } = values;
    const updatedStudents = [];

    const formattedClassName = _class.value !== undefined && _class.value !== 'Tất cả' ? `name=${_class.name}` : '';
    const formattedSchoolYear =
      schoolYear !== undefined && schoolYear.value !== 'Tất cả' ? `schoolYear=${schoolYear.value}` : '';

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
  };

  const handleDelete = async (studentId) => {
    const res = await deleteStudent(studentId);

    if (res.status === 200) {
      toast.success(res.data.message);
      const updatedStudents = students.filter((element) => element._id !== studentId);
      setStudents(updatedStudents);
    } else {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  let filteredColumns = studentColumns;
  if (user?.role?.name === SUBJECT_TEACHER) {
    filteredColumns = studentColumns.filter((column) => column.field !== 'Hành động');
  }

  if (!loaded) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: '16px' }} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px', mt: 2 }} />
      </>
    );
  }

  return (
    <HelmetContainer title="Học sinh | Student Management App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
          <Typography variant="h4">Học sinh</Typography>
          {user?.role?.name !== SUBJECT_TEACHER && (
            <Button
              variant="contained"
              component={RouterLink}
              to="/students/new"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Thêm học sinh
            </Button>
          )}
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
          <Table data={students} columns={filteredColumns} onDelete={handleDelete} />
        </Card>
      </Container>
    </HelmetContainer>
  );
}
