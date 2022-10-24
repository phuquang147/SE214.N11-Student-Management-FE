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
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
