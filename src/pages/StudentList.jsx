import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Table from '~/components/Table';
import { studentColumns } from '~/constants/columns';
import { HOMEROOM_TEACHER, SUBJECT_TEACHER } from '~/constants/roles';
import HelmetContainer from '~/HOC/HelmetContainer';
import { selectUser } from '~/redux/infor';
import { deleteStudent, getStudentsByClassId, rankStudents } from '~/services/studentRequests';

function StudentList() {
  const location = useLocation();
  const [list, setList] = useState(location.state);
  const user = useSelector(selectUser);
  const params = useParams();

  const handleDelete = async (studentId) => {
    const res = await deleteStudent(studentId);

    if (res.status === 200) {
      toast.success(res.data.message);
      const updatedStudents = list.filter((element) => element._id !== studentId);
      setList(updatedStudents);
    } else {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleRankStudents = async () => {
    try {
      const classId = params.classId;
      const res = await rankStudents(classId);
      if (res.status === 200) {
        const { message } = res.data;
        toast.success(message);
        handleGetStudents();
      }
    } catch (err) {
      toast.error(err.reponse.data.message);
    }
  };

  const handleGetStudents = async () => {
    try {
      const classId = params.classId;
      const res = await getStudentsByClassId(classId);
      if (res.status === 200) {
        const students = res.data.students;
        setList(students);
      }
    } catch (error) {
      toast.error(error.reponse.data.message);
    }
  };

  let filterColums = studentColumns;
  if (user?.role?.name === SUBJECT_TEACHER) {
    filterColums = studentColumns.filter((column) => column.field !== 'Hành động');
  }

  if (!user?.classes?.find((_class) => _class._id === params.classId)) {
    filterColums = studentColumns.filter((column) => column.field !== 'Hành động');
  }

  return (
    <HelmetContainer title="Danh sách học sinh | Student Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
          <Typography variant="h4">Danh sách học sinh</Typography>
          {user?.role?.name === HOMEROOM_TEACHER && (
            <Button variant="contained" onClick={handleRankStudents}>
              Xếp loại học sinh
            </Button>
          )}
        </Stack>

        <Card
          sx={{
            width: '100%',
            '& .super-app-theme--header': {
              backgroundColor: '#5e94ca',
              color: 'white',
            },
          }}
        >
          <Table data={list} columns={filterColums} onDelete={handleDelete} />
        </Card>
      </Container>
    </HelmetContainer>
  );
}

export default StudentList;
