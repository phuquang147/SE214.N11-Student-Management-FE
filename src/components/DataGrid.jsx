import { faker } from '@faker-js/faker';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { DATA_GRID_DEFAULT_LOCALE_TEXT } from '~/utils/datagrid-default-locale-text';

export default function DataGridView({ columns, rows, sx, ...other }) {
  const [pageSize, setPageSize] = useState(10);

  return (
    <DataGrid
      getRowId={() => faker.database.mongodbObjectId()}
      //Data
      rows={rows}
      columns={columns}
      //Style
      sx={{
        height: '500px',
        p: 2,
        '& .super-app-theme--cell': {
          padding: '10px',
        },
        '.MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          fontSize: 14,
          color: '#666',
        },
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        ...sx,
      }}
      //Locale text
      localeText={DATA_GRID_DEFAULT_LOCALE_TEXT}
      //Pagination
      pagination
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 20, 30]}
      //Selection
      isRowSelectable={() => false}
      isCellEditable={() => false}
      disableSelectionOnClick
      //
      getRowHeight={() => 60}
      disableColumnMenu
      components={{ Toolbar: GridToolbar }}
      disableDensitySelector
      disableColumnFilter
      getCellClassName={() => 'super-app-theme--cell'}
      componentsProps={{
        pagination: {
          labelRowsPerPage: 'Số dòng trên trang',
        },
        toolbar: {
          showQuickFilter: true,
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      {...other}
    />
  );
}
