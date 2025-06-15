import axiosAuthenticator from "@/plugins/axios";

export class AxiosProfile {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  HealthServeProfileData(healthServeId) {
    return this.apiClient.get(`/${healthServeId}/health-serve-profile`);
  }

  ProfileAdd(healthServeId, payload) {
    return this.apiClient.post(
      `/${healthServeId}/health-serve-profile`,
      payload
    );
  }

  DeleteImage(healthServeId, image) {
    return this.apiClient.delete(
      `/${healthServeId}/health-serve-profile/delete-image`,
      { data: image }
    );
  }
}
