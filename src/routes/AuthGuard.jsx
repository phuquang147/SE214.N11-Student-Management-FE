// import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
import MainLayout from '~/layouts/MainLayout';

const Auth = () => {
  // let token = Cookies.get("token");
  // if (token) return true;
  return true;
};

const AuthGuard = () => {
  let isAuth = Auth();
  return isAuth ? <MainLayout /> : <Navigate to="/login" />;
};

export default AuthGuard;
