import Dashboard from '~/pages/Dashboard';
// Student
import EditStudent from '~/pages/EditStudent';
import NewStudent from '~/pages/NewStudent';
import Students from '~/pages/Students';
// Class
import Classes from '~/pages/Classes';
import EditClass from '~/pages/EditClass';
import NewClass from '~/pages/NewClass';
// Score
import Scores from '~/pages/Scores';
// Profile
import Profile from '~/pages/Profile';
// Teacher
import EditTeacher from '~/pages/EditTeacher';
import NewTeacher from '~/pages/NewTeacher';
import Teachers from '~/pages/Teachers';
// Schedule
import Schedule from '~/pages/Schedule';
//
import Page404 from '~/pages/Page404';
import Staffs from '~/pages/Staffs';
import NewStaff from '~/pages/NewStaff';
import EditStaff from '~/pages/EditStaff';

const CommonRoutes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  // Student
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
  // Class
  {
    path: '/classes',
    element: <Classes />,
  },
  {
    path: '/classes/new',
    element: <NewClass />,
  },
  {
    path: '/classes/edit/:id',
    element: <EditClass />,
  },
  // Score
  {
    path: '/scores',
    element: <Scores />,
  },
  // Teacher
  {
    path: '/teachers',
    element: <Teachers />,
  },
  {
    path: '/teachers/new',
    element: <NewTeacher />,
  },
  {
    path: '/teachers/edit/:id',
    element: <EditTeacher />,
  },
  // Staffs
  {
    path: '/staffs',
    element: <Staffs />,
  },
  {
    path: '/staffs/new',
    element: <NewStaff />,
  },
  {
    path: '/staffs/edit/:id',
    element: <EditStaff />,
  },
  // Schedule
  {
    path: '/schedule',
    element: <Schedule />,
  },
  //
  {
    path: '*',
    element: <Page404 />,
  },
];

export default CommonRoutes;
