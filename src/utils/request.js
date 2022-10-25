import axios from 'axios';

const request = axios.create({
  baseURL: 'https://studentapp-be.herokuapp.com/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

export default request;
