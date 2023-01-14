import Cookies from 'js-cookie';
import request from './request';

export const updateProfile = async (profile) => {
  const res = await request.put('/profile', profile, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
