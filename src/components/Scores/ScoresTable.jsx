import { Card } from '@mui/material';
import Table from '~/components/Table';
import scores from '~/_mock/scores';
import { columns, columnGroupingModel } from './table-configs';

export default function ScoresTable({ processRowUpdate }) {
  return (
    <Card
      sx={{
        width: '100%',
        '& .header': {
          display: 'none !important',
        },
        '& .ho-ten': {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        },
        '& .diem-mieng': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '& .muoi-lam-phut': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        '& .mot-tiet': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        },
        '& .cuoi-ky': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        '& .trung-binh': {
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <Table
        data={scores}
        columns={columns(false)}
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
