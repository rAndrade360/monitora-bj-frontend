import axios from 'axios';

const api = axios.create({
  baseURL: 'http://monitora-bj.herokuapp.com',
});

export default api;
