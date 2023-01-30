import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HOMEROOM_TEACHER, STAFF, SUBJECT_TEACHER } from '~/constants/roles';
import MainLayout from '~/layouts/MainLayout';
import { selectUser } from '~/redux/infor';

const Auth = () => {
  const token = Cookies.get('token');
  if (token) return true;
  return false;
};

const AuthGuard = () => {
  let isAuth = Auth();
  const location = useLocation();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role?.name === SUBJECT_TEACHER || user?.role?.name === HOMEROOM_TEACHER) {
      if (
        location.pathname === '/' ||
        location.pathname === '/staffs' ||
        location.pathname === '/teachers' ||
        location.pathname === '/regulations'
      ) {
        navigate(-1);
        return;
      }
    }

    if (user?.role?.name === STAFF) {
      if (location.pathname === '/scores' || location.pathname === '/regulations') {
        navigate(-1);
        return;
      }
    }
  }, [location.pathname, navigate, user?.role?.name]);

  return isAuth ? (
    <MainLayout />
  ) : (
    <Navigate to="/login" state={{ message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' }} />
  );
};

export default AuthGuard;
