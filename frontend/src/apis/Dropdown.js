import axiosAuthenticator from "@/plugins/axios";

export class AxiosDropdown {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    DropdownsList(doctorId) {
        return this.apiClient.get(`/${doctorId}/dropdown`)
    }

    SectionsList() {
        return this.apiClient.get(`/library/dropdown`)
    }

    DropdownAdd(doctorId, payload) {
        return this.apiClient.post(`/${doctorId}/dropdown`, payload)
    }

    DropdownEdit(doctorId, dropdownId, payload) {
        return this.apiClient.put(`/${doctorId}/dropdown/${dropdownId}`, payload)
    }

    DropdownDelete(doctorId, dropdownId) {
        return this.apiClient.delete(`/${doctorId}/dropdown/${dropdownId}`)
    }
}
