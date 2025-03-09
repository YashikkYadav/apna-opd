import { defineStore } from 'pinia'
import { AxiosAppointment } from '../apis/Appointment'

export const useAppointmentStore = defineStore('appointmentStore', {
  state: () => ({
    doctorId: localStorage.getItem('doctor_id') || null,
  }),

  actions: {
    async getAllAppointmentApiCall() {
      const AppointmentService = new AxiosAppointment()
      const data = await AppointmentService.AppointmentsList(this.doctorId)
      return data
    },
    async UpdateAppointmentStatusApiCall(payload) {
      const AppointmentService = new AxiosAppointment()
      const data = await AppointmentService.appointmentUpdateStatus(payload)
      return data
    },
  },
})
