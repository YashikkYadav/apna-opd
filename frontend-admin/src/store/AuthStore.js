import { defineStore } from "pinia";
import { AxiosAuth } from "../apis/Auth";

export const useAuthStore = defineStore("authStore", {
  actions: {
    async LoginApiCall(payload) {
      const AuthService = new AxiosAuth();
      const data = await AuthService.Login(payload);
      return data;
    },
    async RegisterApiCall(payload) {
      const AuthService = new AxiosAuth();
      const data = await AuthService.Register(payload);
      return data;
    },
  },
});
