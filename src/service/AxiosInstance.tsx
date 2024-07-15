  import axios from 'axios';
  import { BASE_URL_APP } from '../utils';

  // Create a new Axios instance with default configuration
  export const axiosInstance = axios.create({
    baseURL: BASE_URL_APP,
  
  });
const token = localStorage.getItem("userid")

  // Set a default userid for every request
  axiosInstance.interceptors.request.use((config) => {


      // Add userid to the request data
      config.data = {
        ...config.data,
        userid:token,
      };
      return config;
    });

