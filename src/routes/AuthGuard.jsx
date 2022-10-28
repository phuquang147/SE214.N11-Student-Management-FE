import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import MainLayout from '~/layouts/MainLayout';

const Auth = () => {
  const token = Cookies.get('token');
  if (token) return true;
  return false;
};

const AuthGuard = () => {
  let isAuth = Auth();
  return isAuth ? (
    <MainLayout />
  ) : (
    <Navigate to="/login" state={{ message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' }} />
  );
};

export default AuthGuard;
