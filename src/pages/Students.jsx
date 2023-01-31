import { Box, Button, Card, Container, Skeleton, Stack, Typography } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Filters from '~/components/Filters';
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
import { studentColumns } from '~/constants/columns';
import { studentFilters } from '~/constants/filters';
import { SUBJECT_TEACHER } from '~/constants/roles';
import HelmetContainer from '~/HOC/HelmetContainer';
import { selectClasses, selectUser } from '~/redux/infor';
import request from '~/services/request';
import { deleteStudent, getAllStudents } from '~/services/studentRequests';

export default function Students() {
  const classes = useSelector(selectClasses);
  const [students, setStudents] = useState([]);
  const user = useSelector(selectUser);
  const [loaded, setLoaded] = useState(user.hasOwnProperty());
  const [exportInfor, setExportInfor] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      const res = await getAllStudents();
      if (res.status === 200) {
        setStudents(res.data.students);
        setLoaded(true);
        setExportInfor({ content: 'Danh sách học sinh toàn trường' });
      } else {
        setExportInfor(null);
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

    if (classes.length === 1) {
      setExportInfor({ schoolYear: classes[0].schoolYear, class: classes[0].name });
    } else setExportInfor({ content: 'Danh sách học sinh toàn trường' });

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

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Học sinh');

    sheet.columns = [
      { header: 'Mã học sinh', key: 'id', width: 20, style: { alignment: { horizontal: 'center' } } },
      { header: 'Họ và tên', key: 'name', width: 40 },
      { header: 'Giới tính', key: 'gender', width: 20 },
      { header: 'Ngày sinh', key: 'birthday', width: 20 },
      { header: 'Số điện thoại', key: 'phone', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Địa chỉ', key: 'address', width: 40 },
      { header: 'Hạnh kiểm', key: 'conduct', width: 20 },
      { header: 'Tình trạng', key: 'status', width: 20 },
    ];

    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFa5d8ff' },
    };

    sheet.getRow(1).font = {
      bold: true,
    };

    for (let student of students) {
      const { _id, name, gender, birthday, phone, email, address, conduct, status } = student;
      const date = new Date(birthday);

      sheet.addRow({
        id: _id.substring(0, 6),
        name,
        gender,
        birthday: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
        phone,
        email,
        address,
        conduct,
        status,
      });
    }

    if (exportInfor !== null) {
      if (exportInfor.content) sheet.insertRow(1, { id: exportInfor.content });
      else sheet.insertRow(1, { id: `Lớp ${exportInfor.class} - Năm học ${exportInfor.schoolYear}` });
      sheet.getRow(1).font = {
        bold: true,
      };
    }

    sheet.eachRow({ includeEmpty: true }, function (row) {
      row.border = {
        bottom: { style: 'thin' },
      };
      row.fontSize = 12;
      row.height = 40;
      row.alignment = { vertical: 'middle' };
    });

    sheet.mergeCells(1, 1, 1, 9);
    sheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };

    const buf = await workbook.xlsx.writeBuffer();
    if (exportInfor.content) {
      saveAs(new Blob([buf]), `Danh sách học sinh toàn trường.xlsx`);
    } else {
      saveAs(new Blob([buf]), `DSHS - Lớp ${exportInfor.class} - Năm học ${exportInfor.schoolYear}.xlsx`);
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
          <Box sx={{ display: 'flex', justifyContent: 'end', p: 2 }}>
            <Button variant="contained" onClick={handleExportExcel}>
              Xuất Excel
            </Button>
          </Box>
        </Card>
      </Container>
    </HelmetContainer>
  );
}
