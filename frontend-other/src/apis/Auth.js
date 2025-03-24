import axiosAuthenticator from "@/plugins/axios";

export class AxiosAuth {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    Login(payload) {
        return this.apiClient.post(`/health-serve/access-token`, payload)
    }

    Register(payload) {
        return this.apiClient.post(`/doctor`, payload)
    }
}
