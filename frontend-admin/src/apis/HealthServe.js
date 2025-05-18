import axiosAuthenticator from "@/plugins/axios";

export class AxiosHealthServe {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  HealthServe(adminId, type) {
    return this.apiClient.get(`/admin/${adminId}/${type}/healthServe`);
  }
}
