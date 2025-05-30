import axiosAuthenticator from "@/plugins/axios";

export class AxiosAuth {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    Login(payload) {
        console.log("In auth api : ",payload);
        return this.apiClient.post(`/hospital/login`, payload)
    }

    Register(payload) {
        return this.apiClient.post(`/doctor`, payload)
    }
}
