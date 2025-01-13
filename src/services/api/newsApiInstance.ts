// src/services/api/newsApi.ts
import axios from "axios";

export const createNewsAPI = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
  });

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(`API Error for ${baseURL}:`, error);
      return Promise.reject(error);
    }
  );

  return instance;
};
