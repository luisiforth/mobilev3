// import { EXPO_PUBLIC_API_URL } from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// getDataStorage({ key: '@iforth_login' }).then((result) => {
//   console.log(result);
//   if (result) {
//     const token = JSON.parse(result)?.token;
//     return (api.defaults.headers['Authorization'] = `Bearer ${token}`);
//   }
// });
