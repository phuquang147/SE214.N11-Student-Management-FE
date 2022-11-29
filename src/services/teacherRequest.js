import Cookies from 'js-cookie';
import request from './request';

export const getAvailableTeacher = async () => {
  const res = await request.get('/teachers?classes=empty', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
