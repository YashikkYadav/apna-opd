import { defineStore } from "pinia";
import { AxiosUser } from "@/apis/User";

export const useUserStore = defineStore("healthServeStore", {
  state: () => ({
    adminId: localStorage.getItem("admin_id") || null,
  }),
  actions: {
    async getUser() {
      const UserService = new AxiosUser();
      const data = await UserService.User(this.adminId);
      return data;
    },
    async getUserDetails(userId) {
      const UserService = new AxiosUser();
      const data = await UserService.Detail(this.adminId, userId);
      return data;
    },
    async registerUser(payload) {
      const UserService = new AxiosUser();
      const data = await UserService.Register(payload);
      return data;
    },
  },
});
