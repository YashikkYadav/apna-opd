import axiosAuthenticator from "@/plugins/axios";

export class AxiosAppointment {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    AppointmentsList(doctorId) {
        return this.apiClient.get(`/appointment/${doctorId}/get-upcoming-appointments`)
    }

    appointmentUpdateStatus(payload) {
        return this.apiClient.patch(`/appointment/update-status`, payload)
    }
}
