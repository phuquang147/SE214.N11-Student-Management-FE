import { Card, Stack, Typography } from '@mui/material';
import DataGridView from '~/components/DataGrid';
import { convertArrayToObjectKeys } from '~/utils/convert-scores';

export const commonConfig = {
  headerClassName: 'header',
  width: 40,
  type: 'number',
  align: 'center',
  max: 10,
  min: 0,
};

export const columns = (editable) => [
  {
    field: 'name',
    headerClassName: 'header',
    width: 180,
    editable: false,
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
  //mieng
  {
    field: 'oral1',
    ...commonConfig,
    editable,
  },
  {
    field: 'oral2',
    ...commonConfig,
    editable,
  },
  {
    field: 'oral3',
    ...commonConfig,
    editable,
  },
  {
    field: 'oral4',
    ...commonConfig,
    editable,
  },
  {
    field: 'oral5',
    ...commonConfig,
    editable,
  },
  //15p
  {
    field: 'm151',
    ...commonConfig,
    editable,
  },
  {
    field: 'm152',
    ...commonConfig,
    editable,
  },
  {
    field: 'm153',
    ...commonConfig,
    editable,
  },
  {
    field: 'm154',
    ...commonConfig,
    editable,
  },
  {
    field: 'm155',
    ...commonConfig,
    editable,
  },
  //1 tiet
  {
    field: 'm451',
    ...commonConfig,
    editable,
  },
  {
    field: 'm452',
    ...commonConfig,
    editable,
  },
  {
    field: 'm453',
    ...commonConfig,
    editable,
  },
  {
    field: 'm454',
    ...commonConfig,
    editable,
  },
  {
    field: 'm455',
    ...commonConfig,
    editable,
  },
  //cuoi ky
  {
    field: 'final',
    ...commonConfig,
    editable,
    width: 80,
  },
  //trung binh
  {
    field: 'average',
    ...commonConfig,
    width: 100,
    editable: false,
  },
];

export const columnGroupingModel = [
  {
    groupId: 'Họ và tên',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    children: [{ field: 'name' }],
  },
  {
    groupId: 'Điểm miệng',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    children: [{ field: 'oral1' }, { field: 'oral2' }, { field: 'oral3' }, { field: 'oral4' }, { field: 'oral5' }],
  },
  {
    groupId: 'Điểm 15 phút',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    children: [{ field: 'm151' }, { field: 'm152' }, { field: 'm153' }, { field: 'm154' }, { field: 'm155' }],
  },
  {
    groupId: 'Điểm 1 tiết',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    children: [{ field: 'm451' }, { field: 'm452' }, { field: 'm453' }, { field: 'm454' }, { field: 'm455' }],
  },
  {
    groupId: 'Cuối kỳ',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    children: [{ field: 'final' }],
  },
  {
    groupId: 'Trung bình',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    children: [{ field: 'average' }],
  },
];

export default function ScoresTable({ studentScores, processRowUpdate }) {
  return (
    <Card
      sx={{
        width: '100%',
        '& .header': {
          display: 'none !important',
        },
        '& .ho-ten': {
          backgroundColor: 'rgba(32, 101, 209, 0.04)',
          justifyContent: 'center !important',
        },
        '& .diem-mieng': {
          backgroundColor: 'rgba(32, 101, 209, 0.08)',
        },
        '& .muoi-lam-phut': {
          backgroundColor: 'rgba(32, 101, 209, 0.12)',
        },
        '& .mot-tiet': {
          backgroundColor: 'rgba(32, 101, 209, 0.16)',
        },
        '& .cuoi-ky': {
          backgroundColor: 'rgba(32, 101, 209, 0.20)',
        },
        '& .trung-binh': {
          backgroundColor: 'rgba(32, 101, 209, 0.24)',
        },
        '& .super-app-theme--header': {
          backgroundColor: '#5e94ca',
          color: 'white',
          '&:first-of-type': {
            borderTopLeftRadius: '8px',
          },
          '&:last-of-type': {
            borderTopRightRadius: '8px',
          },
        },
      }}
    >
      <DataGridView
        rows={convertArrayToObjectKeys(studentScores)}
        columns={columns(true)}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true, columnGrouping: true }}
        columnGroupingModel={columnGroupingModel}
        disableColumnSelector
        sx={{
          '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            border: `1px solid #eee`,
          },
        }}
      />
    </Card>
  );
}
