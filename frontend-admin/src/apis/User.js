import axiosAuthenticator from "@/plugins/axios";

export class AxiosUser {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  User(adminId) {
    return this.apiClient.get(`/admin/${adminId}/user`);
  }

  Detail(adminId, userId) {
    return this.apiClient.get(`/admin/${adminId}/user/${userId}`);
  }

  Register(payload) {
    return this.apiClient.post(`/user/create`, payload);
  }
}
