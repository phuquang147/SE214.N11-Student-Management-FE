import { faker } from '@faker-js/faker';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { DATA_GRID_DEFAULT_LOCALE_TEXT } from '~/utils/datagrid-default-locale-text';
import { darken, lighten } from '@mui/material/styles';

const getBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6));

const getHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5));

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
        '& .super-app-theme--Open': {
          bgcolor: (theme) => getBackgroundColor(theme.palette.info.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) => getHoverBackgroundColor(theme.palette.info.main, theme.palette.mode),
          },
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
      disableSelectionOnClick
      //
      getRowHeight={() => 60}
      disableColumnMenu
      components={{ Toolbar: GridToolbar }}
      disableDensitySelector
      disableColumnFilter
      getCellClassName={() => 'super-app-theme--cell'}
      getRowClassName={(params) => {
        if (params.row.name === other.homeroomClass) {
          return 'super-app-theme--Open';
        }
      }}
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
      onCellDoubleClick={(params) => {
        const { _id, students } = params.row;
        console.log(params.row);
        other.onRowClick(_id, students);
      }}
      onCellClick={(params, event) => {
        event.stopPropagation();
      }}
    />
  );
}
