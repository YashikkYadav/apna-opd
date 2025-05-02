import axiosAuthenticator from "@/plugins/axios";

export class AxiosProfile {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  DoctorProfileData(doctorId) {
    return this.apiClient.get(`/${doctorId}/patient/doctor-profile`);
  }

  ProfileAdd(doctorId, payload) {
    return this.apiClient.post(`/${doctorId}/doctor-profile`, payload);
  }

  PatientData(doctorId) {
    return this.apiClient.get(`/${doctorId}/doctor-profile/get-patients`);
  }

  ChatMessages(doctorPatientId) {
    return this.apiClient.get(`/${doctorPatientId}/get-messages`);
  }

  DeleteImage(doctorId, imageObject) {
    return this.apiClient.delete(`/${doctorId}/doctor-profile/delete-image`, {
      data: imageObject,
    });
  }
}
