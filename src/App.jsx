import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Routes from './routes';
import ScrollToTop from './components/ScrollToTop';
import request from './services/request';
import { inforActions } from './redux/infor';
import Cookies from 'js-cookie';
// import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCommonInfor = async () => {
      try {
        if (!Cookies.get('token')) {
          return;
        }

        const res = await request.get('/data');
        const { classes, subjects, role } = res.data;

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
    </>
  );
}
