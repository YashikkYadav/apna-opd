import { useUiStore } from '@/store/UiStore';
import axios from 'axios';

class AxiosWrapper {
  axiosInstance;
  uiStore; // Renamed to follow conventions

  constructor(url = `${import.meta.env.VITE_SERVER_URL}/api`) {
    // Initialize the UI store instance
    this.uiStore = useUiStore();

    this.axiosInstance = axios.create({
      baseURL: url,
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    });

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleErrorResponse(error);
        return Promise.reject(error);
      }
    );
  }

  handleErrorResponse(error) {
    let errorMessage ="";
    if(typeof error.response.data === "string"){
      errorMessage = error.response.data;
    }else{
      errorMessage = error.response.data.map((err) => `• ${err.message}`).join("\n");
    }

    if (error.response) {
      const message = 'An error occurred.';
    
      this.uiStore.openNotificationMessage(
        message,
        errorMessage,
        'error'
      );
    } else if (error.request) {
      this.uiStore.openNotificationMessage(
        'No response from the server.',
        error.request.response || '',
        'error'
      );
    } else {
      this.uiStore.openNotificationMessage(
        'Something went wrong! Please try again later',
        '',
        'error'
      );
    }
  }

  get(url, config) {
    return this.axiosInstance.get(url, config).then((response) => response.data);
  }

  post(url, data, config) {
    return this.axiosInstance.post(url, data, config).then((response) => response.data);
  }

  put(url, data, config) {
    return this.axiosInstance.put(url, data, config).then((response) => response.data);
  }

  patch(url, data, config) {
    return this.axiosInstance.patch(url, data, config).then((response) => response.data);
  }

  delete(url, config) {
    return this.axiosInstance.delete(url, config).then((response) => response.data);
  }
}

export default AxiosWrapper;
