// @mui
import { Container, Skeleton, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import * as commonDataRequest from '~/services/commonDataRequest';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inforActions, selectUser } from '~/redux/infor';
import { toast } from 'react-toastify';
import HelmetContainer from '~/HOC/HelmetContainer';

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loaded, setLoaded] = useState(user.hasOwnProperty());

  const token = Cookies.get('token');

  useEffect(() => {
    const getCommonData = async () => {
      if (token) {
        try {
          const { data, status } = await commonDataRequest.getCommonData();
          const { classes, subjects, semesters, grades, user } = data;
          if (status === 200) {
            dispatch(inforActions.setCommonInforSuccess({ classes, subjects, semesters, grades, user }));
            setLoaded(true);
          }
        } catch (err) {
          toast.error('Đã xảy ra lỗi! Vui lòng tải lại trang');
        }
      }
    };

    getCommonData();

    // if (token || user.hasOwnProperty()) {
    //   setLoaded(true);
    // }
  }, [dispatch, token]);

  if (!loaded) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: '16px' }} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px', mt: 2 }} />
      </>
    );
  }

  return (
    <HelmetContainer title="Dashboard | Student Management">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      </Container>
    </HelmetContainer>
  );
}
