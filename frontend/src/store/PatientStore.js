import { defineStore } from "pinia";
import { AxiosPatient } from "../apis/Patient";

export const usePatientStore = defineStore("patientStore", {
  state: () => ({
    doctorId: localStorage.getItem("doctor_id") || null,
  }),

  actions: {
    async getAllPatientApiCall(currentPage, limit, search) {
      const PatientService = new AxiosPatient();
      const data = await PatientService.PatientsList(
        this.doctorId,
        currentPage,
        limit,
        search
      );
      return data;
    },
    async getPatientDetailsApiCall(patientId) {
      const PatientService = new AxiosPatient();
      const data = await PatientService.PatientDetails(patientId);
      return data;
    },
    async addPatientApiCall(payload) {
      const PatientService = new AxiosPatient();
      const data = await PatientService.PatientAdd(this.doctorId, payload);
      return data;
    },
    async updatePatientApiCall(patientId, payload) {
      const PatientService = new AxiosPatient();
      const data = await PatientService.PatientUpdate(patientId, payload);
      return data;
    },
    async deletePatientApiCall(patientId) {
      const PatientService = new AxiosPatient();
      const data = await PatientService.PatientDelete(this.doctorId, patientId);
      return data;
    },
    async deletePrescrtiption(patientId, prescription) {
      const PatientService = new AxiosPatient();
      const data = await PatientService.DeletePrescription(
        this.doctorId,
        patientId,
        prescription
      );
      return data;
    },
  },
});
