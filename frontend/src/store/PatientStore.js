import { defineStore } from 'pinia'
import { AxiosPatient } from '../apis/Patient'

export const usePatientStore = defineStore('patientStore', {
  state: () => ({
    doctorId: localStorage.getItem('doctor_id') || null,
  }),

  actions: {
    async getAllPatientApiCall(currentPage, limit) {
      const PatientService = new AxiosPatient()
      const data = await PatientService.PatientsList(this.doctorId, currentPage, limit)
      return data
    },
    async getPatientDetailsApiCall(patientId) {
      const PatientService = new AxiosPatient()
      const data = await PatientService.PatientDetails(patientId)
      return data
    },
    async addPatientApiCall(payload) {
      const PatientService = new AxiosPatient()
      const data = await PatientService.PatientAdd(this.doctorId, payload)
      return data
    },
    async deletePatientApiCall(patientId) {
      const PatientService = new AxiosPatient()
      const data = await PatientService.PatientDelete(this.doctorId, patientId)
      return data
    },
  },
})
