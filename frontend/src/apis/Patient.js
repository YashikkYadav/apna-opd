import axiosAuthenticator from "@/plugins/axios";

export class AxiosPatient {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    PatientsList(doctorId, currentPage, limit) {
        return this.apiClient.get(`/patient/get-all/${doctorId}?page=${currentPage}&limit=${limit}`)
    }

    PatientDetails(patientId) {
        return this.apiClient.get(`/patient/${patientId}`)
    }

    PatientAdd(doctorId, payload) {
        return this.apiClient.post(`/patient/${doctorId}`, payload)
    }

    PatientDelete(doctorId, patientId) {
        return this.apiClient.delete(`/patient/${doctorId}/${patientId}`)
    }
}
