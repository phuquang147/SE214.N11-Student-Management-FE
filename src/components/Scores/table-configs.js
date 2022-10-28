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
    editable,
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
    headerClassName: 'ho-ten',
    children: [{ field: 'name' }],
  },
  {
    groupId: 'Điểm miệng',
    headerClassName: 'diem-mieng',
    children: [{ field: 'oral1' }, { field: 'oral2' }, { field: 'oral3' }, { field: 'oral4' }, { field: 'oral5' }],
  },
  {
    groupId: 'Điểm 15 phút',
    headerClassName: 'muoi-lam-phut',
    children: [{ field: 'm151' }, { field: 'm152' }, { field: 'm153' }, { field: 'm154' }, { field: 'm155' }],
  },
  {
    groupId: 'Điểm 1 tiết',
    headerClassName: 'mot-tiet',
    children: [{ field: 'm451' }, { field: 'm452' }, { field: 'm453' }, { field: 'm454' }, { field: 'm455' }],
  },
  {
    groupId: 'Cuối kỳ',
    headerClassName: 'cuoi-ky',
    children: [{ field: 'final' }],
  },
  {
    groupId: 'Trung bình',
    headerClassName: 'trung-binh',
    children: [{ field: 'average' }],
  },
];