import axiosAuthenticator from "@/plugins/axios";

export class AxiosDoctor {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  Doctor(adminId) {
    return this.apiClient.get(`/admin/${adminId}/doctor`);
  }

  Register(payload) {
    return this.apiClient.post(`/doctor`, payload);
  }
}
