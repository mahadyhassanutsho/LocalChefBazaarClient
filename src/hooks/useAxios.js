import axios from "axios";
import { useEffect } from "react";

import useAuth from "../hooks/useAuth";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

const useAxios = () => {
  const { user } = useAuth();

  useEffect(() => {
    const reqInterceptor = (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    };

    axiosInstance.interceptors.request.use(reqInterceptor);

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxios;
