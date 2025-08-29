import { defineStore } from "pinia";
import { AxiosDashboard } from "../apis/Dashboard";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    healthServeId: localStorage.getItem("doctor_id") || null,
  }),

  actions: {
    async getLast24HoursOrdersApiCall() {
      const DashboardService = new AxiosDashboard();
      const data = await DashboardService.last24hoursOrdersList(
        this.healthServeId
      );
      return data;
    },
    async getLast30DaysOrdersApiCall() {
      const DashboardService = new AxiosDashboard();
      const data = await DashboardService.last30DaysOrdersList(
        this.healthServeId
      );
      return data;
    },
    async getLast30DaysInvoiceApiCall() {
      const DashboardService = new AxiosDashboard();
      const data = await DashboardService.last30DaysInvoiceList(
        this.healthServeId
      );
      return data;
    },
    async getLast30DaysPaymentApiCall() {
      const DashboardService = new AxiosDashboard();
      const data = await DashboardService.last30DaysPaymentList(
        this.healthServeId
      );
      return data;
    },
    async getComparisionDataApiCall() {
      const DashboardService = new AxiosDashboard();
      const data = await DashboardService.comparisionDataList(
        this.healthServeId
      );
      return data;
    },
  },
});
