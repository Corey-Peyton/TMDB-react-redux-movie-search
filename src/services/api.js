import axios from 'axios';

const api = axios.create({
  baseUrl: 'https://api.themoviedb.org/3/search/movie?api_key=a1279933de606b4374a2c93a1d0127a9&',
});

export default api;