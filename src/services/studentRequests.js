import Cookies from 'js-cookie';
import request from './request';

export const getAllStudents = async () => {
  const res = await request.get('/students', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  console.log(res.data);
  return res.data;
};

export const createStudent = async (student) => {
  const res = await request.post('/students', student, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res.data;
};

export const updateStudent = async (student, studentId) => {
  const res = await request.put(`/students/${studentId}`, student, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  const data = res.data;
  console.log(data);
  return data;
};

export const deleteStudent = async (studentId) => {
  const res = await request.delete(`/students/${studentId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  const data = res.data;
  console.log(data);
  return data;
};
