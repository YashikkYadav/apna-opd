import axiosAuthenticator from "@/plugins/axios";

export class AxiosPatient {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  PatientsList(doctorId, currentPage, limit, search) {
    return this.apiClient.get(
      `/patient/get-all/${doctorId}?page=${currentPage}&limit=${limit}&searchQuery=${search}`
    );
  }

  PatientDetails(patientId) {
    return this.apiClient.get(`/patient/${patientId}`);
  }

  PatientAdd(doctorId, payload) {
    return this.apiClient.post(`/patient/${doctorId}`, payload);
  }

  PatientUpdate(doctorId, payload) {
    return this.apiClient.put(`/patient/${doctorId}`, payload);
  }

  PatientDelete(doctorId, patientId) {
    return this.apiClient.delete(`/patient/${doctorId}/${patientId}`);
  }

  DeletePrescription(doctorId, patientId, prescription) {
    return this.apiClient.delete(
      `/patient/${doctorId}/${patientId}/delete-prescription`,
      {
        data: prescription,
      }
    );
  }

  GetAppointments(doctorId) {
    return this.apiClient.get(`/patient/${patientId}/appointmet`);
  }
}
