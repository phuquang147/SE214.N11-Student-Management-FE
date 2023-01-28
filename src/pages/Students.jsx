import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Card, CircularProgress, Container, Stack, Typography } from '@mui/material';
// components
import Filters from '~/components/Filters';
import Iconify from '~/components/Iconify';
// constants
import { studentFilters } from '~/constants/filters';
// services
import Table from '~/components/Table';
import { selectClasses } from '~/redux/infor';
import request from '~/services/request';
import { deleteStudent, getAllStudents } from '~/services/studentRequests';
import { toast } from 'react-toastify';
import { studentColumns } from '~/constants/columns';

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
          <Table data={students} columns={studentColumns} onDelete={handleDelete} />
        </Card>
      )}
    </Container>
  );
}
