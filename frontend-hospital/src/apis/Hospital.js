import axiosAuthenticator from "@/plugins/axios";

export class AxiosHospital {
  apiClient;
  constructor() {
    this.apiClient = new axiosAuthenticator();
  }

  Doctor(hospitalId) {
    console.log("function called in api Hospitala : "+hospitalId);
    return this.apiClient.get(`/hospital/${hospitalId}/doctor`);
  }

  Register(hospitalId, payload) {
    return this.apiClient.post(`hospital/${hospitalId}/doctor`, payload);
  }
}
