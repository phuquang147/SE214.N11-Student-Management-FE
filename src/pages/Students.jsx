import { Box, Button, Card, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActionsMenu from '~/components/ActionsMenu';
import Filters from '~/components/Filters';
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
import { studentFilters } from '~/constants/filters';
import { selectClasses } from '~/redux/infor';
import request from '~/services/request';
import { deleteStudent, getAllStudents } from '~/services/studentRequests';

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
      const student = {
        name,
        phone,
        address,
        className,
        email,
        gender,
        status,
        birthday,
        _id,
        schoolYear: params.row.className.schoolYear,
      };

      return <ActionsMenu object={student} onDelete={params.row.handleDelete} />;
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

    sheet.eachRow({ includeEmpty: true }, function (row) {
      row.border = {
        bottom: { style: 'thin' },
      };
      row.fontSize = 12;
      row.height = 40;
      row.alignment = { vertical: 'middle' };
    });

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `Student.xlsx`);
  };

  return (
    <Container sx={{ pb: 2 }}>
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
          <Box sx={{ display: 'flex', justifyContent: 'end', p: 2 }}>
            <Button variant="contained" onClick={handleExportExcel}>
              Xuất Excel
            </Button>
          </Box>
        </Card>
      )}
    </Container>
  );
}
