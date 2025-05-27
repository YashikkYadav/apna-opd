import { defineStore } from "pinia";
import { AxiosHospital } from "@/apis/Hospital";

export const useHospitalStore = defineStore("hospitalStore", {
  state: () => ({
    hospitalId: localStorage.getItem("hospital_id") || null,
  }),
  actions: {
    async getDoctors() {
      const HopitalService = new AxiosHospital();
      const data = await HopitalService.Doctor(this.hospitalId);
      return data;
    },
    async registerDoctor(payload) {
      const hospitalService = new AxiosHospital();
      const data = await hospitalService.Register(this.hospitalId, payload);
      return data;
    },
  },
});
