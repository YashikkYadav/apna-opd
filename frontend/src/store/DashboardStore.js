import { defineStore } from 'pinia'
import { AxiosDashboard } from '../apis/Dashboard'

export const useDashboardStore = defineStore('dashboardStore', {
  state: () => ({
    doctorId: localStorage.getItem('doctor_id') || null,
  }),

  actions: {
    async getLast24HoursPatientApiCall() {
      const DashboardService = new AxiosDashboard()
      const data = await DashboardService.last24hoursPatientList(this.doctorId)
      return data
    },
    async getLast30DaysPatientApiCall() {
      const DashboardService = new AxiosDashboard()
      const data = await DashboardService.last30DaysPatientList(this.doctorId)
      return data
    },
    async getLast30DaysInvoiceApiCall() {
      const DashboardService = new AxiosDashboard()
      const data = await DashboardService.last30DaysInvoiceList(this.doctorId)
      return data
    },
    async getLast30DaysPaymentApiCall() {
      const DashboardService = new AxiosDashboard()
      const data = await DashboardService.last30DaysPaymentList(this.doctorId)
      return data
    },
    async getComparisionDataApiCall() {
      const DashboardService = new AxiosDashboard()
      const data = await DashboardService.comparisionDataList(this.doctorId)
      return data
    },
  },
})
