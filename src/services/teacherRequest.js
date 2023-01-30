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

export const getAvailableTeachers = async ({
  subjectId,
  dayOfWeek,
  startPeriod,
  endPeriod,
  schoolYear,
  semesterId,
}) => {
  const res = await request.post(
    '/available-teachers',
    {
      subjectId,
      dayOfWeek,
      startPeriod,
      endPeriod,
      schoolYear,
      semesterId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
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

export const updateTeacher = async (teacher, teacherId) => {
  const res = await request.put(`/teachers/${teacherId}`, teacher, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const createTeacher = async (teacher) => {
  const res = await request.post('/teachers', teacher, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const deleteTeacher = async (teacherId) => {
  const res = await request.delete(`/teachers/${teacherId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
