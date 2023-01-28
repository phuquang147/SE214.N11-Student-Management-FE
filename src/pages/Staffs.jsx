import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Card, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material';
// components
import ActionsMenu from '~/components/ActionsMenu';
import Iconify from '~/components/Iconify';
import Table from '~/components/Table';
// mock
// import teachers from '~/_mock/teachers';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteStaff, getStaffs } from '~/services/staffRequest';
import HelmetContainer from '~/HOC/HelmetContainer';

const columns = [
  {
    field: 'name',
    headerName: 'Tên nhân viên',
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
    headerName: 'Mã nhân viên',
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
      if (row.status === 'Đang làm')
        return (
          <Chip
            label="Đang làm"
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
      const { name, phone, address, email, gender, birthday, status, _id, handleDelete } = params.row;
      const staff = {
        name,
        phone,
        address,
        email,
        gender,
        status,
        birthday,
        _id,
      };
      return <ActionsMenu object={staff} onDelete={handleDelete} />;
    },
  },
];

export default function Staffs() {
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);

  const getAllStaffs = async () => {
    try {
      setLoading(true);
      const res = await getStaffs();
      if (res.status === 200) {
        setStaffs(res.data.staffs);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStaffs();
  }, []);

  const handleDelete = async (staffId) => {
    try {
      const res = await deleteStaff(staffId);
      if (res.status === 200) {
        toast.success(res.data.message);
        await getAllStaffs();
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại');
    }
  };

  return (
    <HelmetContainer title="Nhân viên | Student Management App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
          <Typography variant="h4">Nhân viên giáo vụ</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/staffs/new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm nhân viên
          </Button>
        </Stack>

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
            <Table data={staffs} columns={columns} onDelete={handleDelete} />
          </Card>
        )}
      </Container>
    </HelmetContainer>
  );
}
