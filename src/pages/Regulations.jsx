import { Button, Card, Container, IconButton, Stack, Typography } from '@mui/material';
import Iconify from '~/components/Iconify';
import { useEffect, useState } from 'react';
import Table from '~/components/Table';
import { getRegulations } from '~/services/regulationsRequest';
import { toast } from 'react-toastify';
import RegulationsModal from '~/components/Regulations/RegulationsModal';
import HelmetContainer from '~/HOC/HelmetContainer';

const columns = [
  {
    field: 'name',
    headerName: 'Quy định',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
    flex: 1,
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
    field: 'min',
    headerName: 'Giá trị tối thiểu',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap>{row.min}</Typography>
        </Stack>
      );
    },
  },

  {
    field: 'birthdate',
    headerName: 'Giá trị tối đa',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap>{row.max}</Typography>
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
      const { _id, handleUpdate } = params.row;
      return (
        <IconButton onClick={() => handleUpdate(_id)}>
          <Iconify icon="material-symbols:edit-square-outline" />
        </IconButton>
      );
    },
  },
];

function Regulations() {
  const [regulations, setRegulations] = useState([]);
  const [selectedRegulation, setSelectedRegulation] = useState();
  const [isOpened, setIsOpened] = useState(false);

  const getAllRegulations = async () => {
    try {
      const res = await getRegulations();
      if (res.status === 200) {
        setRegulations(res.data.regulations);
        console.log(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllRegulations();
  }, []);

  const handleDelete = () => {
    console.log('delete');
  };

  const handleShowModal = () => {
    setIsOpened(true);
  };

  const handleCloseModal = () => {
    setIsOpened(false);
    setSelectedRegulation(null);
  };

  const handleUpdateRegulation = (id) => {
    const currentRegulation = regulations.find((regulation) => regulation._id === id);
    setSelectedRegulation(currentRegulation);
    setIsOpened(true);
  };

  return (
    <HelmetContainer title="Quy định | Student Management App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
          <Typography variant="h4">Quy định</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleShowModal}>
            Thêm quy định
          </Button>
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
          <Table data={regulations} columns={columns} onDelete={handleDelete} onUpdate={handleUpdateRegulation} />
        </Card>
      </Container>
      {isOpened && (
        <RegulationsModal
          isOpen={isOpened}
          regulation={selectedRegulation}
          onClose={handleCloseModal}
          onReload={getAllRegulations}
          onUpdate={handleUpdateRegulation}
        />
      )}
    </HelmetContainer>
  );
}

export default Regulations;
