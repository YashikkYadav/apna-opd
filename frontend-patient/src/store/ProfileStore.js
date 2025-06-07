import { defineStore } from "pinia";
import { AxiosProfile } from "../apis/Profile";

export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    doctorId: localStorage.getItem("doctor_id") || null,
  }),

  actions: {
    async getDoctoreProfileApiCall() {
      const ProfileService = new AxiosProfile();
      const data = await ProfileService.DoctorProfileData(this.doctorId);
      return data;
    },
    async addDoctoreProfileApiCall(payload) {
      const ProfileService = new AxiosProfile();
      const data = await ProfileService.ProfileAdd(this.doctorId, payload);
      return data;
    },
    async getDoctors() {
      const ProfileService = new AxiosProfile();
      const data = await ProfileService.GetDoctors(this.doctorId);
      return data;
    },
    async getChatMessages(id) {
      const ProfileService = new AxiosProfile();
      const chatMessageData = await ProfileService.ChatMessages(id);
      return chatMessageData;
    },
    async getAppointments() {
      const profileService = new AxiosProfile();
      const doctorId = this.doctorId;
      const appointments = await profileService.Appointments(doctorId);
      return appointments;
    },
  },
});
