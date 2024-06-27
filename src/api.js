import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Altere para o URL do seu backend
});

export default api;
