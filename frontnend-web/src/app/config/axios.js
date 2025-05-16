import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.apnaopd.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("API Error:", error.response?.data || error.message || error);
    const message = error.response?.data || error.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export default axiosInstance;
