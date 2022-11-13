import Cookies from 'js-cookie';
import request from './request';

export const getScores = async ({ classId, subject, semester, schoolYear }) => {
  return request.get(`/scores?class=${classId}&subject=${subject}&semester=${semester}&schoolYear=${schoolYear}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
};
