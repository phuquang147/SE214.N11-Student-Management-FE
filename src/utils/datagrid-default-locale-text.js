export const DATA_GRID_DEFAULT_LOCALE_TEXT = {
  // Root
  noRowsLabel: 'Hiện tại chưa có dữ liệu',
  noResultsOverlayLabel: 'Không có kết quả nào được tìm thấy',
  errorOverlayDefaultLabel: 'Đã có lỗi xảy ra',

  // Columns selector toolbar button text
  toolbarColumns: 'Cột',
  toolbarColumnsLabel: 'Chọn các cột để hiển thị',

  // Filters toolbar button text
  toolbarFilters: 'Bộ lọc',
  toolbarFiltersLabel: 'Hiện bộ lọc',
  toolbarFiltersTooltipHide: 'Ẩn bộ lọc',
  toolbarFiltersTooltipShow: 'Hiện bộ lọc',
  toolbarFiltersTooltipActive: (count) => (count !== 1 ? `Đã sử dụng ${count} bộ lọc` : `Đã sử dụng ${count} bộ lọc`),

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Tìm kiếm…',
  toolbarQuickFilterLabel: 'Tìm kiếm',
  toolbarQuickFilterDeleteIconLabel: 'Clear',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Tìm cột',
  columnsPanelTextFieldPlaceholder: 'Tiêu đề cột',
  columnsPanelShowAllButton: 'Hiện tất cả',
  columnsPanelHideAllButton: 'Ẩn tất cả',

  // Filter panel text
  filterPanelOperators: 'Toán tử so sánh',
  filterPanelColumns: 'Cột',
  filterPanelInputLabel: 'Giá trị',
  filterPanelInputPlaceholder: 'Giá trị lọc',

  // Filter operators text
  filterOperatorContains: 'Chứa',
  filterOperatorEquals: 'Bằng',
  filterOperatorStartsWith: 'Bắt đầu với',
  filterOperatorEndsWith: 'Kết thúc với',
  filterOperatorIsEmpty: 'Rỗng',
  filterOperatorIsNotEmpty: 'Không rỗng',
  filterOperatorIsAnyOf: 'Là bất kì',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Hiện cột',
  columnMenuFilter: 'Bộ lọc',
  columnMenuHideColumn: 'Ẩn cột',
  columnMenuUnsort: 'Không sắp xếp',
  columnMenuSortAsc: 'Sắp xếp tăng dần',
  columnMenuSortDesc: 'Sắp xếp giảm dần',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => `Đã sử dụng ${count} bộ lọc`,
  columnHeaderSortIconLabel: 'Sắp xếp',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} của ${totalCount.toLocaleString()}`,
};
