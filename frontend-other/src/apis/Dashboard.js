import axiosAuthenticator from "@/plugins/axios";

export class AxiosDashboard {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  last24hoursEnquiryList(healthServeId) {
    return this.apiClient.get(`/${healthServeId}/enquiry/24hours`);
  }

  last30DaysEnquiryList(healthServeId) {
    return this.apiClient.get(`/${healthServeId}/enquiry/30days`);
  }

  last30DaysInvoiceList(doctorId) {
    return this.apiClient.get(`/${doctorId}/report/invoice/12months`);
  }

  last30DaysPaymentList(doctorId) {
    return this.apiClient.get(`/${doctorId}/report/payment/12months`);
  }

  comparisionDataList(doctorId) {
    return this.apiClient.get(`/${doctorId}/report/comparison`);
  }
}
