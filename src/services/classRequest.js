import Cookies from 'js-cookie';
import request from './request';

export const getClasses = async () => {
  const res = await request.get('/classes', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
