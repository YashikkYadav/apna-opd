import axiosAuthenticator from "@/plugins/axios";

export class AxiosTemplate {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    TemplatesList(doctorId) {
        return this.apiClient.get(`/${doctorId}/template`)
    }

    SectionsList() {
        return this.apiClient.get(`/library`)
    }

    TemplateAdd(doctorId, payload) {
        return this.apiClient.post(`/${doctorId}/template`, payload)
    }

    TemplateEdit(doctorId, templateId, payload) {
        return this.apiClient.put(`/${doctorId}/template/${templateId}`, payload)
    }

    TemplateDelete(doctorId, templateId, payload) {
        return this.apiClient.delete(`/${doctorId}/template/${templateId}`, payload)
    }
}
