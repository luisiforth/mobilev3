import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// api.interceptors.request.use(async (config) => {
//   const token = await SecureStore.getItemAsync('iforthToken');

//   if (token != '') {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
