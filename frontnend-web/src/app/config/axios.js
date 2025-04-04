import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error || "Something went wrong";
    return Promise.reject(message);
  }
);

export default axiosInstance;
