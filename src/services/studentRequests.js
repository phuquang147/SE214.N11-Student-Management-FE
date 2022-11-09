import Cookies from 'js-cookie';
import request from './request';

export const createStudent = async (student) => {
  const res = await request.post('/students', student, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res.data;
};

export const updateStudent = async (student, studentId) => {
  const res = await fetch(`http://localhost:3001/students/${studentId}`, {
    method: 'PUT',
    body: JSON.stringify(student),
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};
