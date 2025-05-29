import { defineStore } from 'pinia'
import { AxiosInvoice } from '../apis/Invoice'

export const useInvoiceStore = defineStore('invoiceStore', {
  state: () => ({
    doctorId: localStorage.getItem('doctor_id') || null,
  }),

  actions: {
    async getAllInvoicesApiCall() {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesList(this.doctorId)
      return data
    },
    async addInvoiceApiCall(payload) {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesAdd(this.doctorId, payload)
      return data
    },
    async editInvoiceApiCall(invoiceId, payload) {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesEdit(this.doctorId, invoiceId, payload)
      return data
    },

    async deleteInvoiceApiCall(invoiceId) {
      const InvoiceService = new AxiosInvoice()
      const data = await InvoiceService.InvoicesDelete(this.doctorId, invoiceId)
      return data
    },
  },
})
