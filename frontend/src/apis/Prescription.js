import axiosAuthenticator from "@/plugins/axios";

export class AxiosPrescription {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    HealthFile(patientId) {
        return this.apiClient.get(`/${patientId}/file/health`)
    }

    IpdFile(patientId) {
        return this.apiClient.get(`/${patientId}/file/ipd`)
    }

    PrescriptionFile(patientId) {
        return this.apiClient.get(`/${patientId}/file/prescription`)
    }

    PrescriptionSections(doctorId) {
        return this.apiClient.get(`/${doctorId}/prescription-section`)
    }

    AddPrescriptionSections(doctorId, payload) {
        return this.apiClient.post(`/${doctorId}/prescription-section`, payload)
    }

    DraftPrescription(doctorId, patientId) {
        return this.apiClient.get(`/${doctorId}/prescription/${patientId}/draft`)
    }

    SavePrescription(doctorId, patientId, payload) {
        return this.apiClient.post(`/${doctorId}/prescription/${patientId}`, payload)
    }

    EndConsultation(doctorId, patientId, payload) {
        return this.apiClient.post(`/${doctorId}/prescription/${patientId}/end-consultation`, payload)
    }

    UploadFile(patientId, payload) {
        return this.apiClient.post(`/${patientId}/file/upload`, payload)
    }
}
