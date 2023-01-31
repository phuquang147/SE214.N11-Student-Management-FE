import Cookies from 'js-cookie';
import request from './request';

export const getStatistics = async () => {
  const res = await request.get('/statistics', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const getStatisticsByYear = async ({ year }) => {
  console.log(year);
  const res = await request.post(
    '/statisticsByYear',
    { year },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};
