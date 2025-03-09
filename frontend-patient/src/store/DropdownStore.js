import { defineStore } from 'pinia'
import { AxiosDropdown } from '../apis/Dropdown'

export const useDropdownStore = defineStore('dropdownStore', {
    state: () => ({
        doctorId: localStorage.getItem('doctor_id') || null,
    }),

    actions: {
        async getAllDropdownsApiCall() {
            const DropdownService = new AxiosDropdown()
            const data = await DropdownService.DropdownsList(this.doctorId)
            return data
        },
        async getAllSectionsApiCall() {
            const DropdownService = new AxiosDropdown()
            const data = await DropdownService.SectionsList(this.doctorId)
            return data
        },
        async AddDropdownApiCall(payload) {
            const DropdownService = new AxiosDropdown()
            const data = await DropdownService.DropdownAdd(this.doctorId, payload)
            return data
        },
        async UpdateDropdownApiCall(dropdownId, payload) {
            const DropdownService = new AxiosDropdown()
            const data = await DropdownService.DropdownEdit(this.doctorId, dropdownId, payload)
            return data
        },
        async DeleteDropdownApiCall(dropdownId) {
            const DropdownService = new AxiosDropdown()
            const data = await DropdownService.DropdownDelete(this.doctorId, dropdownId)
            return data
        },
    },
})
