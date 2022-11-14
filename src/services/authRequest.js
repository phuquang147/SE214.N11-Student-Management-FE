import request from './request';

export const login = ({ username, password }) => {
  return request.post('/auth/login', {
    username,
    password,
  });
};

export const resetPassword = ({ email }) => {
  return request.post('/auth/reset-password', {
    email,
  });
};

export const changePassword = ({ password, passwordToken, accountId }) => {
  return request.post('/auth/change-password', {
    password,
    passwordToken,
    accountId,
  });
};
