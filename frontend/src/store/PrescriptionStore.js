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
    async addPrescriptionSectionsApiCall(payload) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.AddPrescriptionSections(this.doctorId, payload)
      return data
    },
    async getDraftPrescriptionApiCall(patientId) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.DraftPrescription(this.doctorId, patientId)
      return data
    },
    async savePrescriptionApiCall(patientId, payload) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.SavePrescription(this.doctorId, patientId, payload)
      return data
    },
    async endConsultationApiCall(patientId, payload) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.EndConsultation(this.doctorId, patientId, payload)
      return data
    },
    async uploadFileApiCall(patientId, payload) {
      const PrescriptionService = new AxiosPrescription()
      const data = await PrescriptionService.UploadFile(patientId, payload)
      return data
    },
  },
})
