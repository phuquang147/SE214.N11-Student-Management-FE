import { Avatar, Chip, Stack, Typography } from '@mui/material';
// import { useDispatch } from 'react-redux';
import ActionsMenu from './ActionsMenu';
// import * as SagaActionTypes from '~/redux/constants/constantSaga';
import Table from '../Table';

const columns = [
  {
    field: 'name',
    headerName: 'Tên học sinh',
    minWidth: 200,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={row.name} src={row.avatar} />
          <Typography variant="subtitle2" noWrap>
            {row.name}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
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
    minWidth: 150,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    minWidth: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 150,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    minWidth: 150,
  },
  {
    field: 'status',
    headerName: 'Tình trạng',
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
    sortable: false,
    hideable: false,
    filterable: false,
    renderCell: (params) => {
      const { row } = params;
      return <ActionsMenu />;
    },
  },
];

export default function TableStudents({ data }) {
  // const dispatch = useDispatch();

  const handleDelete = (student) => {
    // dispatch({
    //   type: SagaActionTypes.DELETE_PROPERTY_SAGA,
    //   propertyId: property.id,
    // });
  };

  const modifiedRows = data.map((element) => {
    return {
      ...element,
      handleDelete: handleDelete,
    };
  });

  return <Table columns={columns} rows={modifiedRows} />;
}
