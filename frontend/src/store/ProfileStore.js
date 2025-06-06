import { defineStore } from "pinia";
import { AxiosProfile } from "../apis/Profile";

export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    doctorId: localStorage.getItem("doctor_id") || null,
  }),

  actions: {
    async getDoctoreProfileApiCall() {
      const ProfileService = new AxiosProfile();
      this.doctorId = localStorage.getItem("doctor_id") || null;
      const data = await ProfileService.DoctorProfileData(this.doctorId);
      return data;
    },
    async addDoctoreProfileApiCall(payload) {
      const ProfileService = new AxiosProfile();
      const data = await ProfileService.ProfileAdd(this.doctorId, payload);
      return data;
    },
    async getPatients() {
      const ProfileService = new AxiosProfile();
      const patientData = await ProfileService.PatientData(this.doctorId);
      return patientData;
    },
    async getChatMessages(id) {
      const ProfileService = new AxiosProfile();
      const chatMessageData = await ProfileService.ChatMessages(id);
      return chatMessageData;
    },
    async deleteImage(imageObject) {
      const ProfileService = new AxiosProfile();
      const deletedRes = await ProfileService.DeleteImage(
        this.doctorId,
        imageObject
      );
      return deletedRes;
    },
    async getAppointments() {
      const profileService = new AxiosProfile();
      const doctorId = this.doctorId;
      const appointments = await profileService.Appointments(doctorId);
      return appointments;
    },
    reset() {
      this.$reset();
    },
  },
});
