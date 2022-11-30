import Cookies from 'js-cookie';
import request from './request';

export const getTeachers = async () => {
  const res = await request.get('/teachers', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const getAvailableTeacher = async () => {
  const res = await request.get('/teachers?classes=empty', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const getTeachersBySubjectAndClass = async (querySubjectId, queryClassId) => {
  const res = await request.get(`/teachers?${querySubjectId}&${queryClassId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
