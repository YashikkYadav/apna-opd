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
  AddProfileData(healthServeId, payload) {
    if (!healthServeId) {
      throw new Error("Missing healthServeId in AddProfileData");
    }

    return this.apiClient.post(
      `/${healthServeId}/health-serve-profile/profile-data`,
      payload
    );
  }
  GetProfileData(healthServeId) {
    return this.apiClient.get(
      `/${healthServeId}/health-serve-profile/profile-data`,
    );
  }
}
