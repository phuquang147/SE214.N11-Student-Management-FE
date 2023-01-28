import Cookies from 'js-cookie';
import request from './request';

export const getRegulations = async () => {
  const res = await request.get('/regulations', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const createRegulation = async (regulation) => {
  const res = await request.post('/regulations', regulation, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const updateRegulation = async (regulationId, regulation) => {
  const res = await request.put(`/regulations/${regulationId}`, regulation, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
