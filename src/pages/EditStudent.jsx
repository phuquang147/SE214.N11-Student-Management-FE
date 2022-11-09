// material
import { Card, Container, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
// components
import StudentForm from '~/components/Students/StudentForm';
import { selectClasses } from '~/redux/infor';

export default function EditStudent() {
  const location = useLocation();
  const classes = useSelector(selectClasses);
  const student = location.state;

  const studentClass = classes.find((_class) => _class._id === student.className);
  const studentClassName = studentClass.name;

  const formattedStudent = {
    ...student,
    class: studentClassName,
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa thông tin học sinh
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <StudentForm mode="edit" student={formattedStudent} />
      </Card>
    </Container>
  );
}
