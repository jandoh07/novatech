import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const customAxios = axios.create({
  baseURL: apiUrl,
    withCredentials: true,
});
