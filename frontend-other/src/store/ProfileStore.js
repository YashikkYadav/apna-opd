import { defineStore } from 'pinia'
import { AxiosProfile } from '../apis/Profile'

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    doctorId: localStorage.getItem('doctor_id') || null,
  }),

  actions: {
    async getDoctoreProfileApiCall() {
      const ProfileService = new AxiosProfile()
      const data = await ProfileService.DoctorProfileData(this.doctorId)
      return data
    },
    async addDoctoreProfileApiCall(payload) {
      const ProfileService = new AxiosProfile()
      const data = await ProfileService.ProfileAdd(this.doctorId, payload)
      return data
    },
  },
})
