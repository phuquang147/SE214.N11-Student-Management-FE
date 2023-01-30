import { Chip, Stack, Typography } from '@mui/material';
import ActionsMenu from '~/components/ActionsMenu';

export const studentColumns = [
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
    field: 'type',
    headerName: 'Học lực',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 120,
    renderCell: (params) => {
      const { row } = params;

      let color;
      switch (row.type) {
        case 'Giỏi':
          color = 'success';
          break;
        case 'Khá':
          color = 'primary';
          break;
        case 'Trung bình':
          color = 'secondary';
          break;
        case 'Yếu':
          color = 'warning';
          break;
        case 'Kém':
          color = 'error';
          break;
        default:
          break;
      }

      if (row.type) {
        return (
          <Chip
            label={row.type}
            color={color}
            sx={{
              bgcolor: `${color}.light`,
              color: `${color}.dark`,
              fontSize: '13px',
              fontWeight: 'bold',
              width: '130px',
            }}
          />
        );
      }

      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap>Chưa xét</Typography>
        </Stack>
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
      const { name, phone, address, className, email, gender, status, conduct, birthday, _id } = params.row;
      const student = {
        name,
        phone,
        address,
        className,
        email,
        gender,
        status,
        conduct,
        birthday,
        _id,
        schoolYear: params.row.className.schoolYear,
      };

      return <ActionsMenu object={student} onDelete={params.row.handleDelete} />;
    },
  },
];
