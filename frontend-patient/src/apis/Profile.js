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

  GetDoctors(doctorId) {
    return this.apiClient.get(`/patient/${doctorId}/get-doctors`);
  }

  ChatMessages(doctorPatientId) {
    return this.apiClient.get(`/${doctorPatientId}/get-messages`);
  }

  Appointments(doctorId) {
    return this.apiClient.get(`/patient/${doctorId}/appointment`);
  }
}
