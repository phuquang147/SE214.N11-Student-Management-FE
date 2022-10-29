import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Routes from './routes';
import ScrollToTop from './components/ScrollToTop';
import request from './services/request';
import { inforActions } from './redux/infor';
// import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCommonInfor = async () => {
      const res = await request.get('/data');
      const { classes, subjects, role } = res.data;
      const subjectsName = subjects.map((subject) => subject.name);
      const classesName = classes.map((_class) => _class.name);

      if (res.status === 200) {
        dispatch(inforActions.setCommonInfor({ classes: classesName, subjects: subjectsName, role }));
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
