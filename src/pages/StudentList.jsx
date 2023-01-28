import { Card, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import Table from '~/components/Table';
import { studentColumns } from '~/constants/columns';
import { deleteStudent } from '~/services/studentRequests';

function StudentList() {
  const location = useLocation();
  const [list, setList] = useState(location.state);

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
        <Typography variant="h4">Danh sách học sinh</Typography>
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
        <Table data={list} columns={studentColumns} onDelete={handleDelete} />
      </Card>
    </Container>
  );
}

export default StudentList;
