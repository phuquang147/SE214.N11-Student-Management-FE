import Cookies from 'js-cookie';
import request from './request';

export const getScores = async ({ classId, subject, semester, schoolYear }) => {
  return request.get(`/scores?class=${classId}&subject=${subject}&semester=${semester}&schoolYear=${schoolYear}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
};

export const getAllScores = async () => {
  return request.get('/scores/all', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
};

export const updateScore = async ({ classScoreId, studentId, scores }) => {
  return request.patch(
    '/scores',
    { classScoreId, studentId, scores },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
};
