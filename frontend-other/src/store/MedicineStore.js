import { defineStore } from 'pinia'
import { AxiosMedicine } from '../apis/Medicine'

export const useMedicineStore = defineStore('medicineStore', {
    state: () => ({
        doctorId: localStorage.getItem('doctor_id') || null,
    }),

    actions: {
        async getAllMedicinesApiCall() {
            const MedicineService = new AxiosMedicine()
            const data = await MedicineService.MedicinesList(this.doctorId)
            return data
        },
        async AddMedicineApiCall(payload) {
            const MedicineService = new AxiosMedicine()
            const data = await MedicineService.MedicineAdd(this.doctorId, payload)
            return data
        },
        async DeleteMedicineApiCall(medicineId) {
            const MedicineService = new AxiosMedicine()
            const data = await MedicineService.MedicineDelete(this.doctorId, medicineId)
            return data
        },
    },
})
