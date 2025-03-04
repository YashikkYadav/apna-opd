const patientService = require('../services/patient.service');

const registerPatient = async (req, res) => {
  try {
    const patientData = req.body;
    const { doctorId } = req.params;

    const patient = await patientService.registerPatient(patientData, doctorId);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({
        patient: patient.patient,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const generateOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const patient = await patientService.generateOTP(phoneNumber);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({
        patient: patient.patient,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const validateOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const patient = await patientService.validateOTP(phoneNumber, otp);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({
        patient: patient.patient,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getPatientById = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await patientService.getPatientById(patientId);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({
        patient: patient.patient,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getAllPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page, limit } = req.query;

    const patients = await patientService.getAllPatients(doctorId, page, limit);

    res
      .status(patients.statusCode)
      .json({
        patient: patients.patients,
        pagination: patients.pagination,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const deletePatient = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const patient = await patientService.deletePatient(doctorId, patientId);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res.status(204).json({
      message: `Patient deleted successfully`,
    });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  registerPatient,
  generateOTP,
  validateOTP,
  getPatientById,
  getAllPatients,
  deletePatient,
};
