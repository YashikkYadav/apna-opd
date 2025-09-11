import { defineStore } from 'pinia'
import { AxiosInvoice } from '../apis/Invoice'

export const useInvoiceStore = defineStore('invoiceStore', {
  state: () => ({
    medicalId: localStorage.getItem('doctor_id') || null,
  }),

  actions: {
    async getAllInvoicesApiCall() {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesList(this.medicalId)
      return data
    },
    async addInvoiceApiCall(payload) {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesAdd(this.medicalId, payload)
      return data
    },
    async editInvoiceApiCall(invoiceId, payload) {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesEdit(this.medicalId, invoiceId, payload)
      return data
    },

    async updateInvoiceApiCall(invoiceId) {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesUpdate(this.medicalId, invoiceId)
      return data
    },

    async deleteInvoiceApiCall(invoiceId) {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesDelete(this.medicalId, invoiceId)
      return data
    },
  },
})
