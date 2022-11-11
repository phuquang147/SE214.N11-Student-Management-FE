import Cookies from 'js-cookie';
import request from './request';

export const getCommonData = () => {
  return request.get(`/data`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
};
