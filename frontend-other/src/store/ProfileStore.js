import { defineStore } from "pinia";
import { AxiosProfile } from "../apis/Profile";

export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    healthServeId: localStorage.getItem("doctor_id") || null,
  }),

  actions: {
    async getHealthServeApiCall() {
      const ProfileService = new AxiosProfile();
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
  },
});
