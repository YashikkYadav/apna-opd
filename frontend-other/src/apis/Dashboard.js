import axiosAuthenticator from "@/plugins/axios";

export class AxiosDashboard {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    last24hoursPatientList(doctorId) {
        return this.apiClient.get(`/${doctorId}/enquiry/24hours`)
    }

    last30DaysPatientList(doctorId) {
        return this.apiClient.get(`/${doctorId}/enquiry/30days`)
    }

    last30DaysInvoiceList(doctorId) {
        return this.apiClient.get(`/${doctorId}/report/invoice/12months`)
    }

    last30DaysPaymentList(doctorId) {
        return this.apiClient.get(`/${doctorId}/report/payment/12months`)
    }

    comparisionDataList(doctorId) {
        return this.apiClient.get(`/${doctorId}/report/comparison`)
    }
}
