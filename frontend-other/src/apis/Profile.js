import axiosAuthenticator from "@/plugins/axios";

export class AxiosProfile {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    DoctorProfileData(doctorId) {
        return this.apiClient.get(`/${doctorId}/patient/doctor-profile`)
    }

    ProfileAdd(doctorId, payload) {
        return this.apiClient.post(`/${doctorId}/doctor-profile`, payload)
    }
}
