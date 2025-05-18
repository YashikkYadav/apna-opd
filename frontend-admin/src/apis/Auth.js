import axiosAuthenticator from "@/plugins/axios";

export class AxiosAuth {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  Login(payload) {
    return this.apiClient.post(`/admin/login`, payload);
  }

  Register(payload) {
    return this.apiClient.post(`/doctor`, payload);
  }
}
