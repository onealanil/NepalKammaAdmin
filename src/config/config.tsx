import axios from "axios";

export const API_URL = "http://192.168.18.206:8000/api/v1";

console.log(localStorage.getItem("currentUser"));

export const axios_auth = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
  },
});

// auth interceptors for axios
axios_auth.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("currentUser");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axios_no_auth = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
