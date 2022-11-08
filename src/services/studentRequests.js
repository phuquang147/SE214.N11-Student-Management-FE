import Cookies from 'js-cookie';
import request from './request';

export const createStudent = async (student) => {
  const res = await request.post('/students', student, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  console.log(res.data);
};
