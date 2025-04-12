import axiosAuthenticator from "@/plugins/axios";

export class AxiosProfile {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  DoctorProfileData(healthServeId) {
    return this.apiClient.get(`/${healthServeId}/patient/doctor-profile`);
  }

  ProfileAdd(healthServeId, payload) {
    console.log(payload.entries());
    return this.apiClient.post(
      `/${healthServeId}/health-serve-profile`,
      payload
    );
  }
}
