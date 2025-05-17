import { defineStore } from "pinia";
import { AxiosDoctor } from "@/apis/Doctor";

export const useDoctorStore = defineStore("doctorStore", {
  state: () => ({
    adminId: localStorage.getItem("admin_id") || null,
  }),
  actions: {
    async getDoctors() {
      const DoctorService = new AxiosDoctor();
      const data = await DoctorService.Doctor(this.adminId);
      return data;
    },
  },
});
