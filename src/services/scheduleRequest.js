import Cookies from 'js-cookie';
import request from './request';

export const getClassSchedule = async ({ classId, semesterId }) => {
  const res = await request.post(
    `/schedule/class/${classId}`,
    { semesterId },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const getTeacherSchedule = async ({ teacherId, schoolYear, semesterId }) => {
  const res = await request.post(
    `/schedule/teacher/${teacherId}`,
    { schoolYear, semesterId },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const addLesson = async ({ scheduleId, subjectId, teacherId, dayOfWeek, startPeriod, endPeriod }) => {
  const res = await request.put(
    `/add-lesson/${scheduleId}`,
    { subjectId, teacherId, dayOfWeek, startPeriod, endPeriod },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const updateLesson = async ({
  scheduleId,
  subjectId,
  teacherId,
  dayOfWeek,
  prevStartPeriod,
  prevEndPeriod,
  startPeriod,
  endPeriod,
}) => {
  const res = await request.put(
    `/update-lesson/${scheduleId}`,
    { subjectId, teacherId, dayOfWeek, prevStartPeriod, prevEndPeriod, startPeriod, endPeriod },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const deleteLesson = async ({ scheduleId, dayOfWeek, startPeriod, endPeriod }) => {
  const res = await request.put(
    `/delete-lesson/${scheduleId}`,
    { dayOfWeek, startPeriod, endPeriod },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};
