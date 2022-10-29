import axios from 'axios';
import Cookies from 'js-cookie';

const request = axios.create({
  baseURL: 'https://studentapp-be.herokuapp.com/',
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
    'Content-Type': 'application/json',
  },
});

export default request;
