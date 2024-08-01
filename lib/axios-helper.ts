import axios from "axios";
import { APP_CONFIG } from "./config";
import { getAuthToken } from "./utils";

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {axiosInstance};