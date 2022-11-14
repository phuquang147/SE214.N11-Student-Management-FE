// @mui
import { Container, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { inforActions } from '~/redux/infor';
import * as commonDataRequest from '~/services/commonDataRequest';

export default function Dashboard() {
  const dispatch = useDispatch();

  const token = Cookies.get('token');

  useEffect(() => {
    const getCommonData = async () => {
      if (token) {
        try {
          const { data, status } = await commonDataRequest.getCommonData();
          const { classes, subjects, role, semesters } = data;
          console.log(classes);
          if (status === 200) {
            dispatch(inforActions.setCommonInforSuccess({ classes, subjects, role, semesters }));
          }
        } catch (err) {
          toast.error('Đã xảy ra lỗi! Vui lòng tải lại trang');
        }
      }
    };

    getCommonData();
  }, [token, dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back
      </Typography>
    </Container>
  );
}
