import axiosAuthenticator from "@/plugins/axios";

export class AxiosInvoice {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    InvoicesList(doctorId) {
        return this.apiClient.get(`/${doctorId}/invoice`)
    }

    InvoicesAdd(doctorId, payload) {
        return this.apiClient.post(`/${doctorId}/invoice`, payload)
    }

    InvoicesEdit(doctorId, invoiceId, payload) {
        return this.apiClient.post(`/${doctorId}/invoice/${invoiceId}`, payload)
    }

    InvoicesDelete(doctorId, invoiceId) {
        return this.apiClient.delete(`/${doctorId}/invoice/${invoiceId}`)
    }
}
