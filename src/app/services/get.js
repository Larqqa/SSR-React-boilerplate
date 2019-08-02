import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/get';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
};

export default { getAll };