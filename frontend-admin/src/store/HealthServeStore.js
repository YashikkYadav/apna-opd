import { defineStore } from "pinia";
import { AxiosHealthServe } from "@/apis/HealthServe";

export const useHealthServeStore = defineStore("healthServeStore", {
  state: () => ({
    adminId: localStorage.getItem("admin_id") || null,
  }),
  actions: {
    async getHealthServe(type) {
      const HealthServeService = new AxiosHealthServe();
      const data = await HealthServeService.HealthServe(this.adminId, type);
      return data;
    },
  },
});
