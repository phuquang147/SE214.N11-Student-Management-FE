import MinimalLayout from '~/layouts/MinimalLayout';
import Login from '~/pages/Login';

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <Login />,
    },
  ],
};

export default AuthenticationRoutes;
