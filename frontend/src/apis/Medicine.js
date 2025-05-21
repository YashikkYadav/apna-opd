import axiosAuthenticator from "@/plugins/axios";

export class AxiosMedicine {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    MedicinesList(doctorId) {
        return this.apiClient.get(`/${doctorId}/medicine`)
    }

    MedicineAdd(doctorId, payload) {
        return this.apiClient.post(`/${doctorId}/medicine`, payload)
    }

    MedicineDelete(doctorId, medicineId) {
        return this.apiClient.delete(`/${doctorId}/medicine/${medicineId}`)
    }
}
