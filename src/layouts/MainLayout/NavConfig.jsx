// component
import Iconify from '~/components/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: getIcon('eva:pie-chart-2-fill'),
    // children: [
    //   {
    //     title: 'user',
    //     path: '/user',
    //   },
    // ],
  },
  {
    title: 'Học sinh',
    path: '/students',
    icon: getIcon('eva:person-fill'),
  },
  {
    title: 'Lớp học',
    path: '/classes',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Điểm số',
    path: '/scores',
    icon: getIcon('carbon:table-split'),
  },
];

export default navConfig;
