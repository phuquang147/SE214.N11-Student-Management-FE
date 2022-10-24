import Dashboard from '~/pages/Dashboard';
// Student
import Students from '~/pages/Students';
import EditStudent from '~/pages/EditStudent';
import NewStudent from '~/pages/NewStudent';
//
import Page404 from '~/pages/Page404';
import Profile from '~/pages/Profile';
import Classes from '~/pages/Classes';

const CommonRoutes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/students',
    element: <Students />,
  },
  {
    path: '/students/new',
    element: <NewStudent />,
  },
  {
    path: '/students/edit/:id',
    element: <EditStudent />,
  },
  {
    path: '/classes',
    element: <Classes />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default CommonRoutes;
