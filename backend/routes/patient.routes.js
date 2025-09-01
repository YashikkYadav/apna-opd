const express = require("express");
const patientController = require("../controllers/patient.controller");
const patient = express.Router({ mergeParams: true });

patient.post("/generate-otp", patientController.generateOTP);

patient.post("/validate-otp", patientController.validateOTP);

patient.post("/register", patientController.appRegisterPatient);
patient.post("/:doctorId?", patientController.registerPatient);



patient.delete(
  "/:doctorId/:patientId/delete-prescription",
  patientController.deletePresciption
);

patient.get("/get-all/:doctorId", patientController.getAllPatients);

patient.get("/:patientId", patientController.getPatientById);

patient.put("/:patientId", patientController.updatePatient);

patient.get("/:patientId/get-doctors", patientController.getDoctors);

patient.get("/:patientId/appointment", patientController.getAppointments);

patient.delete("/:appointmentId/appointment", patientController.deleteAppointment);

patient.delete("/:doctorId/:patientId", patientController.deletePatient);

module.exports = patient;
