import Cookies from 'js-cookie';
import request from './request';

export const getStaffs = async () => {
  const res = await request.get('/staffs', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const createStaff = async (staff) => {
  const res = await request.post('/staffs', staff, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const updateStaff = async (staff, staffId) => {
  const res = await request.put(`/staffs/${staffId}`, staff, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const deleteStaff = async (staffId) => {
  const res = await request.delete(`/staffs/${staffId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
