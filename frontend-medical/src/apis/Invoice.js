import axiosAuthenticator from "@/plugins/axios";

export class AxiosInvoice {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  InvoicesList(medicalId) {
    return this.apiClient.get(`/${medicalId}/MedicalInvoice`);
  }

  InvoicesAdd(medicalId, payload) {
    return this.apiClient.post(`/${medicalId}/MedicalInvoice`, payload);
  }

  InvoicesEdit(medicalId, invoiceId, payload) {
    return this.apiClient.post(
      `/${medicalId}/MedicalInvoice/${invoiceId}`,
      payload
    );
  }

  InvoicesDelete(medicalId, invoiceId) {
    return this.apiClient.delete(`/${medicalId}/MedicalInvoice/${invoiceId}`);
  }
}
