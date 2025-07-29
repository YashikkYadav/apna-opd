import { defineStore } from "pinia";
import { AxiosProfile } from "../apis/Profile";

export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    healthServeId: localStorage.getItem("doctor_id") || null,
  }),

  actions: {
    async getHealthServeApiCall() {
      const ProfileService = new AxiosProfile();
      this.healthServeId = localStorage.getItem("doctor_id") || null;

      const data = await ProfileService.HealthServeProfileData(
        this.healthServeId
      );
      return data;
    },
    async addHealthServeProfileApiCall(payload) {
      const ProfileService = new AxiosProfile();
      const data = await ProfileService.ProfileAdd(this.healthServeId, payload);
      return data;
    },
    async deleteImage(imageObject) {
      const ProfileService = new AxiosProfile();
      const deleteResponse = await ProfileService.DeleteImage(
        this.healthServeId,
        imageObject
      );
      return deleteResponse;
    },
    async addProfileData(payload) {
      const ProfileService = new AxiosProfile();
      console.log(this.healthServeId)
      const deleteResponse = await ProfileService.AddProfileData(
        this.healthServeId,
        payload
      );
      return deleteResponse;
    },
    // getProfileData
    async getProfileData() {
      const ProfileService = new AxiosProfile();
     
      const deleteResponse = await ProfileService.GetProfileData(
        this.healthServeId,
      );
      return deleteResponse;
    },
    reset() {
      this.$reset(); // Built-in Pinia function to reset to initial state
    },
  },
});
