import Routes from './routes';
import ScrollToTop from './components/ScrollToTop';
// import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { inforActions } from '~/redux/infor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCommonInfor = async () => {
      try {
        if (!Cookies.get('token')) {
          return;
        }

        const res = await fetch('https://studentapp-be.herokuapp.com/data', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        const data = await res.json();
        const { classes, subjects, role } = data;

        if (res.status === 200) {
          dispatch(inforActions.setCommonInforSuccess({ classes, subjects, role }));
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getCommonInfor();
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes />
      {/* <BaseOptionChartStyle /> */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}
