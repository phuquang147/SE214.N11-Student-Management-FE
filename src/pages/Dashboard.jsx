// @mui
import { Container, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { inforActions } from '~/redux/infor';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Cookies.get('token')) {
      return;
    }
    dispatch(inforActions.setCommonInforStarted());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back
      </Typography>
    </Container>
  );
}
