import { defineStore } from 'pinia'
import { AxiosPrescription } from '../apis/Prescription'

export const usePrescriptionStore = defineStore('prescriptionStore', {
  state: () => ({
    doctorId: localStorage.getItem('doctor_id') || null,
  }),

  actions: {
    async getHealthFileApiCall(patientId) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.HealthFile(patientId)
      return data
    },
    async getIpdFileApiCall(patientId) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.IpdFile(patientId)
      return data
    },
    async getPrescriptionFileApiCall(patientId) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.PrescriptionFile(patientId)
      return data
    },
    async getPrescriptionSectionsApiCall() {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.PrescriptionSections(this.doctorId)
      return data
    },
    async getDraftPrescriptionApiCall(patientId) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.DraftPrescription(this.doctorId, patientId)
      return data
    },
    async uploadFileApiCall(patientId, payload) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.UploadFile(patientId, payload)
      return data
    },
  },
})
