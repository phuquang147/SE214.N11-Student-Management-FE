import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
// import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// components
import { toast, ToastContainer } from 'react-toastify';
import * as commonDataRequest from '~/services/commonDataRequest';
import ScrollToTop from './components/ScrollToTop';
import Routes from './routes';
// actions
import { inforActions } from '~/redux/infor';

export default function App() {
  const dispatch = useDispatch();

  const token = Cookies.get('token');

  useEffect(() => {
    const getCommonData = async () => {
      if (token) {
        try {
          const { data, status } = await commonDataRequest.getCommonData();
          const { classes, subjects, roles, role, semesters, grades, user } = data;
          if (status === 200) {
            dispatch(inforActions.setCommonInforSuccess({ classes, subjects, semesters, grades, roles, role, user }));
          }
        } catch (err) {
          toast.error('Đã xảy ra lỗi! Vui lòng tải lại trang');
        }
      }
    };

    getCommonData();
  }, [token, dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes />
      {/* <BaseOptionChartStyle /> */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}
