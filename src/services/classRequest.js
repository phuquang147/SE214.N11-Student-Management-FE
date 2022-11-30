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

export const createClass = async (_class) => {
  const res = await request.post('/classes', _class, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const updateClass = async (_class) => {
  const res = await request.put(`/classes/${_class.id}`, _class, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const deleteClass = async (classId) => {
  const res = await request.delete(`/classes/${classId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
