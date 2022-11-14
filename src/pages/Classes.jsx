import { Link as RouterLink } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import { selectClasses, selectGrades } from '~/redux/infor';
import Cookies from 'js-cookie';
import request from '~/services/request';
import { useState } from 'react';
import { useEffect } from 'react';

const columns = [
  {
    field: 'className',
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
    field: 'teacher',
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
    renderCell: (params) => {
      return <ActionsMenu />;
    },
  },
];

function Classes() {
  const classes = useSelector(selectClasses);
  const [selectedClasses, setSelectedClasses] = useState(classes);
  const [loading, setLoading] = useState(false);
  const grades = useSelector(selectGrades);

  useEffect(() => {
    setSelectedClasses(classes);
  }, [classes]);

  const handleChangeFilter = async (values) => {
    const { grade, schoolYear } = values;
    const selectedGrade = grades.find((grade) => grade.name === +values.grade);

    const formattedGrade = grade !== undefined && grade !== 'Mọi khối' ? `grade=${selectedGrade._id}` : '';
    const formattedSchoolYear =
      schoolYear !== undefined && schoolYear !== 'Mọi năm học' ? `schoolYear=${schoolYear}` : '';

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
        <Typography variant="h4">Lớp học</Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/classes/new"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Thêm lớp
        </Button>
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
          <Table data={selectedClasses} columns={columns} />
        </Card>
      )}
    </Container>
  );
}

export default Classes;
