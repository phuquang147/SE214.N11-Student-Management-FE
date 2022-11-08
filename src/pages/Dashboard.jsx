import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { inforActions } from '~/redux/infor';
// @mui
import { Container, Typography } from '@mui/material';

export default function Dashboard() {
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
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back
      </Typography>
    </Container>
  );
}
