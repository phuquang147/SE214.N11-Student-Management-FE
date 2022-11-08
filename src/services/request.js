import axios from 'axios';

const request = axios.create({
  baseURL: 'https://studentapp-be.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
