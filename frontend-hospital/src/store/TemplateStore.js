import { defineStore } from 'pinia'
import { AxiosTemplate } from '../apis/Template'

export const useTemplateStore = defineStore('templateStore', {
    state: () => ({
        doctorId: localStorage.getItem('doctor_id') || null,
    }),

    actions: {
        async getAllTemplatesApiCall() {
            const TemplateService = new AxiosTemplate()
            const data = await TemplateService.TemplatesList(this.doctorId)
            return data
        },
        async getAllSectionsApiCall() {
            const TemplateService = new AxiosTemplate()
            const data = await TemplateService.SectionsList(this.doctorId)
            return data
        },
        async AddTemplateApiCall(payload) {
            const TemplateService = new AxiosTemplate()
            const data = await TemplateService.TemplateAdd(this.doctorId, payload)
            return data
        },
        async UpdateTemplateApiCall(templateId, payload) {
            const TemplateService = new AxiosTemplate()
            const data = await TemplateService.TemplateEdit(this.doctorId, templateId, payload)
            return data
        },
        async DeleteTemplateApiCall(templateId, payload) {
            const TemplateService = new AxiosTemplate()
            const data = await TemplateService.TemplateDelete(this.doctorId, templateId, payload)
            return data
        },
    },
})
