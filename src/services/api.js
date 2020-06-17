import axios from 'axios';

const api = axios.create({
  baseURL: 'https://monitora-bj.herokuapp.com',
});

export default api;
