import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nyc-ttp-stocks-api.herokuapp.com',
  withCredentials: true
})

export default api