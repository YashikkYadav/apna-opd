import axiosAuthenticator from "@/plugins/axios";
import { he } from "vuetify/locale";

export class AxiosDashboard {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  last24hoursOrdersList(healthServeId) {
    return this.apiClient.get(`/${healthServeId}/orders/24hours`);
  }

  last30DaysOrdersList(healthServeId) {
    return this.apiClient.get(`/${healthServeId}/orders/30days`);
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
